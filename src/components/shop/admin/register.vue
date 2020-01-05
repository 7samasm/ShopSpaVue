<template>
	<v-row justify="center">
		<v-col md='6'>
			<v-card>
				<v-card-text>
					<v-form>
						<v-text-field 
							ref="name"
							:rules="nameRules"
							label="username"
							appendIcon="person"
							v-model.trim="name"
							:color="baseColor"></v-text-field>
							<!-- <pre>{{this.$v}}</pre> -->
						<v-text-field 
							:rules="emailRules"
							label="email"
							v-model.trim="email"
							appendIcon="email"
							:color="baseColor"></v-text-field>
						<v-text-field 
							:rules="passRules"
							label="password"
							v-model.trim="password"
							type="password"
							appendIcon="keyboard"
							:color="baseColor"></v-text-field>
						<v-text-field 
							:rules="repassRules"
							label="Repeatl password"
							v-model.trim="repassword"
							type="password"
							appendIcon="repeat"
							:color="baseColor"></v-text-field>							
						<v-btn
							outlined
							@click="signUp"
							class="white--text ml-0"
							:disabled="this.isValidated"
							:color="baseColor">
								<v-icon left>account_circle</v-icon>
								<span>add</span>						
							</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import UserService  from '../../../UserService';
	import { required, minLength , email,sameAs} from 'vuelidate/lib/validators'
	import {isEmpty} from 'lodash';
	export default {
		data() {
			return {
				//models
				name        : '',
				email       : '',
				password    : '',
				repassword  : '',

		        nameRules: [
		        	( ) => this.$v.name.required|| 'Name is required',
		        	( ) => this.$v.name.minLength || `Name must be more than ${this.$v.name.$params.minLength.min} characters`,
		        	(v) => v.length <= 12 || 'Name must be less than 12 char ',
		      	],
				emailRules: [
					( ) => this.$v.email.required || 'E-mail is required',
					( ) => this.$v.email.email || 'E-mail must be valid',
				],
		        passRules: [
		        	( ) => this.$v.password.required || 'password is required',
		        	( ) => this.$v.password.minLength || `password must be more than ${this.$v.password.$params.minLength.min} characters`,
	        	],
	        	repassRules: [
	        		( ) => this.$v.repassword.sameAsPassword || 'Passwords must be identical.'
	        	]
			}
		},
		computed : {
			baseColor(){
				return 'blue'
			},
			isValidated() {
				return this.$v.$invalid
			}
		},
		validations: {
			name: {
			   required,
			   minLength: minLength(4)
			},
			email: {
			    required,
			    email
  			},
  			password : {
  				required,
  				minLength: minLength(6)
  			},
		    repassword: {
		      sameAsPassword: sameAs('password')
		    }  			
		},	
		methods : {		
			signUp(){
				UserService.signUp(this.name,this.email,this.password)
				.then(user => {
					alert(`${user.name} has been added`)
					this.$router.push('/admin/login')
				})
			}
		},
		mounted(){
			console.log(this)
		}
	}
</script>