import * as types from "./../constants";

const initialState = {
  teacherList: [],
  queryStatusMessage: "",
  showSlackBar: false,
  selectedTab: "list",
  pagination: {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
  },
  pagedTeacher: []
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEACHER_LIST + "_FULFILLED":
      var response = action.payload;
      if (response) {
        let teacherList = response.data;
        let totalCount = teacherList.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = state.pagination.currentPage;
        let pagedTeacher = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedTeacher.push(teacherList[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: currentPage
        };
        state = {
          ...state,
          teacherList,
          pagedTeacher,
          pagination
        };
      }
      break;

    case types.PAGE_CHANGE:
      let teacherList = state.teacherList;
      let totalCount = teacherList.length;
      let pageSize = state.pagination.pageSize;
      let currentPage = action.payload;
      let pagedTeacher = [];
      let index = (currentPage - 1) * pageSize;
      for (let i = 0; i < 10 && index < totalCount; i++) {
        pagedTeacher.push(teacherList[index]);
        index++;
      }
      let pagination = {
        pageSize: pageSize,
        totalPages: totalCount,
        currentPage: currentPage
      };

      state = {
        ...state,
        pagedTeacher,
        pagination
      };
      break;

    case types.EDIT_TEACHER + "_FULFILLED":
      var response = action.payload.data[0];
      if (action.payload.status == 1) {
        let selectedTeacher = response;
        let allTeacher = state.teacherList;
        let pagination = state.pagination;
        let pageSize = pagination.pageSize;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pagedTeacher = state.pagedTeacher;
        for (let i in allTeacher) {
          if (allTeacher[i].id == selectedTeacher.id) {
            allTeacher[i].teacher_name = selectedTeacher.name;
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedTeacher) {
        //     if (pagedTeacher[j].id == selectedTeacher.id) {
        //       pagedTeacher[j].name = selectedTeacher.name;
        //       pagedTeacher[j].abbreviated_name =
        //         selectedTeacher.abbreviated_name;
        //       break;
        //     }
        //   }
        // }

        state = {
          ...state,
          teacherList: allTeacher,
          showSlackBar: true,
          queryStatusMessage: "Teacher changes succesfully updated!",
          pagedTeacher
        };
      }
      break;

    case types.EDIT_TEACHER + "_PENDING":
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

    case types.DELETE_TEACHER + "_FULFILLED":
      var response = action.payload.data[0];
      let allTeacher = [];
      if (action.payload.status == 1) {
        let selectedTeacher = response;
        allTeacher = state.teacherList;
        let pagination = state.pagination;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pageSize = pagination.pageSize;
        let pagedTeacher = state.pagedTeacher;
        for (let i in allTeacher) {
          if (allTeacher[i].id == selectedTeacher.id) {
            allTeacher.splice(i, 1);
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedTeacher) {
        //     if (pagedTeacher[j].id == selectedTeacher.id) {
        //       pagedTeacher.splice(j, 1);
        //       break;
        //     }
        //   }
        // }

        pagination.totalPages = pagination.totalPages - 1;
        pagination.currentPage = 1;

        state = {
          ...state,
          teacherList: allTeacher,
          showSlackBar: true,
          queryStatusMessage: "Teacher deleted succesfully!",
          pagination,
          pagedTeacher
        };
      }
      break;

    case types.ADD_TEACHER + "_FULFILLED":
      var response = action.payload.data[0].teacher;
      if (action.payload.status == 1) {
        let addedTeacher = response;
        let allTeacher = state.teacherList;
        addedTeacher.total_no_of_teachers = 0;
        allTeacher.push(addedTeacher);
        let totalCount = allTeacher.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = 1;
        let pagedTeacher = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedTeacher.push(allTeacher[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: 1
        };
        state = {
          ...state,
          teacherList: allTeacher,
          showSlackBar: true,
          queryStatusMessage: "Teacher Added succesfully!",
          selectedTab: "list",
          pagedTeacher,
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

export default teacherReducer;
