import ShopService from '../../ShopService';
import UserService from '../../UserService';
import auth        from './user/auth'

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
    ...auth,
    async deleteProduct({commit,dispatch},payload){
        const {id,title} = payload
        if(confirm(`delete ${title} ?`)) {
            // delete product from database
            await ShopService.deleteProduct({productId: id})
            commit('set_cart',await ShopService.getCart())
            commit('set_my_products' , await UserService.userInfos())
        }
    },
    async removeCartItem({commit},prodId){
        await ShopService.deleteCartItem({productId : prodId})
        commit('set_cart',await ShopService.getCart())
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}