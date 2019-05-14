import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from "axios";


class DeleteCurriculum extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.showSlackBar){
        this.props.handleTouchTap({identity:"closeShowDelete"} )
      }
    }

    deleteCurriculum = () => {
      let id= this.props.curriculum.id;
      let curriculumName =  this.props.curriculum.name;
      let courseId = 1
      this.props.deleteCurriculum({id,curriculumName,courseId});
    }


    render(){
       const actions = [
      <FlatButton
        label="NO"
        primary={true}
        onTouchTap={() => this.props.handleTouchTap({identity:"closeShowDelete"} )}
      />,
      <FlatButton
        label="YES"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deleteCurriculum}
      />,
    ];

        return (
          <Dialog
            title={"Are you sure you want to delete " + this.props.curriculum.name + " ?"} 
            actions={actions}
            modal={false}
            open={true}
            onRequestClose={() => this.props.handleTouchTap({identity:"closeShowDelete"})}
          >
          </Dialog>
        );
    }
}

export default DeleteCurriculum;
