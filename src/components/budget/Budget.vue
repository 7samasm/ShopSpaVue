<template>
	<div>
		<budgetBoard/>
		<budgetAdd/>
		<budgetItems/>
	</div>
</template>

<script>

	import budgetBoard from './BoardTwo'
	import budgetAdd from './Add'
	import budgetItems from './ItemsGrid'

	export default {
		components: 
		{
			budgetBoard,
			budgetAdd,
			budgetItems,
		}
	}
</script>