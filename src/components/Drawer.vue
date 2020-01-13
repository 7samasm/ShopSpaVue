<template>
    <v-layout
    wrap
    style="height: 100%;">

        <v-navigation-drawer
        :value="isDrawerOpen"
        @input="$store.commit('set_drawer',$event)"
        fixed
        temporary
        >
            <v-list-item>
                <v-list-item-avatar>
                    <img src="../assets/logo.png">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{user.name}}</v-list-item-title>
                </v-list-item-content>

                <router-link v-if="!isLoggedIn"tag="div" to="/admin/login" class="v-list__item__action">
                    <v-icon>exit_to_app</v-icon>
                </router-link>

                <v-list-item-action v-else>
                    <v-icon  @click="logout">logout</v-icon>
                </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense shaped>

                <v-list-item
                    v-for="item in items"
                    :to="item.link"
                    :key="item.title"
                    v-if="item.render">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                    color="black"
                    appendIcon="expand_more"
                    prepend-icon="list">
                    <template v-slot:activator>
                      <v-list-item-title>Sections</v-list-item-title>
                    </template>
                    <v-list-item
                        v-for="sect in sections"
                        :to="'/sections/' + sect.name"
                        :key="sect._id"
                        class="pl-10">
                        <v-list-item-subtitle>{{ sect.name }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed : {
        ...mapGetters(['isLoggedIn','user','sections','isDrawerOpen']),
        items (){
            return [
                { 
                    title: 'Home', icon: 'home', link : '/' ,
                    render : true 
                },
                { 
                    title: 'add product', icon: 'add_circle_outline',
                    link : '/admin/add-product',
                    render : this.isLoggedIn
                },
                { 
                    title: 'My Products', icon: 'work_outline',
                    link : '/admin/my-product',
                    render : this.isLoggedIn
                }
            ]
        }
    },
    methods : {
        logout() {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/admin/login')
            })
        }
    }
}
</script>