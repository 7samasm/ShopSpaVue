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
							<v-btn flat fab small @click="deleteProduct({id :prod._id, title: prod.title})">
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
	.f-right{float: right;}
</style>
