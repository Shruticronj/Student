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

	getTeacherList: (data) => {
		let url = serverAddress + '/api/teacher/getTeacherList';
		let config= configHeader();
		return axios.post(url, data, config);
	},

	addTeacher: (data) => {
		let url = serverAddress + '/api/teacher/addTeacher';
		let config= configHeader();
		return axios.post(url, data, config);
	},

	deleteTeacher: (data) => {
		let url = serverAddress + '/api/teacher/deleteTeacher';
		let config= configHeader();
		return axios.put(url, data, config);
	},

	editTeacher: (data) => {
		let url = serverAddress + '/api/teacher/editTeacher';
		let config= configHeader();
		return axios.put(url, data, config);
	},
}

export default utils;	