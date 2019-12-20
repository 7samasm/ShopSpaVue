<template>
  <v-app>

    <appHeader/>

    <v-content>

        <v-container grid-list-md class="mt-4">
            <router-view></router-view>
        </v-container>
      
    </v-content>

  </v-app>
</template>

<script>
    import appHeader from './components/Header'
    export default 
    {
        name: 'App',
        components: 
        {
            appHeader
        },
        created(){
            this.$store.dispatch('resetUCP')
        }
    }
</script>

<style>
body{
  color: #555;
}
</style>
