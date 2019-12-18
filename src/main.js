import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

// axios.defaults.headers.common['x-Auth'] = localStorage.getItem('token') || 'none'

Vue.use(Vuelidate)

import {store} from './store/store'

Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
