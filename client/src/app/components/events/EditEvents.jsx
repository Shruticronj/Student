import React from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import DatePicker from "material-ui/DatePicker";

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDescription: "",
      startDate: null,
      endDate: null,
      venue: "",
      status: "",
      invalidName: "",
      nameText: "",
      errorMessage: "",
      invalidDescription: "",
      invalidVenue: "",
      invalidStartDate: "",
      invalidEndDate: ""
    };
  }

  componentDidMount() {
    let event = this.props.event;
    this.setState({
      nameText: event.eventName,
      eventDescription: event.eventDescription,
      startDate: event.start_time ? new Date(event.start_time) : null,
      endDate: event.end_date ? new Date(event.end_date) : null,
      venue: event.venue,
      status: event.status
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showSlackBar) {
      this.props.handleTouchTap({ identity: "closeShowEdit" });
    }
  }

  handleTextChange = (event, item) => {
    let message = "";
    switch (item) {
      case "name":
        let name = event.target.value;
        this.setState({ nameText: name });
        name = name.trim();
        if (isEmpty(name)) {
          message = "Event Name is required";
        } else if (isLengthInvalid(name, 5, 75)) {
          message = "Length should be greater than 5 characters";
        } else {
          message = "";
        }
        this.setState({ invalidName: message });
        break;
      case "description":
        let eventDescription = event.target.value;
        this.setState({ eventDescription: eventDescription });
        eventDescription = eventDescription.trim();
        if (isEmpty(eventDescription))
          message = "Event Description is required";
        else message = "";
        this.setState({ invalidDescription: message });
        break;
      case "venue":
        let venue = event.target.value;
        this.setState({ venue: venue });
        venue = venue.trim();
        if (isEmpty(venue)) message = "Event venue is required";
        else message = "";
        this.setState({ invalidVenue: message });
        break;
    }
  };

  handleChange = (event, index, value) => {
    this.setState({ status: value });
  };

  handleStartDate = (event, date) => {
    let message = "";
    this.setState({
      startDate: date
    });
    if (date === null) message = "Event Start Date is required";
    else message = "";
    this.setState({ invalidStartDate: message });
  };

  handleEndDate = (event, date) => {
    let message = "";
    this.setState({
      endDate: date
    });
    if (date === null) message = "Event End Date is required";
    else message = "";
    this.setState({ invalidEndDate: message });
  };

  handleSave = () => {
    if (this.state.invalidName == "") {
      this.setState({ errorMessage: "" });
      let eventName = this.state.nameText.trim();
      let eventObj = {
        id: this.props.event.id,
        eventName: eventName,
        eventDescription: this.state.eventDescription,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        venue: this.state.venue
      };
      this.props.editEvent(eventObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested: "
      });
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={() =>
          this.props.handleTouchTap({ identity: "closeShowEdit" })
        }
      />,
      <FlatButton
        label="SAVE"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />
    ];

    return (
      <Dialog
        title="Edit Event"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={() =>
          this.props.handleTouchTap({ identity: "closeShowEdit" })
        }
      >
        <div>
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Event Name"
            errorText={this.state.invalidName}
            floatingLabelText="Event Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.nameText}
          />

          <TextField
            hintText="Event Description"
            errorText={this.state.invalidDescription}
            floatingLabelText="Event Description"
            style={{ display: "inline-block", marginLeft: "36px" }}
            onChange={e => this.handleTextChange(e, "description")}
            value={this.state.eventDescription}
          />
          <br />
          <DatePicker
            hintText="Event Start Date"
            errorText={this.state.invalidStartDate}
            floatingLabelText="Event Start Date"
            onChange={this.handleStartDate}
            value={this.state.startDate}
            style={{ display: "inline-block" }}
          />

          <DatePicker
            hintText="Event End Date"
            errorText={this.state.invalidEndDate}
            style={{ display: "inline-block", marginLeft: "36px" }}
            floatingLabelText="Event End Date"
            onChange={this.handleEndDate}
            value={this.state.endDate}
          />
          <br />
          <TextField
            hintText="Event Venue"
            errorText={this.state.invalidVenue}
            style={{ display: "inline-block" }}
            floatingLabelText="Event Venue"
            onChange={e => this.handleTextChange(e, "venue")}
            value={this.state.venue}
          />

          <SelectField
            floatingLabelText="Status"
            errorText={this.state.invalidStatus}
            onChange={this.handleChange}
            value={this.state.status}
            style={{ marginLeft: "36px", display: "inline-block" }}
          >
            <MenuItem value={true} primaryText="Active" />
            <MenuItem value={false} primaryText="Not Active" />
          </SelectField>
          <br />
        </div>
      </Dialog>
    );
  }
}

export default EditEvent;
