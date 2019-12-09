import  axios from 'axios'

const url = 'http://localhost:3001/'

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
}