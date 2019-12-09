import ShopService from '../../ShopService';

const state =
{
	data : [],
}

const getters =
{
	data            : state => state.data,
}
// helper funcs
const setState = async cb => {
	const res = await ShopService.getProducts()
	cb(res)
}
const mutations =
{
	// setters
	restData(state){
		setState(res => {
			state.data = res
		})
	}
}

const actions = {
    getIndex({commit}){
    	commit('restData')
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}