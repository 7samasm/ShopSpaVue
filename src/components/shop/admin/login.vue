<template>
	<v-layout row justify-center class="mt-5">
        <v-dialog v-model="dialog" width="400">
            <v-card>
                <v-card-title class='font-weight-medium'>
                    Error :(
                </v-card-title>
                <v-card-text class="text-center">
                	{{dialogText}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outline color="teal" text @click="dialog = false">
                        ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
		<v-flex md4>
<!-- 			<v-card>
				<v-card-text> -->
				<v-form>
					<v-text-field
						solo
						:rules="emailRules"
						ref="mm"
						v-model="email"
						label="email"
						appendIcon="person"
						color="purple"></v-text-field>
					<v-text-field 
						solo
						:rules="passRules"
						v-model="password"
						type="password"
						label="password"
						appendIcon="keyboard"
						color="purple"></v-text-field>
					<v-btn :disabled="this.isValidated" @click="login" outline  color="purple" class="ml-0">login</v-btn>
					<router-link to="/admin/register" class="right pt-2">
						<span>sign up</span>
					</router-link>					
				</v-form>
		<!-- 	</v-card-text>
			</v-card> -->
		</v-flex>
	</v-layout>
</template>

<script>
	import UserService from '../../../UserService'
	import { required , email} from 'vuelidate/lib/validators'

	export default {
		data(){
			return {
				email : '',
				password : '',
				dialog   : false,
				dialogText : '',
				emailRules: [
					( ) => this.$v.email.required || 'E-mail is required',
					( ) => this.$v.email.email || 'E-mail must be valid',
				],
		        passRules: [
		        	( ) => this.$v.password.required || 'password is required'
	        	]				
			}
		},
		computed : {
			isValidated() {
				return this.$v.$invalid
			}
		},
		validations: {
			email: {
			   required,
			   email
			},
  			password : {
  				required,
  			}
		},		
		methods : {
	        async login(){
	        	try {
			        const email = this.email 
			        const password = this.password
			        await this.$store.dispatch('login', { email, password })
			        this.$router.push('/admin/my-product')
	        	} catch(rej) {
		       		this.dialog     = rej.showDialog
		       		this.dialogText = rej.message
	        	}
		    }
		},
		created(){
			if(localStorage.getItem('token')) {
				this.$router.push('/')
        		console.log(localStorage.getItem('token'))
			}
		}
	}
</script>