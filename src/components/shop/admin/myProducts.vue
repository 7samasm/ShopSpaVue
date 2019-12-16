<template>
    <v-layout row wrap>
	    <v-flex 
	    	xs6 md2
			v-for="(prod,key) in myProducts"
			:key="key">
				<card :product="prod">
					<!-- slot to inject to cards -->
					<v-layout row>

						<v-flex xs6>
							<v-btn flat fab small @click="deleteProduct(prod._id,prod.title)">
								<v-icon color="#FF5049">delete</v-icon>
							</v-btn>
						</v-flex>

						<v-flex xs6>
							<router-link :to="'/admin/edit-product/' + prod._id">
								<v-btn flat fab small class="f-right" color="gray">
									<v-icon color="teal">edit</v-icon>
								</v-btn>
							</router-link>
						</v-flex>

					</v-layout>
				</card>
		</v-flex>
    </v-layout>
</template>

<script>
	import card from '../card'
	import UserService from '../../../UserService'
	import ShopService from '../../../ShopService'
	import {mapActions,mapGetters} from 'vuex'
	export default {
		computed : {
			...mapGetters([
				'myProducts'
			])
		},
		methods:{
			...mapActions(['removeCartItem']),
			deleteProduct(id,title) {
				// if confirm dialog
				if(confirm(`delete ${title} ?`)) {
					// mock server dellay
					setTimeout(async ()=>{
					//remove it from cart
					const isDeletedFromCart = await this.removeCartItem(id)
					// delete product from database
					await ShopService.deleteProduct({productId: id})
					// update data to update ui
					UserService.getProducts().then(res => {
						this.$store.commit('set_my_products',res)
					})
						
					},500)
				}
			}
		},
		components: 
		{
			card
		}
	}
</script>
<style scoped>
	.f-right{float: right;}
</style>
