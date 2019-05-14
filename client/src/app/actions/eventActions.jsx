import eventApi from "./../utils/api/event";
import * as types from "./../constants";

export function getEventList(reqObject) {
  return {
    type: types.EVENT_LIST,
    payload: eventApi.getEventList(reqObject).then(response => {
      return response.data;
    })
  };
}

export function addEvent(curriculum) {
  return {
    type: types.ADD_EVENT,
    payload: eventApi.addEvent(curriculum).then(response => {
      return response.data;
    })
  };
}

export function deleteEvent(event) {
  return {
    type: types.DELETE_EVENT,
    payload: eventApi.deleteEvent(event).then(response => {
      return response.data;
    })
  };
}

export function editEvent(event) {
  return {
    type: types.EDIT_EVENT,
    payload: eventApi.editEvent(event).then(response => {
      return response.data;
    })
  };
}

export function hideSlackBar() {
  return {
    type: types.HIDE_SLACKBAR
  };
}

export function updateSlackBarMsg(message) {
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

export function pageChange(currentPage, size) {
  return {
    type: types.PAGE_CHANGE,
    payload: currentPage
  };
}
