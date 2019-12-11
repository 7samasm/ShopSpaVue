<template>
	<v-layout row justify-center class="mt-5">
		<v-flex md4>
<!-- 			<v-card>
				<v-card-text> -->
				<v-form>
					<v-text-field
						solo
						ref="mm"
						label="username"
						appendIcon="person"
						color="purple"></v-text-field>
					<v-text-field 
						solo
						type="password"
						label="password"
						appendIcon="keyboard"
						color="purple"></v-text-field>
					<v-btn outline block color="purple" class="ml-0">login</v-btn>					
				</v-form>
		<!-- 	</v-card-text>
			</v-card> -->
		</v-flex>
	</v-layout>
</template>