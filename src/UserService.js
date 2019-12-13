import  axios from 'axios'

const url = 'http://localhost:3001/admin'

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

	static login(name,password) {
		return new Promise(async (resolve,reject) => {
			try {
				const {data} = await axios.post(`${url}/login`,{name,password})
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
				const {data}  = await axios.get(
					`${url}/products`,
					{
						headers : {'x-Auth' : localStorage.getItem('token')}
					}
				)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}
}