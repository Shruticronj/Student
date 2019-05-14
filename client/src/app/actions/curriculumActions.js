import curriculumApi from './../utils/api/curriculum';
import * as types from './../constants';

export function getCurriculumList(reqObject){

	return {
		type: types.GET_ALL_CURRICULUM_FOR_COURSE,
		payload:
			curriculumApi.getCurriculumByCourse(reqObject)
			.then((response) => {
				return response.data;
			})
	};
}

export function addCurriculum(curriculum){
	return {
		type: types.ADD_CURRICULUM,
		payload:
			curriculumApi.addCurriculum(curriculum)
			.then((response) => {
				return response.data;
			})
	};
}

export function departmentList(curriculum){
	return {
		type: types.DEPARTMENT_LIST,
		payload:
			curriculumApi.departmentList(curriculum)
			.then((response) => {
				return response.data;
			})
	};
}

export function deleteCurriculum(curriculum){
	return {
		type: types.DELETE_CURRICULUM,
		payload:
			curriculumApi.deleteCurriculum(curriculum)
			.then((response) => {
				return response.data;
			})
	};
}

export function editCurriculum(curriculum){
	return {
		type: types.EDIT_CURRICULUM,
		payload:
			curriculumApi.editCurriculum(curriculum)
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
