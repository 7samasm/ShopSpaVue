<template>
    <nav>
        <v-toolbar flat color="#f3eaf48c">
            <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn text to="/" class="hidden-sm-and-down">Home</v-btn>
                <v-btn text to="/admin/my-product" v-if="isLoggedIn" class="hidden-sm-and-down">My Products</v-btn>
                <v-btn text to="/admin/cart" v-if="isLoggedIn">
                    <v-badge color="#ff3a7d" :value="totalCartItems > 0">
                        <template v-slot:badge>{{totalCartItems}}</template>
                        <v-icon color="purple">shopping_cart</v-icon>
                    </v-badge>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <drawer></drawer>
    </nav>
</template>
<script>
import { eventBus } from '../main';
import drawer from './Drawer.vue';
import ShopService from '../ShopService';
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'totalCartItems',
            'isLoggedIn'
        ])
    },
    components: {
        drawer,
    },
    methods: {
        openDrawer() {
            eventBus.$emit('openDrawer', true);
        }
    }
}
</script>