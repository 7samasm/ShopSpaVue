<template>
    <v-row  dense>
	    <v-col 
			v-for="(prod,key) in myProducts"
			:key="key"
			cols="6" sm="4" md="2">
			<card :product="prod">
				<!-- slot to inject to cards -->
				<div class="mb-3">
					<v-btn text outlined  small color="red" @click="deleteProduct({id :prod._id, title: prod.title})" class="ml-2">
						<v-icon small color="#FF5049">delete</v-icon>
					</v-btn>

					<router-link :to="'/admin/edit-product/' + prod._id" class="float-right mr-2">
						<v-btn text outlined  small ripple color="teal">
							<v-icon small color="teal">edit</v-icon>
						</v-btn>
					</router-link>
				</div>

			</card>
		</v-col>
		<!-- preload screen -->
		<v-col 
			v-if="myProducts.length === 0"
			v-for="(x,key) in 12"
			:key="key"
			cols="6" sm="4" md="2">			
			    <v-skeleton-loader
			    	max-height="245"
			        type="image"></v-skeleton-loader>
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
