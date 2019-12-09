import 	Vue  from 'vue'
import  Vuex from 'vuex'

import  shop from './modules/shop'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        shop
    }
})