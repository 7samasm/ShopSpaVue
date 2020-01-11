<template>
	<v-row v-if="cart.indexOf('init') === -1">
		<v-col 
			cols="12" 
			class="py-1"
			v-for="(item,index) in cart" :key="index">
			<v-card class="card-item">
				<v-row align="center">
					<v-col  cols="2"  class="py-1 hidden-sm-and-down">
						<!-- http://localhost:3001 https://shop-spa-test.herokuapp.com -->
						<v-avatar size="50px" class='ml-2'><v-img :src="'http://localhost:3001/img/' + item.imageUrl" alt="" class="avatar"></v-img></v-avatar>
					</v-col>
					<v-col class="py-1 text-center" :cols="toggleAutoGrid">
						<p>{{item.title}}</p>
					</v-col>
					<v-col class="py-1 text-center" :cols="toggleAutoGrid">
						<p>{{item.price * item.quantity | currency}}</p>
					</v-col>
					<v-col class="py-1 text-center" :cols="toggleAutoGrid">
						<p>quantity : {{item.quantity}} pcs</p>
					</v-col>
					<v-col class="py-1" :cols="toggleAutoGrid">
						<v-btn 
						:small="isMobile ? true : false"
						:color="isMobile ? 'red' : ''"
						:outlined="isMobile" 
						:text="!isMobile" 
						:fab="!isMobile"
						:class="isMobile ? 'dBlock' : 'float-right mr-2'"
						@click="removeCartItem(item._id)">
							<v-icon color="#FF5049" :small="isMobile ? true : false">delete</v-icon>
						</v-btn>
					</v-col>					
				</v-row>
			</v-card>
		</v-col>

		<v-col v-if="totalPrice > 0">
			<v-card text outlined class="card-item total-price">
				<v-row align-content="space-between">
					<v-col><p class="pl-2">total price :</p></v-col>
					<v-spacer></v-spacer>
					<v-col><p class="text-right pr-2 teal--text">{{totalPrice | currency}}</p></v-col>
				</v-row>
			</v-card>
		</v-col>
		<v-col v-else>
			<v-alert  icon="warning" outlined text :value="true" type="warning">there are no products to show</v-alert>
		</v-col>
	</v-row>

	<v-row v-else>
		<v-col v-for="(x,i) in 3" :key="i" cols="12" class="py-2">
		    <v-skeleton-loader
		    	max-height="138"
		        :type="isMobile ? 'image':'list-item-avatar'"></v-skeleton-loader>
		</v-col>	
	</v-row>

</template>

<script>
	import {mapActions,mapGetters} from 'vuex'
	export default {
		computed : {
			...mapGetters([
				'cart',
				'totalPrice',
				'totalCartItems'
			]),
			isMobile(){
				let val = false
				if (this.$vuetify.breakpoint.xs) val = true
				return val
			},
			toggleAutoGrid() { return this.isMobile  ? 12 : false }
		},
		methods : {
			...mapActions([
				'removeCartItem'
			])
		}
	}
</script>

<style scoped>
	.avatar {
		width: 50%
	}
	p{margin: 0;}
	.dBlock {
		display: block;
		margin: 0 auto 5px
	}
</style>