import axios from 'axios';
import Auth from './../../Auth.js';
let serverAddress = 'http://localhost:3000';

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

	resetPassword: (data) => {
		let url = serverAddress + '/auth/forgotPassword';
		let config= configHeader();
		return axios.post(url, data,config)
    }
}

export default utils;