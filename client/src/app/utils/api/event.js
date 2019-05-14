import axios from "axios";
import Auth from "./../../Auth.js";
// let serverAddress= 'http://192.168.1.192.168.1.173:3000';
let serverAddress = "http://localhost:3000";

let configHeader = () => {
  let token = Auth.getToken();
  let authString = "bearer " + token;
  let config = {
    headers: {
      Authorization: authString
    }
  };
  return config;
};

const utils = {
  getEventList: data => {
    let url = serverAddress + "/api/event/eventList";
    let config = configHeader();
    return axios.post(url, data, config);
  },

  addEvent: event => {
    let url = serverAddress + "/api/event/addEvent";
    let config = configHeader();
    return axios.post(url, event, config);
  },

  deleteEvent: event => {
    let url = serverAddress + "/api/event/deleteEvent";
    let config = configHeader();
    return axios.put(url, event, config);
  },

  editEvent: event => {
    let url = serverAddress + "/api/event/editEvent";
    let config = configHeader();
    return axios.put(url, event, config);
  }
};

export default utils;
