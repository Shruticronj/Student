import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class DeleteStudent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showSlackBar) {
      this.props.handleTouchTap({ identity: "closeShowDelete" });
    }
  }

  deleteStudent = () => {
    let id = this.props.student.id;
    let student_name = this.props.student.student_name;
    this.props.deleteStudent({ id, student_name });
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
        onTouchTap={this.deleteStudent}
      />
    ];

    return (
      <Dialog
        title={
          "Are you sure you want to delete " +
          this.props.student.student_name +
          " ?"
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

export default DeleteStudent;
