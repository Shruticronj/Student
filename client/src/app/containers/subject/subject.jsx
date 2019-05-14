import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SubjectList  from '../../components/subjects/subjectList.jsx';
import AddSubject from '../../components/subjects/AddSubject.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getSubjectList,addSubject,deleteSubject,editSubject,hideSlackBar, updateSlackBarMsg, handleTabChange, pageChange} from "./../../actions/subjectActions.jsx";
import {connect} from "react-redux";


class Subject extends React.Component{

    constructor(props){
      super(props);
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) }
    }

    componentWillMount() {
      let data= {courseId: 1, academicYearId:1}
      this.props.getSubjectList(data);
      console.log("-------------------->props:",this.props)

    }

    render(){
        return (
          <div >
            <h1>Manage Subject </h1>
            <Tabs  onChange={this.props.handleTabChange} value={this.props.subject.selectedTab} >
              <Tab label="View Subject"  value="list">
                  <SubjectList
                    getSubjectList= {(subject) => this.props.getSubjectList(subject)}
                    subjectList= {this.props.subject.pagedSubject}
                    showSlackBar= {this.props.subject.showSlackBar}
                    slackBarMsg= {this.props.subject.queryStatusMessage}
                    hideSlackBar= {() => this.props.hideSlackBar()}
                    editSubject= {(subject) => this.props.editSubject(subject)}
                    updateSlackBarMsg= {(message) => this.props.updateSlackBarMsg(message)}
                    deleteSubject= {(subject) => this.props.deleteSubject(subject)}
                    pagination= {this.props.subject.pagination}
                    pageChange= {(currentPage , size) => this.props.pageChange(currentPage , size)}
                  />
              </Tab>
              
              <Tab label="Add Subject"value="add" >
                <AddSubject 
                  addSubject= {(subject) => this.props.addSubject(subject)}
                  showSlackBar= {this.props.subject.showSlackBar}
                />
              </Tab>
            </Tabs>
          </div>
        );
    }
}

Subject.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
Subject.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps= (state) => {
  console.log("--------------------->",state)
  return{
    login: state.login,
    subject: state.subjectReducer
  };
};


const mapDispatchToProps= (dispatch) => {
  return{
    getSubjectList: (subject) =>{
      dispatch(getSubjectList(subject));
    },
    addSubject: (subject) =>{
      dispatch(addSubject(subject));
    },
    deleteSubject: (subject) =>{
      dispatch(deleteSubject(subject));
    },
    editSubject: (subject) =>{
      dispatch(editSubject(subject));
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

export default connect(mapStateToProps,mapDispatchToProps)(Subject);