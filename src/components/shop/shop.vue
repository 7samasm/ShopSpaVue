<template>
    <v-layout row wrap>
	    <v-flex 
	    	md2 xs6
			v-for="(prod,key) in prods"
			:key="key">
	    	<router-link :to="'/product-details/' + prod._id">
				<card :product="prod"></card>
			</router-link>
		</v-flex>
    </v-layout>
</template>

<script>
	import card from './card.vue'
	import ShopService from '../../ShopService'
	export default {
		data() {
			return {
				prods : []
			}
		},
		components: 
		{
			card
		},
		async created(){
			this.prods = await ShopService.getProducts()
			console.log(this.prods)
		}
	}
</script>
