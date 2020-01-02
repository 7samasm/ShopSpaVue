<template>
	<v-card hover class="mb-2">
		<v-row>
			<v-col cols="12" sm="12" class="pb-0">
				<slot></slot>
				<div class="card-img">
					<img src="../../../public/d.jpg" alt="">
				</div>
			</v-col>
			<v-col cols="12" sm="12">
				<h3 class="title">{{prod.title}}</h3>
				<div class="desc">{{prod.description}}</div>
				<div class="price">{{prod.price | currency}}</div>
			</v-col>
		</v-row>
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
	.card-img img {
	    width: 70%;
	    margin: 0 auto;
	    display: block;
	}
	h3.title {text-align: center; padding: 5px 0}
	.desc {
		padding: 0 2rem;
		padding-bottom: 2rem;
		color: #888
	}
	.price  {
	    background: #ca33e4;
	    color: #fff;
	    padding: 4px;
	    font-weight: bold;
	    text-align: center;
	}
</style>