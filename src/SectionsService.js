import  axios from 'axios'

const url = '/api/admin'

export default class UserService {

	static getSections(id) {

		return new Promise(async (resolve,reject) => {
			try
			{
				const {data}  = await axios.get(`${url}/sections`)
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

}