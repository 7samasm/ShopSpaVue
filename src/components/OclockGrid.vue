<template>
    <v-layout row wrap>
    	<v-flex xs12>
    		<v-text-field color="teal" label="user"></v-text-field>
    	</v-flex>
        <app-oclock v-for="(x,index) in 4" :key="index"></app-oclock>
    </v-layout>
</template>

<script>
    import Oclock from './Oclock.vue';
    export default {
        components: {
            appOclock: Oclock
        }
    }
</script>
