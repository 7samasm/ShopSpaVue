<template>
    <nav>
        <v-toolbar flat>
            <v-toolbar-side-icon @click="openDrawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <router-link to="/" tag="button" class="v-btn v-btn--flat theme--light hidden-sm-and-down">Home</router-link>
                <router-link to="/admin/my-product" tag="button" class="v-btn v-btn--flat theme--light hidden-sm-and-down" v-if="isLoggedIn">My Products</router-link>
                <router-link to="/admin/cart" tag="button" class="v-btn v-btn--flat theme--light" v-if="isLoggedIn">
                    <v-badge color="#ff3a7d">
                        <template v-slot:badge>{{totalCartItems}}</template>
                        <v-icon color="purple">shopping_cart</v-icon>
                    </v-badge>
                </router-link>
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