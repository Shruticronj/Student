import * as types from "./../constants";

const initialState = {
  studentList: [],
  queryStatusMessage: "",
  showSlackBar: false,
  selectedTab: "list",
  pagination: {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
  },
  pagedStudent: []
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STUDENT_LIST + "_FULFILLED":
      var response = action.payload;
      if (response) {
        let studentList = response.data;
        let totalCount = studentList.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = state.pagination.currentPage;
        let pagedStudent = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedStudent.push(studentList[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: currentPage
        };
        state = {
          ...state,
          studentList,
          pagedStudent,
          pagination
        };
      }
      break;

    case types.PAGE_CHANGE:
      let studentList = state.studentList;
      let totalCount = studentList.length;
      let pageSize = state.pagination.pageSize;
      let currentPage = action.payload;
      let pagedStudent = [];
      let index = (currentPage - 1) * pageSize;
      for (let i = 0; i < 10 && index < totalCount; i++) {
        pagedStudent.push(studentList[index]);
        index++;
      }
      let pagination = {
        pageSize: pageSize,
        totalPages: totalCount,
        currentPage: currentPage
      };

      state = {
        ...state,
        pagedStudent,
        pagination
      };
      break;

    case types.EDIT_STUDENT + "_FULFILLED":
      var response = action.payload.data[0];
      if (action.payload.status == 1) {
        let selctedStudent = response;
        let allStudent = state.studentList;
        let pagination = state.pagination;
        let pageSize = pagination.pageSize;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pagedStudent = state.pagedStudent;
        for (let i in allStudent) {
          if (allStudent[i].id == selctedStudent.id) {
            allStudent[i].student_name = selctedStudent.name;
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedStudent) {
        //     if (pagedStudent[j].id == selectedStudent.id) {
        //       pagedStudent[j].student_name = selectedStudent.name;
        //       break;
        //     }
        //   }
        // }

        state = {
          ...state,
          studentList: allStudent,
          showSlackBar: true,
          queryStatusMessage: "Student changes succesfully updated!",
          pagedStudent
        };
      }
      break;

    case types.EDIT_STUDENT + "_PENDING":
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

    case types.DELETE_STUDENT + "_FULFILLED":
      var response = action.payload.data[0];
      let allStudent = [];
      if (action.payload.status == 1) {
        let selectedStudent = response;
        allStudent = state.studentList;
        let pagination = state.pagination;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pageSize = pagination.pageSize;
        let pagedStudent = state.pagedStudent;
        for (let i in allStudent) {
          if (allStudent[i].id == selectedStudent.id) {
            allStudent.splice(i, 1);
            index = i;
            break;
          }
        }
        // if (index >= startIndex && index <= endIndex) {
        //   for (let j in pagedStudent) {
        //     if (pagedStudent[j].id == selectedStudent.id) {
        //       pagedStudent.splice(j, 1);
        //       break;
        //     }
        //   }
        // }

        pagination.totalPages = pagination.totalPages - 1;
        pagination.currentPage = 1;

        state = {
          ...state,
          studentList: allStudent,
          showSlackBar: true,
          queryStatusMessage: "Student deleted succesfully!",
          pagination,
          pagedStudent
        };
      }
      break;

    case types.ADD_STUDENT + "_FULFILLED":
      var response = action.payload.data[0];
      if (response.status == 1) {
        let addedStudent = response.student;
        let allStudent = state.studentList;
        addedStudent.total_no_of_students = 0;
        allStudent.push(addedStudent);
        let totalCount = allStudent.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = 1;
        let pagedStudent = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedStudent.push(allStudent[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: 1
        };
        state = {
          ...state,
          studentList: allStudent,
          showSlackBar: true,
          queryStatusMessage: "Student Added succesfully!",
          selectedTab: "list",
          pagedStudent,
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

export default studentReducer;
