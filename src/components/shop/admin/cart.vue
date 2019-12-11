<template>
	<v-layout row wrap>

		<v-flex xs12 v-for="(cart,index) in data" :key="index">
			<v-card class="card-item">
				<v-layout row wrap justify-center>
					<v-flex xs10 md2>
						<v-responsive><v-img src="../../../../public/d.jpg" alt="" class="avatar"></v-img></v-responsive>
					</v-flex>
					<v-flex xs10 md3>
						<p>{{cart.productId.title}}</p>
					</v-flex>
					<!-- <v-spacer></v-spacer> -->
					<v-flex xs10 md3>
						<p>{{cart.productId.price * cart.quantity}} SDG</p>
					</v-flex>
					<v-flex xs10  md3>
						<p>quantity : {{cart.quantity}} pcs</p>
					</v-flex>
					<v-flex xs10 md1>
						<v-btn flat fab @click="deleteCartItem(cart.productId._id)"><v-icon color="#FF5049">delete</v-icon></v-btn>
					</v-flex>					
				</v-layout>
			</v-card>
		</v-flex>

		<v-flex xs3 v-if="totalPrice > 0">
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
				'data',
				'totalPrice',
				'totalCartItems'
			])
		},
		methods : {
			...mapActions([
				'removeCartItem',
				'restAllStates'
			]),
			async deleteCartItem(id){
				const d = await this.removeCartItem(id)
				console.log(d)
			}
		},
		created(){
			this.restAllStates()
		}
	}
</script>

<style scoped>
	.card-item {
		margin: 2px 0
	}
	.avatar {
		width: 50%/*8rem*/
	}
	p{margin: 0; line-height: 65px}
	.total-price p {
		line-height : 30px;
		padding: 0 10px
	}
	.right{
		float: right;
	}
</style>