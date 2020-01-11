<template>
    <v-row dense>
	    <v-col 
			v-for="(prod,key) in prods"
			:key="key"
			cols="6" sm="4" md="2">
	    	<router-link :to="'/product-details/' + prod._id" tag="a">
				<card :product="prod"></card>
			</router-link>
		</v-col>
		<!-- preload screen -->
		<v-col 
			v-if="prods.length === 0"
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
	import card from './card.vue'
	import ShopService from '../../ShopService'
	export default {
		// inject: ['theme'],
		data() {
			return {
				prods : []
			}
		},
		components: {card},
		async created(){
			this.prods = await ShopService.getProducts()
		}
	}
</script>
<style scoped>
	a {
		text-decoration: none
	}
</style>
