import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
// import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.use(Vuelidate)

import {store} from './store/store'
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
