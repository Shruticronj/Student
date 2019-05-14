import teacherApi from './../utils/api/teacher';
import * as types from './../constants';

export function getTeacherList(reqObject){

	return {
		type: types.TEACHER_LIST,
		payload:
			teacherApi.getTeacherList(reqObject)
			.then((response) => {
				return response.data;
			})
	};
}

export function addTeacher(teacher){
	return {
		type: types.ADD_TEACHER,
		payload:
			teacherApi.addTeacher(teacher)
			.then((response) => {
				return response.data;
			})
	};
}

export function deleteTeacher(teacher){
	return {
		type: types.DELETE_TEACHER,
		payload:
			teacherApi.deleteTeacher(teacher)
			.then((response) => {
				return response.data;
			})
	};
}

export function editTeacher(teacher){
	return {
		type: types.EDIT_TEACHER,
		payload:
			teacherApi.editTeacher(teacher)
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
