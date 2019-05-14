import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import CurriculumList  from './../../components/curriculum/CurriculumList.jsx';
import AddCurriculum from './../../components/curriculum/AddCurriculum.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getCurriculumList,addCurriculum,deleteCurriculum,editCurriculum,hideSlackBar, updateSlackBarMsg, handleTabChange, pageChange} from "./../../actions/curriculumActions";
import {connect} from "react-redux";


class Curriculum extends React.Component{

    constructor(props){
      super(props);
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) }
    }

    componentWillMount() {
      let data= {courseId: 1, academicYearId:1}
      this.props.getCurriculumList(data);
      console.log("-------------------->props:",this.props)

    }

    render(){
        return (
          <div >
            <h1>Manage Curriculum </h1>
            <Tabs  onChange={this.props.handleTabChange} value={this.props.curriculum.selectedTab} >
              <Tab label="View Curriculums"  value="list">
                  <CurriculumList
                    getCurriculumList= {(course) => this.props.getCurriculumList(course)}
                    curriculumList= {this.props.curriculum.pagedCurriculum}
                    showSlackBar= {this.props.curriculum.showSlackBar}
                    slackBarMsg= {this.props.curriculum.queryStatusMessage}
                    hideSlackBar= {() => this.props.hideSlackBar()}
                    editCurriculum= {(department) => this.props.editCurriculum(department)}
                    updateSlackBarMsg= {(message) => this.props.updateSlackBarMsg(message)}
                    deleteCurriculum= {(curriculum) => this.props.deleteCurriculum(curriculum)}
                    pagination= {this.props.curriculum.pagination}
                    pageChange= {(currentPage , size) => this.props.pageChange(currentPage , size)}
                  />
              </Tab>
              
              <Tab label="Add Curriculum"value="add" >
                <AddCurriculum 
                  addCurriculum= {(curriculum) => this.props.addCurriculum(curriculum)}
                  showSlackBar= {this.props.curriculum.showSlackBar}
                />
              </Tab>
            </Tabs>
          </div>
        );
    }
}

Curriculum.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
Curriculum.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps= (state) => {
  console.log("--------------------->",state)
  return{
    login: state.login,
    curriculum: state.curriculumReducer
  };
};


const mapDispatchToProps= (dispatch) => {
  return{
    getCurriculumList: (course) =>{
      dispatch(getCurriculumList(course));
    },
    addCurriculum: (curriculum) =>{
      dispatch(addCurriculum(curriculum));
    },
    deleteCurriculum: (curriculum) =>{
      dispatch(deleteCurriculum(curriculum));
    },
    editCurriculum: (curriculum) =>{
      dispatch(editCurriculum(curriculum));
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

export default connect(mapStateToProps,mapDispatchToProps)(Curriculum);