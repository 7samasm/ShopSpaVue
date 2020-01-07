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
		<v-col v-if="prods.length === 0">
<!-- 			<v-sheet
				v-if="prods.length === 0"
			    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"> -->
			    <v-row>
			    	<v-col
						v-for="(x,key) in 12"
						:key="key"
						cols="6" sm="4" md="2">
					    <v-skeleton-loader
					        type="image"></v-skeleton-loader>
			    	</v-col>
			    </v-row>
			<!-- </v-sheet> -->
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
				this.prods = []
				setTimeout(async()=>{
					this.prods = await ShopService.getProductsBySection(this.$route.params.section)
				},500)
			}
		},
		components: 
		{
			card
		},
		async created(){
				setTimeout(async()=>{
					this.prods = await ShopService.getProductsBySection(this.$route.params.section)
				},500)
		}
	}
</script>
<style scoped>
	a {
		text-decoration: none
	}
</style>
