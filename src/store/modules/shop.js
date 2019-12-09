import ShopService from '../../ShopService';

const state =
{
	data : [],
	totalPrice : 0,
	totalCartItems : 0
}

const getters =
{
	data            : state => state.data,
	totalPrice      : state => state.totalPrice,
	totalCartItems  : state => state.totalCartItems
}
// helper funcs
const getCart = async cb => {
	const res = await ShopService.getCart()
	cb(res)
}
const restAll = (state) => {
	getCart(res => {
		state.totalCartItems = res.totalItems
		state.data           = res.products
		state.totalPrice     = res.totalPrice
		console.log('%c all state elements were reset','color:purple')
	})
}
const mutations =
{
	// setters
	reSetTotal(state){
		getCart(res => {
			state.totalCartItems = res.totalItems
		})
	},
	restAllState(state) {
		restAll(state)
	},
	// methods
	deleteCartItem(state,prodId) {
		//get cart data from callback
		getCart(res => {
			// check if prod pram id (item) its not on cart
			const indexOfProduct = res.products.findIndex(cp => {
				// test
        		return cp.productId._id.toString() === prodId.toString();
    		});
    		// if item in the cart
    		if (indexOfProduct >= 0) {
    			// remove it
				ShopService.deleteCartItem({productId : prodId}).then(()=>{
					// then rest state
					restAll(state)
				})
    		} else {
    			return;
    		}
		})
	}
}

const actions = {
    restAllStates({commit}){
    	commit('restAllState')
    },
    setTotalCart({commit}) {
        commit('reSetTotal')
    },
    removeCartItem({commit},payload){
        commit('deleteCartItem',payload)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}