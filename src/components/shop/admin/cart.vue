<template>
	<v-layout row wrap>

		<v-flex xs12 v-if="cart" v-for="(item,index) in cart" :key="index">
			<v-card class="card-item">
				<v-layout v-bind="binding" align-center>
					<v-flex xs12 md2>
						<v-responsive><v-img src="../../../../public/d.jpg" alt="" class="avatar"></v-img></v-responsive>
					</v-flex>
					<v-flex xs12 md3>
						<p>{{item.productId.title}}</p>
					</v-flex>
					<!-- <v-spacer></v-spacer> -->
					<v-flex xs12 md3>
						<p>{{item.productId.price * item.quantity}} SDG</p>
					</v-flex>
					<v-flex xs12  md3>
						<p>quantity : {{item.quantity}} pcs</p>
					</v-flex>
					<v-flex xs12 md1>
						<v-btn 
						:small="isMobile ? true : false"
						:color="isMobile ? 'red' : ''"
						:outline="isMobile" 
						:flat="!isMobile" 
						:fab="!isMobile" 
						@click="removeCartItem(item.productId._id)">
							<v-icon color="#FF5049" :small="isMobile ? true : false">delete</v-icon>
						</v-btn>
					</v-flex>					
				</v-layout>
			</v-card>
		</v-flex>

		<v-flex xs12 md3 v-if="totalPrice > 0">
			<v-card flat class="card-item total-price">
				<v-layout row wrap>
					<v-flex xs6><p>total price :</p></v-flex>
					<v-spacer></v-spacer>
					<v-flex xs6><p class="right">{{totalPrice}} SDG</p></v-flex>
				</v-layout>
			</v-card>
		</v-flex>
		<v-flex md12 v-else>
			<v-alert  dense  outline :value="true" type="warning">there are no products to show</v-alert>
		</v-flex>
	</v-layout>
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
			binding(){
				const binding = {}
				if (this.$vuetify.breakpoint.xs) {
					binding.column = true
					return binding
				}
			},
			isMobile(){
				let val = false
				if (this.$vuetify.breakpoint.xs) {val = true}
				return val
			}
		},
		methods : {
			...mapActions([
				'removeCartItem'
			])
		},
		created(){console.log(this.binding);console.log(this.$vuetify.breakpoint)}
	}
</script>

<style scoped>
	.card-item {
		margin: 2px 0
	}
	.avatar {
		width: 50%/*8rem*/
	}
	p{margin: 0;}
	.total-price p {
		line-height : 30px;
		padding: 0 10px
	}
	.right{
		float: right;
	}
</style>