import  axios from 'axios'
import  concat from 'lodash/fp/concat'

const url = 'http://localhost:3001'

export default class ShopService {
	// 1 -> products
	static getProducts() {
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}`)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}


	static getProductById(id) {
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/products/${id}`)
				resolve(data)
				console.log(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

	static insertProduct(product){
		return axios.post(`${url}/admin/add-product`,product)
	}
	static deleteProduct(productId){
		console.log('%c deleteProduct invoked','color:#f00')
		return axios.post(`${url}/admin/delete-product`,productId)
	}
	static editProduct(productId){
		return axios.post(`${url}/admin/edit-product`,productId)
	}	
	// 2 -> cart
	static getCart(){
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/cart`)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

	static insertCartItem(product){
		return new Promise(async (resolve,reject) => {
			try {
				const {data} = await axios.post(`${url}/cart`,product)
				resolve(data)
			} catch(e) {
				reject(e)
			}
		})
	}

	// cart-delete-item
	static deleteCartItem(product) {
		return axios.post(`${url}/cart-delete-item`,product)
	}
}