<template>
	<div>
        <v-layout row wrap justify-center>
		    <v-flex xs12 md6>
		    	<v-card class="card-item">
					<div class="card-img">
						<img src="../../../public/d.jpg" alt="">
					</div>
				</v-card>
				<v-card class="card-item" v-for="(item,index) in itreation" :key="index">
					<v-layout row>
						<v-flex>
							<h4>{{index}}</h4>
						</v-flex>
						<v-spacer></v-spacer>
						<v-flex>
							<p class="item" v-if="index === 'price'">{{item}} SDG</p>
							<p class="item" v-else>{{item}}</p>
						</v-flex>
					</v-layout>
				</v-card>
		    </v-flex>
        </v-layout>
        <v-btn v-if="$store.getters.isLoggedIn" fab @click="saveToCart(id)" :loading="isSending"><v-icon color="pink">add_shopping_cart</v-icon></v-btn>
    </div>
</template>

<script>
	import ShopService from '../../ShopService'
	import {eventBus} from '../../main';
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				id   : this.$route.params.id,
				prod : {},
				itreation : {},
				isSending : false
			}
		},
		methods : {
			...mapMutations([
				'set_cart'
			]),
			saveToCart(id){
				// disable btn and make it rotate
				this.isSending = true
				// mock server dellay
				setTimeout(async()=> {
					try {
						// insert product to cart
						await ShopService.insertCartItem({productId : id})
						// update total cart's items to update header badge num
						this.$store.commit('set_cart',await ShopService.getCart())
						// make btn work again
						this.isSending = false
					} catch(e) {
						console.log(e.message);
					}

				},350)
			}
		},
		async created(){
			const res = await ShopService.getProductById(this.id)
			if(res){
				this.prod = res
				this.itreation = {
					title       : this.prod.title,
					description : this.prod.description,
					price       : this.prod.price
				} 	
			} else {
				this.$router.push('/')
			}
			console.log(this.itreation)
		}
	}
</script>



<style scoped>
	.card-item {
		margin: 10px 0;
		padding: 10px;
		color: #777
	}
	p.item {
	    text-align: right;
	    font-size: 14px;
	    color: #dc3636;
	    margin: 0
	}	
	.card-img {
		padding-top: 20px;
		position: relative;
	}
	.card-img img {
	    width: 70%;
	    margin: 0 auto;
	    display: block;
	}
	h4.title {text-align: center; padding: 15px 0}
	.desc {
		padding: 0 2rem;
		padding-bottom: 2rem;
		color: #888
	}
	.price  {
	    position: relative;
	    text-align: center;
	    padding-bottom: 10px;
	}
	.price div {
	    background: #ca33e4;
	    color: #fff;
	    padding: 4px;
	    font-weight: bold;
	}
</style>
