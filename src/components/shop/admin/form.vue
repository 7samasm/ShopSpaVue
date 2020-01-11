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
	                <v-btn small class="ma-2" color="red" text @click="$router.push('/admin/my-product')">{{editable ? 'OK' : 'NO'}}</v-btn>
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
				<v-file-input
					dense
					prepend-icon=""
					v-model="image"
					clear-icon ="clear"
					clearable
					ref="uploadedImage"
					:color="baseColor"
					append-icon="camera_alt"
					accept="image/*"
					label="upload photo [ optinal ]"></v-file-input>
			    <v-autocomplete
			    	:rules="sectRules" 
					label="Section"
					v-model="section"
					@change="log"
					append-icon="arrow_drop_down"
					:items="$store.getters.mapSections"></v-autocomplete>
				<v-btn
					outlined
					v-if="editable"
					:disabled="$v.$invalid"
					:loading="btnLoading"
					@click="editProduct"
					class="white--text ml-0"
					:color="baseColor">
						<v-icon left>edit</v-icon>
						<span>edit</span>						
					</v-btn>
				<v-btn
					:disabled="$v.$invalid"
					:loading="btnLoading"
					outlined
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
				image       : null,
				section     : '',

				product     : {},
				dialog   : false,
				dialogText : '',
				btnLoading: false,
		        titleRules: [() => this.$v.title.required|| 'title is required'],
				decRules  : [() => this.$v.description.required || 'description is required'],
		        priceRules: [() => this.$v.price.required || 'price is required'],
		        sectRules : [() => this.$v.section.required || 'section is required']				
			}
		},
		computed : {
			baseColor(){
				return this.editable ? 'orange' : 'teal'
				console.log('computed called')
			}		
		},
		methods : {
			log(){console.log(this.section)},
			addAnthor(){
				this.$refs.form.reset()
				// this.$refs.form.resetValidation()
				this.dialog = false
			},	
			editMode(){
				const {title,price,description,imageUrl,section} = this.product
				const obj = {title,price,description,imageUrl,section}
				for (const prop in obj) this[prop] = obj[prop]
			},
			makeFormData(key = null){
				const keys = ['title','price','description','imageUrl','section']
				if (key) keys.push(key)
				const formData =  new FormData()
				for (let key of keys)
					formData.append(key,this[key])
				if(this.image) formData.append('image',this.image,this.image.name)
				return formData
			},
			async addProduct(){
				this.btnLoading = true
				try {
					const resp  = await ShopService.insertProduct(this.makeFormData())
					this.$store.commit('set_my_products',await UserService.userInfos())
					this.btnLoading = false
					this.dialogText = `${resp.data.title} hass been added successflly do you want to add anthor product ?`
					this.dialog = true
				} catch(e) {
					console.log(e);
				}
			},
			async editProduct(){
				this.btnLoading = true
				console.log(this.image)				
				try {
					const res = await ShopService.editProduct(this.makeFormData('productId'))
					// rest vuex state
					const info = await UserService.userInfos();
					this.$store.commit('set_cart',info)
					this.$store.commit('set_my_products',info)
					setTimeout(()=>{
					this.btnLoading = false
					this.dialogText = `${res.data.title} has been updated successflly!`
					this.dialog = true
					},500)
				} catch(e) {
					console.log(e);
				}
			}
		},
		validations: {
			title      : {required},
			description: {required},
  			price      : {required},
  			section    : {required}			
		},		
		async created(){
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