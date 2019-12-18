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
    import axios from 'axios'
    import appHeader from './components/Header'
    import ShopService from './ShopService';
    import UserService from './UserService';
    export default 
    {
        name: 'App',
        // store,
        components: 
        {
            appHeader
        },
        async created(){
            const store = this.$store
            if(store.getters.isLoggedIn){
                axios.defaults.headers.common['x-Auth'] = store.getters.token
                store.commit('set_cart',await ShopService.getCart())
                store.commit('set_my_products',await UserService.getProducts())
            }
        }
    }
</script>

<style>
body{
  color: #555;
}
</style>
