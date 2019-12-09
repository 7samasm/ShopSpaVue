import DataItemsService from '../../DataItemsService'
// const state = {
//     funds: 10000,
//     stocks: []
// };

const state = {
    color : "teal",
    addBoardClass : "add"
};

const mutations = {
    // 'ADD_ITEM'(state,newItem)
    // {

    //     try {
    //         //insert an item row into data.json
    //         await DataItemsService.insertItem(newItem);
    //         //update data of store to update ui
    //         commit('data',await DataItemsService.getDataItems())
    //     } catch(e) {
    //         console.log(e);
    //     }
        
    // },
    'SET_COLOR'(state,val){
        state.color = val
    },
    'SET_ADD_BOARD_CLASS'(state,val){
        state.addBoardClass = val
    }
}

// const mutations = {
//     'BUY_STOCK'(state, {stockId, quantity, stockPrice}) {
//         const record = state.stocks.find(element => element.id == stockId);
//         if (record) {
//             record.quantity += quantity;
//         } else {
//             state.stocks.push({
//                 id: stockId,
//                 quantity: quantity
//             });
//         }
//         state.funds -= stockPrice * quantity;
//     },
//     'SELL_STOCK' (state, {stockId, quantity, stockPrice}) {
//         const record = state.stocks.find(element => element.id == stockId);
//         if (record.quantity > quantity) {
//             record.quantity -= quantity;
//         } else {
//             state.stocks.splice(state.stocks.indexOf(record), 1);
//         }
//         state.funds += stockPrice * quantity;
//     },
//     'SET_PORTFOLIO' (state, portfolio) {
//         state.funds = portfolio.funds;
//         state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
//     }
// };

// const actions = {
//     sellStock({commit}, order) {
//         commit('SELL_STOCK', order);
//     }
// };

const actions = {
    
    setColor({commit},payload) {
        commit('SET_COLOR',payload)
    },
    setAddBoardClass({commit},payload){
        commit('SET_ADD_BOARD_CLASS',payload)
    }
};

// const getters = {
//     stockPortfolio (state, getters) {
//         return state.stocks.map(stock => {
//             const record = getters.stocks.find(element => element.id == stock.id);
//             return {
//                 id: stock.id,
//                 quantity: stock.quantity,
//                 name: record.name,
//                 price: record.price
//             }
//         });
//     },
//     funds (state) {
//       return state.funds;
//     }
// };

const getters = {
    color (state) {
      return state.color;
    },
    addBoardClass(state) {
        return state.addBoardClass
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}