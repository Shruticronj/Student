import studentApi from './../utils/api/student';
import * as types from './../constants';

export function getStudentList(reqObject){

	return {
		type: types.STUDENT_LIST,
		payload:
			studentApi.getStudentList(reqObject)
			.then((response) => {
				return response.data;
			})
	};
}

export function addStudent(student){
	return {
		type: types.ADD_STUDENT,
		payload:
			studentApi.addStudent(student)
			.then((response) => {
				return response.data;
			})
	};
}

export function deleteStudent(student){
	return {
		type: types.DELETE_STUDENT,
		payload:
			studentApi.deleteStudent(student)
			.then((response) => {
				return response.data;
			})
	};
}

export function editStudent(student){
	return {
		type: types.EDIT_STUDENT,
		payload:
			studentApi.editStudent(student)
			.then((response) => {
			return response.data;
			})
	};
}


export function hideSlackBar(){
	return {
		type: types.HIDE_SLACKBAR
	};
}

export function updateSlackBarMsg(message){
	return {
		type: types.CHANGE_SLACKBAR_MSG,
		payload: message
	};
}

export function handleTabChange(value) {
	return {
		type: types.HANDLE_TAB_CHANGE,
		payload: value
	};
}


export function pageChange(currentPage , size) {
	return {
		type: types.PAGE_CHANGE,
		payload: currentPage
	};
}
