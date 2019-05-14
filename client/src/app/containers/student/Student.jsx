import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import StudentList  from './../../components/student/StudentList.jsx';
import AddStudent from './../../components/student/AddStudent.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getStudentList,addStudent,deleteStudent,editStudent,hideSlackBar, updateSlackBarMsg, handleTabChange, pageChange} from "./../../actions/studentActions.jsx";
import {connect} from "react-redux";


class Student extends React.Component{

    constructor(props){
      super(props);
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) }
    }

    componentWillMount() {
      let data= {courseId: 1, academicYearId:1}
      this.props.getStudentList(data);
      console.log("-------------------->props:",this.props)

    }

    render(){
        return (
          <div >
            <h1>Manage Student </h1>
            <Tabs  onChange={this.props.handleTabChange} value={this.props.student.selectedTab} >
              <Tab label="View Student"  value="list">
                  <StudentList
                    getStudentList= {(student) => this.props.getStudentList(student)}
                    studentList= {this.props.student.pagedStudent}
                    showSlackBar= {this.props.student.showSlackBar}
                    slackBarMsg= {this.props.student.queryStatusMessage}
                    hideSlackBar= {() => this.props.hideSlackBar()}
                    editStudent= {(student) => this.props.editStudent(student)}
                    updateSlackBarMsg= {(message) => this.props.updateSlackBarMsg(message)}
                    deleteStudent= {(student) => this.props.deleteStudent(student)}
                    pagination= {this.props.student.pagination}
                    pageChange= {(currentPage , size) => this.props.pageChange(currentPage , size)}
                  />
              </Tab>
              
              <Tab label="Add Student"value="add" >
                <AddStudent 
                  addStudent= {(student) => this.props.addStudent(student)}
                  showSlackBar= {this.props.student.showSlackBar}
                />
              </Tab>
            </Tabs>
          </div>
        );
    }
}

Student.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
Student.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps= (state) => {
  console.log("--------------------->",state)
  return{
    login: state.login,
    student: state.studentReducer
  };
};


const mapDispatchToProps= (dispatch) => {
  return{
    getStudentList: (student) =>{
      dispatch(getStudentList(student));
    },
    addStudent: (student) =>{
      dispatch(addStudent(student));
    },
    deleteStudent: (student) =>{
      dispatch(deleteStudent(student));
    },
    editStudent: (student) =>{
      dispatch(editStudent(student));
    },
    hideSlackBar: () =>{
      dispatch(hideSlackBar());
    },
    updateSlackBarMsg: (message) =>{
      dispatch(updateSlackBarMsg(message));
    },
    handleTabChange: (value) =>{
      dispatch(handleTabChange(value));
    },
    pageChange: (currentPage , size) =>{
      dispatch(pageChange(currentPage , size));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Student);