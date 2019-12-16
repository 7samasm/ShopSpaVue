// import axios from 'axios'
import UserService from '../../UserService';
import ShopService from '../../ShopService';

const state = {
    status: '',
    token : localStorage.getItem('token') || '',
    userId: '',
    cart  : {},
    myProducts : []
};
const getters = {
    isLoggedIn      : state => !!state.token,
    authStatus      : state => state.status,
    myProducts      : state => state.myProducts   || {},
    cart            : state => state.cart.products   || [],
    totalPrice      : state => state.cart.totalPrice || 0,
    totalCartItems  : state => state.cart.totalItems ||0
}
const mutations = {
    set_cart(state,cart){
        state.cart = cart
    },
    set_my_products(state,prods){
        state.myProducts = prods
    },    
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, {token, userId}) {
        state.status = 'success'
        state.token  = token
        state.userId = userId
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''
        state.token = '',
        state.cart  ={},
        state.myProducts = []
    }
}
const actions = {
    login({ commit }, user) {
        return new Promise(async(resolve, reject) => {
        	try {
	            commit('auth_request')
	            const resp      = await UserService.login(user.username, user.password)
	            const token  = resp.token
	            const userId = resp.userId
	            localStorage.setItem('token', token)
	            // axios.defaults.headers.common['x-Auth'] = token
	            commit('auth_success', {token,userId})
                commit('set_my_products' , await UserService.getProducts())
                commit('set_cart',await ShopService.getCart())
	            resolve(resp)
        	} catch(e) {
	            commit('auth_error')
	            localStorage.removeItem('token')
            	reject(e.message)
        	}
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            // delete axios.defaults.headers.common['x-Auth']
            resolve()
        })
    },
    async removeCartItem({commit,state},prodId){
        let isDeletedFromCart 
        // check if prod pram id (item) its not on cart
        const indexOfProduct = state.cart.products.findIndex(cp => {
            // test
            return cp.productId._id.toString() === prodId.toString();
        });
        // if item in the cart
        if (indexOfProduct >= 0) {
            // remove it
            await ShopService.deleteCartItem({productId : prodId})
            // then rest state
            commit('set_cart',await ShopService.getCart())
            isDeletedFromCart = true
        } else {
            isDeletedFromCart = false
        }
        return isDeletedFromCart
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}