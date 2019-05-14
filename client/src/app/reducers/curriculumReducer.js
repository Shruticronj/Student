import * as types from "./../constants";

const initialState = {
  curriculumList: [],
  queryStatusMessage: "",
  showSlackBar: false,
  selectedTab: "list",
  pagination: {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1
  },
  pagedCurriculum: []
};

const curriculumReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CURRICULUM_FOR_COURSE + "_FULFILLED":
      var response = action.payload;
      if (response) {
        let curriculumList = response.data;
        let totalCount = curriculumList.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = state.pagination.currentPage;
        let pagedCurriculum = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedCurriculum.push(curriculumList[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: currentPage
        };
        state = {
          ...state,
          curriculumList,
          pagedCurriculum,
          pagination
        };
      }
      break;

    case types.PAGE_CHANGE:
      let curriculumList = state.curriculumList;
      let totalCount = curriculumList.length;
      let pageSize = state.pagination.pageSize;
      let currentPage = action.payload;
      let pagedCurriculum = [];
      let index = (currentPage - 1) * pageSize;
      for (let i = 0; i < 10 && index < totalCount; i++) {
        pagedCurriculum.push(curriculumList[index]);
        index++;
      }
      let pagination = {
        pageSize: pageSize,
        totalPages: totalCount,
        currentPage: currentPage
      };

      state = {
        ...state,
        pagedCurriculum,
        pagination
      };
      break;

    case types.EDIT_CURRICULUM + "_FULFILLED":
      var response = action.payload.data;
      if (response.status == 1) {
        let selctedCurriculum = response;
        let allCurriculum = state.curriculumList;
        let pagination = state.pagination;
        let pageSize = pagination.pageSize;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pagedCurriculum = state.pagedCurriculum;
        for (let i in allCurriculum) {
          if (allCurriculum[i].id == selctedCurriculum.id) {
            allCurriculum[i].name = selctedCurriculum.name;
            allCurriculum[i].abbreviated_name =
              selctedCurriculum.abbreviated_name;
            index = i;
            break;
          }
        }
        if (index >= startIndex && index <= endIndex) {
          for (let j in pagedCurriculum) {
            if (pagedCurriculum[j].id == selctedCurriculum.id) {
              pagedCurriculum[j].name = selctedCurriculum.name;
              pagedCurriculum[j].abbreviated_name =
                selctedCurriculum.abbreviated_name;
              break;
            }
          }
        }

        state = {
          ...state,
          curriculumList: allCurriculum,
          showSlackBar: true,
          queryStatusMessage: "Curriculum changes succesfully updated!",
          pagedCurriculum
        };
      }
      break;

    case types.EDIT_CURRICULUM + "_PENDING":
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

    case types.DELETE_CURRICULUM + "_FULFILLED":
      var response = action.payload;
      let allCurriculum = [];
      if (response.data.status == 1) {
        let selectedCurriculum = response.data;
        allCurriculum = state.curriculumList;
        let pagination = state.pagination;
        let startIndex = (pagination.currentPage - 1) * pageSize;
        let endIndex = startIndex + 10;
        let index = -1;
        let pageSize = pagination.pageSize;
        let pagedCurriculum = state.pagedCurriculum;
        for (let i in allCurriculum) {
          if (allCurriculum[i].id == selectedCurriculum.id) {
            allCurriculum.splice(i, 1);
            index = i;
            break;
          }
        }
        if (index >= startIndex && index <= endIndex) {
          for (let j in pagedCurriculum) {
            if (pagedCurriculum[j].id == selctedCurriculum.id) {
              pagedCurriculum.splice(j, 1);
              break;
            }
          }
        }

        pagination.totalPages = pagination.totalPages - 1;
        pagination.currentPage = 1;

        state = {
          ...state,
          curriculumList: allCurriculum,
          showSlackBar: true,
          queryStatusMessage: "Curriculum deleted succesfully!",
          pagination,
          pagedCurriculum
        };
      }
      break;

    case types.ADD_CURRICULUM + "_FULFILLED":
      var response = action.payload.data[0];
      if (response.status == 1) {
        let addedCurriculum = response;
        let allCurriculum = state.curriculumList;
        addedCurriculum.total_no_of_students = 0;
        allCurriculum.push(addedCurriculum);
        let totalCount = allCurriculum.length;
        let pageSize = state.pagination.pageSize;
        let currentPage = 1;
        let pagedCurriculum = [];
        let index = (currentPage - 1) * pageSize;
        for (let i = 0; i < 10 && index < totalCount; i++) {
          pagedCurriculum.push(allCurriculum[index]);
          index++;
        }
        let pagination = {
          pageSize: pageSize,
          totalPages: totalCount,
          currentPage: 1
        };
        state = {
          ...state,
          curriculumList: allCurriculum,
          showSlackBar: true,
          queryStatusMessage: "Curriculum Added succesfully!",
          selectedTab: "list",
          pagedCurriculum,
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

export default curriculumReducer;
