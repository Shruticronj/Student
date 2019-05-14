import axios from 'axios';
import Auth from './../../Auth.js';
// let serverAddress= 'http://192.168.1.192.168.1.173:3000';
let serverAddress = 'http://localhost:3000'

let configHeader= ()=> {
	let token = Auth.getToken();
	let authString = 'bearer ' + token;
	let config = {
		headers: {
    		'Authorization': authString
	 	}
	}
	return config;
}

const utils = {

	getSubjectList: (data) => {
		let url = serverAddress + '/api/subject/getSubjectList';
		let config= configHeader();
		return axios.post(url, data, config);
	},

	addSubject: (subject) => {
		let url = serverAddress + '/api/subject/addSubject';
		let config= configHeader();
		return axios.post(url, subject, config);
	},

	deleteSubject: (subject) => {
		let url = serverAddress + '/api/subject/deleteSubject';
		let config= configHeader();
		return axios.put(url, subject, config);
	},

	editSubject: (subject) => {
		let url = serverAddress + '/api/subject/editSubject';
		let config= configHeader();
		return axios.put(url, subject, config);
	},
}

export default utils;	