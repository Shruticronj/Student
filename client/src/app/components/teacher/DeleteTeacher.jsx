import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class DeleteTeacher extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showSlackBar) {
      this.props.handleTouchTap({ identity: "closeShowDelete" });
    }
  }

  deleteTeacher = () => {
    let id = this.props.teacher.id;
    let teacher_name = this.props.teacher.teacher_name;
    this.props.deleteTeacher({ id, teacher_name });
  };

  render() {
    const actions = [
      <FlatButton
        label="NO"
        primary={true}
        onTouchTap={() =>
          this.props.handleTouchTap({ identity: "closeShowDelete" })
        }
      />,
      <FlatButton
        label="YES"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deleteTeacher}
      />
    ];

    return (
      <Dialog
        title={
          "Are you sure you want to delete " + this.props.teacher.teacher_name + " ?"
        }
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={() =>
          this.props.handleTouchTap({ identity: "closeShowDelete" })
        }
      />
    );
  }
}

export default DeleteTeacher;
