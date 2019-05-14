import subjectApi from './../utils/api/subject';
import * as types from './../constants';

export function getSubjectList(reqObject){

	return {
		type: types.SUBJECT_LIST,
		payload:
			subjectApi.getSubjectList(reqObject)
			.then((response) => {
				return response.data;
			})
	};
}

export function addSubject(student){
	return {
		type: types.ADD_SUBJECT,
		payload:
			subjectApi.addSubject(student)
			.then((response) => {
				return response.data;
			})
	};
}

export function deleteSubject(student){
	return {
		type: types.DELETE_SUBJECT,
		payload:
			subjectApi.deleteSubject(student)
			.then((response) => {
				return response.data;
			})
	};
}

export function editSubject(student){
	return {
		type: types.EDIT_SUBJECT,
		payload:
			subjectApi.editSubject(student)
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
