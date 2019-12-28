import UserService from '../../../UserService'
import ShopService from '../../../ShopService'
import axios from 'axios'


const login = function({ commit ,dispatch }, {email,password}){
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
};
const logout = function({ commit }){
    return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['x-Auth']
        resolve()
    })
};
const resetUCP = async function({commit,getters}){
    console.log(this)
    if (!getters.isLoggedIn) return
    // set default heder requst Auth to token val
    axios.defaults.headers.common['x-Auth'] = getters.token
    // set and cart and my producs state
    const info = await UserService.userInfos()
    commit('set_user' , info)
    commit('set_my_products' , info)
    commit('set_cart',info)
};


export default {
    login,
    logout,
    resetUCP
}