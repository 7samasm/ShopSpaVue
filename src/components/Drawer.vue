<template>
    <v-layout
    wrap
    style="height: 100%;">

        <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        >
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/logo.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{user.name}}</v-list-tile-title>
                    </v-list-tile-content>

                    <router-link v-if="!isLoggedIn"tag="div" to="/admin/login" class="v-list__tile__action">
                        <v-icon  @click="drawer = false" color="pink">exit_to_app</v-icon>
                    </router-link>

                    <v-list-tile-action v-else>
                        <v-icon  @click="logout" color="pink">logout</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <router-link
                tag="a"
                class="v-list__tile v-list__tile--link theme--light"
                v-for="item in items"
                :to="item.link"
                :key="item.title">

                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="pink">{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
import {eventBus} from '../main';
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            drawer: false,
            items: [
                { title: 'Home', icon: 'home', link : '/' },
                { title: 'add product', icon: 'add_circle_outline' , link : '/admin/add-product' },
                { title: 'My Products', icon: 'work' , link : '/admin/my-product' }
            ]
        }
    },
    computed : {
        ...mapGetters(['isLoggedIn','user'])
    },
    methods : {
        logout() {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/admin/login')
            })
        }
    },
    created() {
        eventBus.$on('openDrawer',d => {
        this.drawer = d;  
        });
    }
}
</script>