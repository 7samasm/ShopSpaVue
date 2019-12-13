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
		return axios.post(
		   `${url}/admin/add-product`,
			product,
			{
				headers : {'x-Auth' : localStorage.getItem('token')}
			}
		)
	}
	static deleteProduct(productId){
		return axios.post(
		   `${url}/admin/delete-product`,
			productId,
			{
				headers : {'x-Auth' : localStorage.getItem('token')}
			}		
		)
	}
	static editProduct(productId){
		return axios.post(
			`${url}/admin/edit-product`,
			productId,
			{
				headers : {'x-Auth' : localStorage.getItem('token')}
			}			
		)
	}	
	// 2 -> cart
	static getCart(){
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/cart`,{
					headers : {'x-Auth' : localStorage.getItem('token')}
				})
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

	static insertCartItem(product){
		return new Promise(async (resolve,reject) => {
			try {
				const {data} = await axios.post(
					`${url}/cart`,
					product,
					{
						headers : {'x-Auth' : localStorage.getItem('token')}
					}
				)
				resolve(data)
			} catch(e) {
				reject(e)
			}
		})
	}

	// cart-delete-item
	static deleteCartItem(product) {
		return axios.post(
		   `${url}/cart-delete-item`,
			product,
			{
				headers : {'x-Auth' : localStorage.getItem('token')}
			}
		)
	}
}