const state =
{
    allPdata : {}
    // recordsNum : 0
    // currPage : 1,
    // totalPages : 0,
    // hasNext : false,
    // hasPrev : false
}

const getters =
{
	allPdata   : state => state.allPdata
}
const mutations =
{
	allPdata(state,val) {
		state.allPdata = val
	}   
}

const actions = {
    allPdata({commit},payload){
        commit('SET_ALL_P_DATA',payload)
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}