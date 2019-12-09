const state =
{
    dataItems : [],
    totals : {
        inc : 0,
        exp : 0
    },
    budget : 0,
    percentage : -1,
    drawer : false
}

const getters =
{
	dataItems  : state => state.dataItems,
    totals     : state => state.totals,
    budget     : state => state.budget = state.totals['inc'] - state.totals['exp'],
    percentage : state => state.percentage,
	drawer     : state => state.drawer
}
const mutations =
{
	dataItems(state,val) {
		state.dataItems = val
	},
    totals(state,key,val) {
        state.totals[key] = val
    },
    percentage(state,val) {
        state.percentage = val
    },       
	drawer(state,boolValue) {
		state.drawer = boolValue
	},
    'CALCULATE_TOTAL'(state,type)
    {
        let sum = 0 , total;
        total = state.dataItems.filter(dataItems => dataItems._type === type)
        total.forEach(cur => {
            sum += cur._value
        });
        state.totals[type] = sum
    }
    // 'GET_ITEMS_BY_TYPE'(state,type)
    // {
    //     let arr = []
    //     arr = state.dataItems.filter(dataItems => dataItems._type === type)
    //     return arr;
    // },    
}

const actions = {
    calculateTotal({commit},payload){
        commit('CALCULATE_TOTAL',payload)
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}