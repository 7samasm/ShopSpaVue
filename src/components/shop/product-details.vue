<template>
    <v-row justify="center">
	    <v-col sm="7" v-if="prod.hasOwnProperty('title')">
	    	<v-card outlined text class="my-1 px-3">
				<div class="card-img">
					<v-img :aspect-ratio="643/376" :src="'http://localhost:3001/img/' + prod.imageUrl" alt=""></v-img>
				</div>
			</v-card>
			<v-card outlined text class="my-1 px-3" v-for="(item,index) in itreation" :key="index">
				<v-row>
					<v-col>
						<p class="font-weight-bold my-0 grey--text">{{index}}</p>
					</v-col>
					<v-spacer></v-spacer>
					<v-col>
						<p class="text-right sm-text font-weight-medium pink--text my-0">{{item}}</p>
					</v-col>
				</v-row>
			</v-card>
			<v-card outlined text class="my-1 px-3">
				<v-row>
					<v-col>
						<p class="font-weight-bold my-0 grey--text">section</p>
					</v-col>
					<v-spacer></v-spacer>
					<v-col>
						<p class='text-right sm-text font-weight-medium  my-0'>
							<router-link :to="`/sections/${prod.section}`" class="purple--text">
								<v-icon color="purple">link</v-icon> {{prod.section}}
							</router-link>
						</p>
					</v-col>
				</v-row>
			</v-card>				
	    </v-col>
	    <!-- preloder page -->
	    <v-col v-else sm="7">
			    <v-skeleton-loader
			        :type="$vuetify.breakpoint.xs ? 'image,table-heading@4' : 'image@2,table-heading@4'"></v-skeleton-loader>
	    </v-col>
		<v-btn 
			v-if="$store.getters.isLoggedIn && prod.hasOwnProperty('title')"
			@click="saveToCart(id)"
			fab fixed bottom left
			:class="!$vuetify.breakpoint.xs ? 'left' : ''"
			:loading="isSending">
				<v-icon color="purple">add_shopping_cart</v-icon>
		</v-btn>
    </v-row>
</template>

<script>
	import ShopService from '../../ShopService'
	import UserService from '../../UserService'
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
			async saveToCart(id){
				// disable btn and make it rotate
				this.isSending = true
				try {
					// insert product to cart
					await ShopService.insertCartItem({productId : id})
					// update total cart's items to update header badge num
					this.set_cart(await UserService.userInfos())
					// make btn work again
					this.isSending = false
				} catch(e) {
					console.log(e.message);
				}
			}
		},
		async created(){
			const res = await ShopService.getProductById(this.id)
			if(res){
				this.prod = res
				this.itreation = {
					title       : this.prod.title,
					description : this.prod.description,
					price       : this.$options.filters.currency(this.prod.price)					} 	
			} else {
				this.$router.push('/')
			}
			console.log(this.itreation)
		}
	}
</script>



<style scoped>
	.left {
		left: 3.5rem;
		bottom: 30px
	}
/*	.my-1 px-3 {
		margin: 2px 0;
		padding: 0 10px;
		color: #777
	}*/
	p.sm-text {font-size: 14px;}	
	.card-img {
		padding: 15px 0;
		position: relative;
	}
	.card-img img {
	    width: 85%;
	    margin: 0 auto;
	    display: block;
	}
	a {text-decoration: none;}
</style>
