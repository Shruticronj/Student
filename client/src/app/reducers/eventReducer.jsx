import * as types from "./../constants";

const initialState = {
  eventList: [],
  queryStatusMessage: "",
  showSlackBar: false,
  selectedTab: "list",
  pagination: {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
  },
  pagedEvent: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EVENT_LIST + "_FULFILLED":
      var response = action.payload.data;
      if (action.payload.status == 1) {
        let eventList = response;
        let totalCount = eventList.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = state.pagination.currentPage;
        let pagedEvent = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedEvent.push(eventList[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: currentPage
        };
        state = {
          ...state,
          eventList,
          pagedEvent,
          pagination
        };
      }
      break;

    case types.PAGE_CHANGE:
      let eventList = state.eventList;
      let totalCount = eventList.length;
      let pageSize = state.pagination.pageSize;
      let currentPage = action.payload;
      let pagedEvent = [];
      let index = (currentPage - 1) * pageSize;
      for (let i = 0; i < 10 && index < totalCount; i++) {
        pagedEvent.push(eventList[index]);
        index++;
      }
      let pagination = {
        pageSize: pageSize,
        totalPages: totalCount,
        currentPage: currentPage
      };

      state = {
        ...state,
        pagedEvent,
        pagination
      };
      break;

    case types.EDIT_EVENT + "_FULFILLED":
      var response = action.payload.data[0];
      if (action.payload.status == 1) {
        let selectedEvent = response;
        let allEvents = state.eventList;
        let pagination = state.pagination;
        let pageSize = pagination.pageSize;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pagedEvent = state.pagedEvent;
        for (let i in allEvents) {
          if (allEvents[i].id == selectedEvent.id) {
            allEvents[i].name = selectedEvent.name;
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedEvent) {
        //     if (pagedEvent[j].id == selectedEvent.id) {
        //       pagedEvent[j].name = selectedEvent.name;
        //       pagedEvent[j].abbreviated_name =
        //         selectedEvent.abbreviated_name;
        //       break;
        //     }
        //   }
        // }

        state = {
          ...state,
          eventList: allEvents,
          showSlackBar: true,
          queryStatusMessage: "Event changes succesfully updated!",
          pagedEvent
        };
      }
      break;

    case types.EDIT_EVENT + "_PENDING":
      state = {
        ...state
      };
      break;

    case types.HIDE_SLACKBAR:
      state = {
        ...state,
        showSlackBar: false,
        queryStatusMessage: ""
      };
      break;

    case types.CHANGE_SLACKBAR_MSG:
      state = {
        ...state,
        showSlackBar: true,
        queryStatusMessage: action.payload
      };
      break;

    case types.DELETE_EVENT + "_FULFILLED":
      var response = action.payload.data[0];
      let allEvents = [];
      if (action.payload.status == 1) {
        let selectedEvent = response;
        allEvents = state.eventList;
        let pagination = state.pagination;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pageSize = pagination.pageSize;
        let pagedEvent = state.pagedEvent;
        for (let i in allEvents) {
          if (allEvents[i].id == selectedEvent.id) {
            allEvents.splice(i, 1);
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedEvent) {
        //     if (pagedEvent[j].id == selectedEvent.id) {
        //       pagedEvent.splice(j, 1);
        //       break;
        //     }
        //   }
        // }

        pagination.totalPages = pagination.totalPages - 1;
        pagination.currentPage = 1;

        state = {
          ...state,
          eventList: allEvents,
          showSlackBar: true,
          queryStatusMessage: "Event deleted succesfully!",
          pagination,
          pagedEvent
        };
      }
      break;

    case types.ADD_EVENT + "_FULFILLED":
      var response = action.payload.data[0];
      if (action.payload.status == 1) {
        let addedEvent = response;
        let allEvents = state.eventList;
        addedEvent.total_no_of_event = 0;
        allEvents.push(addedEvent);
        let totalCount = allEvents.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = 1;
        let pagedEvent = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedEvent.push(allEvents[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: 1
        };
        state = {
          ...state,
          eventList: allEvents,
          showSlackBar: true,
          queryStatusMessage: "Event Added succesfully!",
          selectedTab: "list",
          pagedEvent,
          pagination
        };
      }
      break;

    case types.HANDLE_TAB_CHANGE:
      state = {
        ...state,
        selectedTab: action.payload
      };
      break;
  }
  return state;
};

export default eventReducer;
