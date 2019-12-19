<template>
	<v-card>
	    <v-dialog v-model="dialog" width="400">
	        <v-card>
	            <v-card-title class='font-weight-medium'>
	                Tip :
	            </v-card-title>
	            <v-card-text class="text-center">
	            	{{dialogText}}
	            </v-card-text>
	            <v-card-actions>
	                <v-spacer></v-spacer>
	                <v-btn flat fab small color="red" text @click="$router.push('/admin/my-product')">{{editable ? 'OK' : 'NO'}}</v-btn>
	                <v-btn flat fab small :color="baseColor" text v-if="!this.editable" @click="addAnthor">Ok</v-btn>
	            </v-card-actions>
	        </v-card>
	    </v-dialog>	
		<v-card-text>
			<v-form ref="form">
				<v-text-field 
					ref="title"
					:rules="titleRules"
					label="title"
					appendIcon="title"
					v-model="title"
					:color="baseColor"></v-text-field>
				<v-text-field 
					:rules="decRules"
					label="description"
					v-model="description"
					appendIcon="description"
					:color="baseColor"></v-text-field>
				<v-text-field 
					:rules="priceRules"
					label="price"
					v-model="price"
					type="number"
					appendIcon="money"
					:color="baseColor"></v-text-field>
				<v-btn
					outline
					v-if="editable"
					:disabled="this.isValidated"
					@click="editProduct"
					class="white--text ml-0"
					:color="baseColor">
						<v-icon left>edit</v-icon>
						<span>edit</span>						
					</v-btn>
				<v-btn
					:disabled="this.isValidated"
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
	import { required} from 'vuelidate/lib/validators'
	export default {
		props : ['editable','productId'],
		data() {
			return {
				//models
				title       : '',
				price       : '',
				description : '',
				imageUrl    : 'd.jpg',
				product     : {},
				dialog   : false,
				dialogText : '',
		        titleRules: [() => this.$v.title.required|| 'title is required'],
				decRules  : [() => this.$v.description.required || 'description is required'],
		        priceRules: [() => this.$v.price.required || 'price is required']				
			}
		},
		computed : {
			baseColor(){
				return this.editable ? 'orange' : 'teal'
				console.log('computed called')
			},
			isValidated() {
				return this.$v.$invalid
			}			
		},
		methods : {
			addAnthor(){
				this.$refs.form.reset()
				this.$refs.title.focus();
				this.$refs.form.resetValidation()
				this.dialog = false
			},	
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
				this.$refs.title.focus();
				// add foucs to title
				// this.$refs.title.focus();
			},
			async addProduct(){
				try {
					const title       = this.title
					const price       = this.price
					const description = this.description
					const imageUrl    = this.imageUrl
					const resp     = await ShopService.insertProduct({title,price,description,imageUrl})
					const prods    = await UserService.getProducts()
					this.$store.commit('set_my_products',prods)
					this.dialogText = `${resp.data.title} hass been added successflly do you want to add anthor product ?`
					this.dialog = true
				} catch(e) {
					console.log(e);
				}
			},
			async editProduct(){
				const title       = this.title
				const price       = this.price
				const description = this.description
				const imageUrl    = this.imageUrl
				const res = await ShopService.editProduct({
					productId : this.productId,
					title,price,description,imageUrl
				})
				// rest vuex state
				this.$store.commit('set_cart',await ShopService.getCart())
				this.$store.commit('set_my_products',await UserService.getProducts())
				this.dialogText = `${res.data.title} has been updated successflly!`
				this.dialog = true
			}
		},
		validations: {
			title      : {required},
			description: {required},
  			price      : {required} 			
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