import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class DeleteSubject extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.showSlackBar){
        this.props.handleTouchTap({identity:"closeShowDelete"} )
      }
    }

    deleteSubject = () => {
      let id= this.props.subject.id;
      let subjectName =  this.props.subject.name;
      this.props.deleteSubject({id,subjectName});
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
        onTouchTap={this.deleteSubject}
      />,
    ];

        return (
          <Dialog
            title={"Are you sure you want to delete " + this.props.subject.name + " ?"} 
            actions={actions}
            modal={false}
            open={true}
            onRequestClose={() => this.props.handleTouchTap({identity:"closeShowDelete"})}
          >
          </Dialog>
        );
    }
}

export default DeleteSubject;
