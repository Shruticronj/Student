import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import TeacherList  from './../../components/teacher/TeacherList.jsx';
import AddTeacher from './../../components/teacher/AddTeacher.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getTeacherList,addTeacher,deleteTeacher,editTeacher,hideSlackBar, updateSlackBarMsg, handleTabChange, pageChange} from "./../../actions/teacherActions.jsx";
import {connect} from "react-redux";


class Teacher extends React.Component{

    constructor(props){
      super(props);
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) }
    }

    componentWillMount() {
      let data= {courseId: 1, academicYearId:1}
      this.props.getTeacherList(data);
      console.log("-------------------->props:",this.props)

    }

    render(){
        return (
          <div >
            <h1>Manage Teacher </h1>
            <Tabs  onChange={this.props.handleTabChange} value={this.props.teacher.selectedTab} >
              <Tab label="View Teacher"  value="list">
                  <TeacherList
                    getTeacherList= {(tecaher) => this.props.getTeacherList(tecaher)}
                    teacherList= {this.props.teacher.pagedTeacher}
                    showSlackBar= {this.props.teacher.showSlackBar}
                    slackBarMsg= {this.props.teacher.queryStatusMessage}
                    hideSlackBar= {() => this.props.hideSlackBar()}
                    editTeacher= {(teacher) => this.props.editTeacher(teacher)}
                    updateSlackBarMsg= {(message) => this.props.updateSlackBarMsg(message)}
                    deleteTeacher= {(teacher) => this.props.deleteTeacher(teacher)}
                    pagination= {this.props.teacher.pagination}
                    pageChange= {(currentPage , size) => this.props.pageChange(currentPage , size)}
                  />
              </Tab>
              
              <Tab label="Add Teacher"value="add" >
                <AddTeacher 
                  addTeacher= {(teacher) => this.props.addTeacher(teacher)}
                  showSlackBar= {this.props.teacher.showSlackBar}
                />
              </Tab>
            </Tabs>
          </div>
        );
    }
}

Teacher.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
Teacher.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps= (state) => {
  console.log("--------------------->",state)
  return{
    login: state.login,
    teacher: state.teacherReducer
  };
};


const mapDispatchToProps= (dispatch) => {
  return{
    getTeacherList: (teacher) =>{
      dispatch(getTeacherList(teacher));
    },
    addTeacher: (teacher) =>{
      dispatch(addTeacher(teacher));
    },
    deleteTeacher: (teacher) =>{
      dispatch(deleteTeacher(teacher));
    },
    editTeacher: (teacher) =>{
      dispatch(editTeacher(teacher));
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

export default connect(mapStateToProps,mapDispatchToProps)(Teacher);