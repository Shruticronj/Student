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

	getCurriculumByCourse: (data,academicYear) => {
		let url = serverAddress + '/api/curriculum/getAllCurriculum';
		let config= configHeader();
		return axios.post(url, data, config);
	},

	addCurriculum: (curriculum) => {
		let url = serverAddress + '/api/curriculum/addCurriculum';
		let config= configHeader();
		return axios.post(url, curriculum, config);
	},

	deleteCurriculum: (curriculum) => {
		let url = serverAddress + '/api/curriculum/deleteCurriculum';
		let config= configHeader();
		return axios.put(url, curriculum, config);
	},

	editCurriculum: (curriculum) => {
		let url = serverAddress + '/api/curriculum/editCurriculum';
		let config= configHeader();
		return axios.put(url, curriculum, config);
	},

	getDepartmentList : (curriculum) =>{
		let departmentList =[]
		let url = serverAddress + '/api/curriculum/getDepartmentList';
		let config= configHeader();
		return axios.post(url,curriculum,config)
	},

	getSemesterList : (semester) =>{
		let departmentList =[]
		let url = serverAddress + '/api/curriculum/getSemester';
		let config= configHeader();
		return axios.post(url,semester,config)
	},
}

export default utils;	