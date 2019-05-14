import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showSlackBar) {
      this.props.handleTouchTap({ identity: "closeShowDelete" });
    }
  }

  deleteEvent = () => {
    let id = this.props.event.id;
    let eventName = this.props.event.eventName;
    this.props.deleteEvent({ id, eventName });
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
        onTouchTap={this.deleteEvent}
      />
    ];

    return (
      <Dialog
        title={
          "Are you sure you want to delete " + this.props.event.eventName + " ?"
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

export default DeleteEvent;
