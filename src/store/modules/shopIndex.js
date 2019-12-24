import ShopService from '../../ShopService';

const state =
{
	data : [],
}

const getters =
{
	data  : state => state.data,
}

const mutations =
{
	SET_DATA(state,data){
		state.data = data
	}
}

const actions = {
    setIndex({commit}){
    	commit('SET_DATA')
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}