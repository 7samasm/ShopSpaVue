<template>
	<v-card>
		<v-card-text>
			<v-form>
				<v-text-field 
					ref="title"
					label="title"
					appendIcon="title"
					v-model="title"
					:color="baseColor"></v-text-field>
				<v-text-field 
					label="description"
					v-model="description"
					appendIcon="description"
					:color="baseColor"></v-text-field>
				<v-text-field 
					label="price"
					v-model="price"
					type="number"
					appendIcon="money"
					:color="baseColor"></v-text-field>
				<v-btn
					outline
					v-if="editable"
					@click="editProduct"
					class="white--text ml-0"
					:color="baseColor">
						<v-icon left>edit</v-icon>
						<span>edit</span>						
					</v-btn>
				<v-btn
					outline
					v-else
					@click="addProduct"
					class="white--text ml-0"
					:color="baseColor">
						<v-icon left>check_circle</v-icon>
						<span>add</span>
					</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
	import ShopService  from '../../../ShopService';
	import UserService  from '../../../UserService';
	import {isEmpty} from 'lodash';
	export default {
		props : ['editable','productId'],
		data() {
			return {
				//models
				title       : '',
				price       : '',
				description : '',
				imageUrl    : 'd.jpg',
				product     : {}
			}
		},
		computed : {
			baseColor(){
				return this.editable ? 'orange' : 'teal'
				console.log('computed called')
			}
		},
		methods : {		
			editMode(){
				const obj        = this.product
				this.title       = obj.title
				this.description = obj.description
				this.price       = obj.price
			},
			clearInputs(){
				// clear inputs
				this.title = ''
				this.price = ''
				this.description = ''
				// add foucs to title
				this.$refs.title.focus();
			},
			addProduct(){
				const title       = this.title
				const price       = this.price
				const description = this.description
				const imageUrl    = this.imageUrl
				if(isEmpty(title) || isEmpty(price + '') || isEmpty(description)){
					alert("empty field")
					return
				} else {
					ShopService.insertProduct({
						title,
						price,
						description,
						imageUrl
					}).then(res => {
						console.log(res.data)
					})
					UserService.getProducts().then(res => {
						this.$store.commit('set_my_products',res)
					})
					this.clearInputs()
				}
			},
			async editProduct(){
				const title       = this.title
				const price       = this.price
				const description = this.description
				const imageUrl    = this.imageUrl
				await ShopService.editProduct({
					productId : this.productId,
					title,price,description,imageUrl
				})
				this.clearInputs()
				// rest vuex state
				this.$store.commit('set_cart',await ShopService.getCart())
				this.$store.commit('set_my_products',await UserService.getProducts())
			}
		},
		async created(){

			if(this.editable){
				try {
					const res  = await UserService.getProduct(this.productId)
					if(res) {
						this.product = res
						this.editMode()	
					} else {
						this.$router.push('/')
					}
				} catch(e) {}
			}
		},
		mounted(){
			// add foucs to title
			this.$refs.title.focus();
		}
	}
</script>