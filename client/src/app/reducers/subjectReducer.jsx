import * as types from "./../constants";

const initialState = {
  subjectList: [],
  queryStatusMessage: "",
  showSlackBar: false,
  selectedTab: "list",
  pagination: {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
  },
  pagedSubject: []
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBJECT_LIST + "_FULFILLED":
      var response = action.payload;
      if (response) {
        let subjectList = response.data;
        let totalCount = subjectList.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = state.pagination.currentPage;
        let pagedSubject = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedSubject.push(subjectList[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: currentPage
        };
        state = {
          ...state,
          subjectList,
          pagedSubject,
          pagination
        };
      }
      break;

    case types.PAGE_CHANGE:
      let subjectList = state.subjectList;
      let totalCount = subjectList.length;
      let pageSize = state.pagination.pageSize;
      let currentPage = action.payload;
      let pagedSubject = [];
      let index = (currentPage - 1) * pageSize;
      for (let i = 0; i < 10 && index < totalCount; i++) {
        pagedSubject.push(subjectList[index]);
        index++;
      }
      let pagination = {
        pageSize: pageSize,
        totalPages: totalCount,
        currentPage: currentPage
      };

      state = {
        ...state,
        pagedSubject,
        pagination
      };
      break;

    case types.EDIT_SUBJECT + "_FULFILLED":
      var response = action.payload.data[0];
      if (action.payload.status == 1) {
        let selectedSubject = response;
        let allSubject = state.subjectList;
        let pagination = state.pagination;
        let pageSize = pagination.pageSize;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pagedSubject = state.pagedSubject;
        for (let i in allSubject) {
          if (allSubject[i].id == selectedSubject.id) {
            allSubject[i].name = selectedSubject.name;
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedSubject) {
        //     if (pagedSubject[j].id == selectedSubject.id) {
        //       pagedSubject[j].name = selectedSubject.name;
        //       pagedSubject[j].abbreviated_name =
        //         selectedSubject.abbreviated_name;
        //       break;
        //     }
        //   }
        // }

        state = {
          ...state,
          subjectList: allSubject,
          showSlackBar: true,
          queryStatusMessage: "Subject changes succesfully updated!",
          pagedSubject
        };
      }
      break;

    case types.EDIT_SUBJECT + "_PENDING":
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

    case types.DELETE_SUBJECT + "_FULFILLED":
      var response = action.payload.data[0];
      let allSubject = [];
      if (action.payload.status == 1) {
        let selectedSubject = response;
        allSubject = state.subjectList;
        let pagination = state.pagination;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pageSize = pagination.pageSize;
        let pagedSubject = state.pagedSubject;
        for (let i in allSubject) {
          if (allSubject[i].id == selectedSubject.id) {
            allSubject.splice(i, 1);
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedSubject) {
        //     if (pagedSubject[j].id == selectedSubject.id) {
        //       pagedSubject.splice(j, 1);
        //       break;
        //     }
        //   }
        // }

        pagination.totalPages = pagination.totalPages - 1;
        pagination.currentPage = 1;

        state = {
          ...state,
          subjectList: allSubject,
          showSlackBar: true,
          queryStatusMessage: "Subject deleted succesfully!",
          pagination,
          pagedSubject
        };
      }
      break;

    case types.ADD_SUBJECT + "_FULFILLED":
      var response = action.payload.data[0];
      if (response.status == 1) {
        let addedSubject = response;
        let allSubject = state.subjectList;
        addedSubject.total_no_of_subject = 0;
        allSubject.push(addedSubject);
        let totalCount = allSubject.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = 1;
        let pagedSubject = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedSubject.push(allSubject[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: 1
        };
        state = {
          ...state,
          subjectList: allSubject,
          showSlackBar: true,
          queryStatusMessage: "Subject Added succesfully!",
          selectedTab: "list",
          pagedSubject,
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

export default subjectReducer;
