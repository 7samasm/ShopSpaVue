<template>
	<v-card hover class="mb-2">
		<v-layout column justify-center>
			<v-flex md12>
				<slot></slot>
			</v-flex>
			<v-flex md12>
				<div class="card-img">
					<img src="../../../public/d.jpg" alt="">
				</div>
			</v-flex>
			<v-flex md12>
				<h3 class="title">{{prod.title}}</h3>
				<div class="desc">{{prod.description}}</div>
				<div class="price">{{prod.price}} SDG</div>
			</v-flex>
		</v-layout>
	</v-card>
</template>


<script>
	export default {
		props : ['product'],
		computed : {
			prod(){
				return this.product
			}
		}
	}
</script>

<style scoped>
/*	.card-img {
		padding-top: 20px;
		position: relative;
	}*/
	.card-img img {
	    width: 70%;
	    margin: 0 auto;
	    display: block;
	}
	h3.title {text-align: center; padding: 10px 0}
	.desc {
		padding: 0 2rem;
		padding-bottom: 2rem;
		color: #888
	}
/*	.price  {
	    position: relative;
	    text-align: center;
	}*/
	.price  {
	    background: #ca33e4;
	    color: #fff;
	    padding: 4px;
	    font-weight: bold;
	    text-align: center;
	}
</style>