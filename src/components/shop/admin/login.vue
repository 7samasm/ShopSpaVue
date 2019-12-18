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
						:rules="nameRules"
						ref="mm"
						v-model="username"
						label="username"
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
	import { required, minLength , email,sameAs} from 'vuelidate/lib/validators'

	export default {
		data(){
			return {
				username : '',
				password : '',
				dialog   : false,
				dialogText : '',
		        nameRules: [
		        	( ) => this.$v.username.required|| 'Name is required'
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
			username: {
			   required,
			},
  			password : {
  				required,
  			}
		},		
		methods : {
	        async login(){
	        	try {
			        const username = this.username 
			        const password = this.password
			        await this.$store.dispatch('login', { username, password })
			        this.$router.push('/admin/my-product')
	        	} catch(rej) {
		       		this.dialog = rej.showDialog
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