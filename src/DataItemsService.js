import  axios from 'axios'
import concat from 'lodash/fp/concat'

const url = 'http://localhost:2020/api/'

export default class DataItemsService {

	static getDataItems() {
		return new Promise(async (resolve,reject) => {
			try
			{
				const res  = await axios.get(`${url}dataItems`)
				const data = res.data;
				resolve(data)
			} catch(err){
				reject(err.message)
			}
		})
	}

	static insertItem(dataItem){
		return axios.post(`${url}dataItem`,dataItem)
	}

	static removeItem(id){
		return axios.delete(`${url}dataItem/${id}`);
	}

	static getDataItemsByType(type){
		return new Promise(async (resolve,reject) => {
			try {
				const res = await axios.get(`${url}dataItems/${type}`)
				const data = res.data;
				resolve(data)
			} catch(e) {
				reject(e.message)
			}
		})
	}
		static getDataItemsByTypeP(page){
		return new Promise(async (resolve,reject) => {
			try {
				const res = await axios.get(`${url}dataItems/ten?page=${page}`)
				const data = res.data;
				resolve(data)
			} catch(e) {
				reject(e.message)
			}
		})
	}
	static getRecordsForEachType(page = 1){
		return new Promise(async (resolve,reject) => {
			let incomes,expences,dataItems = []
			try {
	            dataItems   =  await DataItemsService.getDataItemsByTypeP(page)
	            resolve(dataItems)
			} catch(e) {
				reject(e.message)
				console.log(m)
			}
		})
	}
}