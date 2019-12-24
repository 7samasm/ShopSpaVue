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
	                <v-btn small class="ma-2" outline color="red" text @click="$router.push('/admin/my-product')">{{editable ? 'OK' : 'NO'}}</v-btn>
	                <v-btn small class="ma-2 white--text"  :color="baseColor" text v-if="!this.editable" @click="addAnthor">Ok</v-btn>
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
			    <v-autocomplete
			    	:rules="sectRules" 
					label="Section"
					v-model="sectionId"
					@change="log"
					:items="sectionsNames"></v-autocomplete>
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
	import SectionsService  from '../../../SectionsService';
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
				sectionId   : '',

				sections: [],
				product     : {},
				dialog   : false,
				dialogText : '',
		        titleRules: [() => this.$v.title.required|| 'title is required'],
				decRules  : [() => this.$v.description.required || 'description is required'],
		        priceRules: [() => this.$v.price.required || 'price is required'],
		        sectRules : [() => this.$v.sectionId.required || 'section is required']				
			}
		},
		computed : {
			baseColor(){
				return this.editable ? 'orange' : 'teal'
				console.log('computed called')
			},
			isValidated() {
				return this.$v.$invalid
			},
			sectionsNames(){
				return this.sections.map(section => {
					return {
						text  : section.name,
						value : section._id
					}
				})
			}		
		},
		methods : {
			log(){console.log(this.sectionId)},
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
			async addProduct(){
				try {
					const title       = this.title
					const price       = this.price
					const description = this.description
					const imageUrl    = this.imageUrl
					const sectionId   = this.sectionId
					const resp  = await ShopService.insertProduct({title,price,description,imageUrl,sectionId})
					this.$store.commit('set_my_products',await UserService.userInfos())
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
				this.$store.commit('set_my_products',await UserService.userInfos())
				this.dialogText = `${res.data.title} has been updated successflly!`
				this.dialog = true
			}
		},
		validations: {
			title      : {required},
			description: {required},
  			price      : {required},
  			sectionId  : {required}			
		},		
		async created(){
			this.sections = await SectionsService.getSections()
			console.log(this.sectionsNames)
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