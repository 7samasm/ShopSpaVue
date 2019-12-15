<template>
	<v-layout justify-center>
		<v-flex md6>
			<v-card>
				<v-card-text>
					<v-form>
						<v-text-field 
							ref="name"
							label="username"
							appendIcon="person"
							v-model="name"
							:color="baseColor"></v-text-field>
						<v-text-field 
							label="email"
							v-model="email"
							appendIcon="email"
							:color="baseColor"></v-text-field>
						<v-text-field 
							label="password"
							v-model="password"
							type="password"
							appendIcon="keyboard"
							:color="baseColor"></v-text-field>
						<v-btn
							outline
							@click="signUp"
							class="white--text ml-0"
							:color="baseColor">
								<v-icon left>account_circle</v-icon>
								<span>add</span>						
							</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import UserService  from '../../../UserService';
	import {isEmpty} from 'lodash';
	export default {
		data() {
			return {
				//models
				name        : '',
				email       : '',
				password    : '',
			}
		},
		computed : {
			baseColor(){
				return 'blue'
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
		}
	}
</script>