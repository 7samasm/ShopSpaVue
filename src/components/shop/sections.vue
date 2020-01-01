<template>
    <v-row row wrap dense>
	    <v-col 
			v-for="(prod,key) in prods"
			:key="key"
			cols="6" sm="4" md="2">
	    	<router-link :to="'/product-details/' + prod._id" tag="a">
				<card :product="prod"></card>
			</router-link>
		</v-col>
    </v-row>
</template>

<script>
	import card from './card.vue'
	import ShopService from '../../ShopService'
	export default {
		data() {
			return {
				section : this.$route.params.section,
				prods : []
			}
		},
		watch : {
			async $route(){
				this.prods = await ShopService.getProductsBySection(this.$route.params.section)
			}
		},
		components: 
		{
			card
		},
		async created(){
			this.prods = await ShopService.getProductsBySection(this.section)
		}
	}
</script>
<style scoped>
	a {
		text-decoration: none
	}
</style>
