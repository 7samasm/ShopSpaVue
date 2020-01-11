<template>
    <nav>
        <v-toolbar flat color="#f3eaf48c">
            <v-btn icon @click="openDrawer(true)"><v-icon>menu</v-icon></v-btn>
            <v-toolbar-title>{{routeName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn text to="/" class="hidden-sm-and-down">Home</v-btn>
                <v-btn text to="/admin/my-product" v-if="isLoggedIn" class="hidden-sm-and-down">My Products</v-btn>
            </v-toolbar-items>
            <template  v-if="isLoggedIn">
                <v-btn icon to="/admin/add-product">
                    <v-icon color='purple'>add_circle_outline</v-icon>
                </v-btn>
                <v-btn icon to="/admin/cart" class='mr-1'>
                    <v-badge color="#ff3a7d" :value="totalCartItems > 0">
                        <template v-slot:badge>{{totalCartItems}}</template>
                        <v-icon color="purple">shopping_cart</v-icon>
                    </v-badge>
                </v-btn>
            </template>
        </v-toolbar>
        <drawer></drawer>
    </nav>
</template>
<script>
import drawer from './Drawer.vue';
import ShopService from '../ShopService';
import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return {
            toolbarTitle : 'mmm'
        }
    },
    computed: {
        ...mapGetters([
            'totalCartItems',
            'isLoggedIn'
        ]),
        routeName(){
            if (this.$route.name === 'sections')
                return this.$route.params.section
            return this.$route.name
        }
    },
    watch : {
        $route() {
            this.toolbarTitle = this.$route
        }
    },
    components: {
        drawer,
    },
    methods: {
        openDrawer(v) {
            this.$store.commit('set_drawer',v);
        }
    },
    created() {console.log(this.routeName)}
}
</script>