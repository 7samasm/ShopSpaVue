import  axios from 'axios'

const url = '/api/admin'

export default class UserService {

	static getUser(id) {

		return new Promise(async (resolve,reject) => {
			try
			{
				const res  = await axios.get(`${url}products/${id}`)
				const data = res.data;
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}
	static login(email,password) {
		return new Promise(async (resolve,reject) => {
			try {
				const {data} = await axios.post(`${url}/login`,{email,password})
				resolve(data)
			} catch(e) {
				reject(e)
			}
		})
	}

	static signUp(name,email,password) {
		return new Promise(async (resolve,reject) => {
			try {
				const {data} = await axios.post(`${url}/signup`,{name,email,password})
				resolve(data)
			} catch(e) {
				// statements
				reject(e.message)
			}
		})
	}


	static getProducts() {
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/products`)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

	static userInfos() {
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/user-info`)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

	static getProduct(id) {
		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/products/${id}`)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

}