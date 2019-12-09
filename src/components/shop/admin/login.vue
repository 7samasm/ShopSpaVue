<template>
	<v-layout row justify-center class="mt-5">
		<v-flex md4>
			<v-card>
				<v-card-text>
				<v-form>
					<v-text-field 
						ref="title"
						label="username"
						appendIcon="folder"
						color="purple"></v-text-field>
					<v-text-field 
						type="password"
						ref="title"
						label="password"
						appendIcon="face"
						color="purple"></v-text-field>
					<v-btn flat color="purple" class="ml-0">login</v-btn>					
				</v-form>
			</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>