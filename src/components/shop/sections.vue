<template>
    <v-row row wrap dense>
	    <v-col 
	    	md="2" xs="6"
			v-for="(prod,key) in prods"
			:key="key">
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
				// console.log('changed')
				// this.section = this.$route.params.section,
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
