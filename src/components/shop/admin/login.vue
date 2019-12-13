<template>
	<v-layout row justify-center class="mt-5">
		<v-flex md4>
<!-- 			<v-card>
				<v-card-text> -->
				<v-form>
					<v-text-field
						solo
						ref="mm"
						v-model="username"
						label="username"
						appendIcon="person"
						color="purple"></v-text-field>
					<v-text-field 
						solo
						v-model="password"
						type="password"
						label="password"
						appendIcon="keyboard"
						color="purple"></v-text-field>
					<v-btn @click="login" outline block color="purple" class="ml-0">login</v-btn>					
				</v-form>
		<!-- 	</v-card-text>
			</v-card> -->
		</v-flex>
	</v-layout>
</template>

<script>
	import UserService from '../../../UserService'
	export default {
		data(){
			return {
				username : '',
				password : ''
			}
		},
		methods : {
	        login() {
		        let username = this.username 
		        let password = this.password
		        this.$store.dispatch('login', { username, password })
		       .then(() => this.$router.push('/'))
		       .catch(err => console.log(err))
		    }
		},
		created(){
			if(!localStorage.getItem('token') === '') {
				this.$router.push('/')
        		console.log(localStorage.getItem('token'))
			}
		}
	}
</script>