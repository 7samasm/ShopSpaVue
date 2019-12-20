import axios from 'axios'
import UserService from '../../UserService';
import ShopService from '../../ShopService';

const state = {
    status: '',
    token : localStorage.getItem('token') || '',
    user  : {},
    cart  : {},
    myProducts : []
};
const getters = {
    user            : state => state.user,
    isLoggedIn      : state => !!state.token,
    token           : state => state.token,
    authStatus      : state => state.status,
    myProducts      : state => state.myProducts   || {},
    cart            : state => state.cart.products   || [],
    totalPrice      : state => state.cart.totalPrice || 0,
    totalCartItems  : state => state.cart.totalItems ||0
}
const mutations = {
    set_user(state,{user}){
        state.user = user
    },
    set_cart(state,cart){
        state.cart = cart
    },
    set_my_products(state,{products}){
        state.myProducts = products
    },    
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, token) {
        state.status = 'success'
        state.token  = token
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status= ''
        state.token = '',
        state.user  = {},
        state.cart  ={},
        state.myProducts = []
    }
}
const actions = {
    login({ commit ,dispatch }, {email,password}) {
        return new Promise(async(resolve, reject) => {
        	try {
	            commit('auth_request')
                // request login api
	            const resp   = await UserService.login(email,password)
	            const token  = resp.token
                //set localstorge token value
	            localStorage.setItem('token', token)
                // set token state
                commit('auth_success', token)
                // reset user ,cart and products
                dispatch('resetUCP')
	            resolve(resp)
        	} catch(e) {
	            commit('auth_error')
	            localStorage.removeItem('token')
                const err = {...e}
                let message = err.response.data.error === 'Wrong password!' ? 'Wrong password!' : "A user with this email not be found.";
            	reject({showDialog : true , message})
        	}
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['x-Auth']
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
    },
    async resetUCP({commit,getters}){
        if (!getters.isLoggedIn) {return}
        // set default heder requst Auth to token val
        axios.defaults.headers.common['x-Auth'] = getters.token
        // set and cart and my producs state
        const info = await UserService.userInfos()
        commit('set_user' , info)
        commit('set_my_products' , info)
        commit('set_cart',await ShopService.getCart())
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}