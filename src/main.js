import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import {store} from './store/store'

Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
