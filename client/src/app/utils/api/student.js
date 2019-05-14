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

	getStudentList: (data) => {
		let url = serverAddress + '/api/student/getStudentList';
		let config= configHeader();
		return axios.post(url, data, config);
	},

	addStudent: (student) => {
		let url = serverAddress + '/api/student/addStudent';
		let config= configHeader();
		return axios.post(url, student, config);
	},

	deleteStudent: (student) => {
		let url = serverAddress + '/api/student/deleteStudent';
		let config= configHeader();
		return axios.put(url, student, config);
	},

	editStudent: (student) => {
		let url = serverAddress + '/api/student/editStudent';
		let config= configHeader();
		return axios.put(url, student, config);
	},
}

export default utils;	