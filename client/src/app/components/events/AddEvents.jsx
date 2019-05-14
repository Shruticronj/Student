import React from "react";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";

import "babel-polyfill";

import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";

//import RefreshIndicator from 'material-ui/RefreshIndicator';
class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      eventDescription: "",
      startDate: null,
      endDate: null,
      venue: "",
      status: "",
      invalidEventName: "",
      invalidDescription: "",
      invalidVenue: "",
      invalidStartDate: "",
      invalidEndDate: "",
      errorMessage: ""
    };
  }

  handleTextChange = (event, item) => {
    let message = "";
    switch (item) {
      case "name":
        let name = event.target.value;
        this.setState({ name: name });
        name = name.trim();
        if (isEmpty(name)) message = "Event Name is required";
        else if (isLengthInvalid(name, 5, 75))
          message = "Length should be greater than 5 characters";
        else message = "";
        this.setState({ invalidEventName: message });
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

  addEvent = () => {
    if (this.state.name != "") {
      this.setState({ errorMessage: "" });
      let eventName = this.state.name.trim();
      let eventObj = {
        eventName,
        eventDescription: this.state.eventDescription,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        venue: this.state.venue
      };
      this.props.addEvent(eventObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested",
        invalidEventName: "Event Name is required",
        invalidDescription: "Event Description is required",
        invalidVenue: "Event Venue is required",
        invalidStartDate: "Eevnt Start Date is required",
        invalidEndDate: "Event End Date is required"
      });
    }
  };

  handleChange = (event, index, value) => {
    this.setState({ status: value });
  };
  discardData = () => {
    this.setState({
      name: "",
      eventDescription: "",
      startDate: null,
      endDate: null,
      venue: "",
      status: ""
    });
  };

  render() {
    return (
      <div>
        <div className="contentCenter">
          <h2>Add Events</h2>
          <br />
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Event Name"
            errorText={this.state.invalidEventName}
            floatingLabelText="Event Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
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
          <br />
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
          <br />
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
          <br />
          <br />
          <RaisedButton label="ADD" primary={true} onTouchTap={this.addEvent} />
          <RaisedButton
            label="DISCARD"
            primary={true}
            style={{ marginLeft: "36px" }}
            onTouchTap={this.discardData}
          />
          <br />
          <br />
          <Divider />
        </div>
        <p>@2017 Rookies cronj.com|version 1.0</p>
      </div>
    );
  }
}

export default AddEvent;
