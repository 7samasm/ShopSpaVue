<template>
    <v-row  dense>
	    <v-col 
			v-for="(prod,key) in myProducts"
			:key="key"
			cols="6" sm="4" md="2">
			<card :product="prod">
				<!-- slot to inject to cards -->

				<v-btn outlined fab xSmall color="red" @click="deleteProduct({id :prod._id, title: prod.title})" class="ml-2">
					<v-icon color="#FF5049">delete</v-icon>
				</v-btn>

				<router-link :to="'/admin/edit-product/' + prod._id" class="float-right mr-2">
					<v-btn outlined fab xSmall ripple color="teal">
						<v-icon color="teal">edit</v-icon>
					</v-btn>
				</router-link>

			</card>
		</v-col>
		<!-- preloader screen -->
		<v-col v-if="myProducts.length === 0">
			    <v-row>
			    	<v-col
						v-for="(x,key) in 12"
						:key="key"
						cols="6" sm="4" md="2">
					    <v-skeleton-loader
					        type="image"></v-skeleton-loader>
			    	</v-col>
			    </v-row>
		</v-col>		
    </v-row>
</template>

<script>
	import card from '../card'
	import UserService from '../../../UserService'
	import ShopService from '../../../ShopService'
	import {mapGetters,mapActions} from 'vuex'
	export default {
		computed : {
			...mapGetters([
				'myProducts'
			])
		},
		methods:{
			...mapActions([
				'deleteProduct'
			])
		},
		components: 
		{
			card
		}
	}
</script>
<style scoped>
	a {
		text-decoration: none
	}
</style>
