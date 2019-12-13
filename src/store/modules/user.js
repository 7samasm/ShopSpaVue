// import axios from 'axios'
import UserService from '../../UserService';

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    userId: ''
};
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
}
const mutations = {
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
        state.token = ''
    }
}
const actions = {
    login({ commit }, user) {
        return new Promise(async(resolve, reject) => {
        	try {
	            commit('auth_request')
	            const resp   = await UserService.login(user.username, user.password)
	            const token  = resp.token
	            const userId = resp.userId
	            localStorage.setItem('token', token)
	            localStorage.setItem('userId', userId);
	            // axios.defaults.headers.common['x-Auth'] = token
	            commit('auth_success', {token,userId})
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
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}