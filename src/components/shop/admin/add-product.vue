<template>
	<v-layout row wrap justify-center>
		<v-flex xs12 md6>
			<h3 class="main-text">Add Product</h3>
			<formTemplate/>			
		</v-flex>
	</v-layout>
</template>

<script>
	import formTemplate from './form';
	export default {
		components : {
			formTemplate
		}
	}
</script>

<style scoped>
	.main-text{
    color: #888;
    line-height: 5rem;
}
</style>