import React from "react";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";

//import RefreshIndicator from 'material-ui/RefreshIndicator';

class AddDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shortName: "",
      noOfStudents: "",
      status: "",
      invalidName: "",
      invalidShortName: "",
      invalidNoOfStudents: "",
      errorMessage: "",
      invalidStatus: ""
    };
  }

  //validate department short and full name
  handleTextChange = (event, item) => {
    let message = "";
    switch (item) {
      case "name":
        let name = event.target.value;
        this.setState({ name: name });
        name = name.trim();
        if (isEmpty(name)) message = "Name is required";
        else if (isLengthInvalid(name, 5, 75))
          message = "Length should be greater than 5 characters";
        else message = "";
        this.setState({ invalidName: message });
        break;

      case "shortName":
        let shortName = event.target.value;
        this.setState({ shortName: shortName });
        shortName = shortName.trim();
        if (isEmpty(shortName)) message = "Short Name is required";
        else if (isLengthInvalid(shortName, 2, 5))
          message = "Length should be between 2 to 5 characters";
        else message = "";
        this.setState({ invalidShortName: message });
        break;

      case "noOfStudents":
        let noOfStudents = event.target.value;
        this.setState({ noOfStudents: noOfStudents });
        noOfStudents = noOfStudents.trim();
        if (isEmpty(noOfStudents)) message = "No of Student is required";
        else message = "";
        this.setState({ invalidNoOfStudents: message });
        break;
    }
  };

  handleChange = (event, index, value) => {
    this.setState({ status: value });
  };

  addDepartment = () => {
    if (
      this.state.name != "" &&
      this.state.shortName != "" &&
      this.state.status != "" &&
      this.state.noOfStudents != ""
    ) {
      this.setState({ errorMessage: "" });
      let name = this.state.name.trim();
      let shortName = this.state.shortName.trim();
      let departmentObj = {
        name: name,
        abbreviated_name: shortName,
        course_id: 1,
        status: this.state.status,
        total_no_of_students: this.state.noOfStudents
      };
      this.props.addDepartment(departmentObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested",
        invalidName: "Name is required",
        invalidShortName: "Short Name is required",
        invalidNoOfStudents: "No of Student is required",
        invalidStatus: "Status is required"
      });
    }
  };
  discardData = () => {
    this.setState({
      name: "",
      shortName: "",
      noOfStudents: "",
      status: ""
    });
  };

  render() {
    {
      // const loaderStyle = {
      //   container: {
      //     position: 'relative',
      //   },
      //   refresh: {
      //     display: 'inline-block',
      //     position: 'relative',
      //   },
      // };
    }

    return (
      <div>
        <div className="contentCenter">
          <h2>Add Department</h2>
          <br />
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Department Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
          />
          <TextField
            hintText="Department Short Name"
            errorText={this.state.invalidShortName}
            floatingLabelText="Short Name"
            onChange={e => this.handleTextChange(e, "shortName")}
            value={this.state.shortName}
            style={{ marginLeft: "36px" }}
          />
          <br />
          <TextField
            hintText="Number of Students"
            errorText={this.state.invalidNoOfStudents}
            floatingLabelText="Number Of Students"
            onChange={e => this.handleTextChange(e, "noOfStudents")}
            value={this.state.noOfStudents}
            type="number"
          />
          <SelectField
            floatingLabelText="Status"
            errorText={this.state.invalidStatus}
            onChange={this.handleChange}
            value={this.state.status}
            style={{ marginLeft: "36px", height: "86px" }}
            floatingLabelStyle={{ height: "86px" }}
          >
            <MenuItem value={true} primaryText="Active" />
            <MenuItem value={false} primaryText="Not Active" />
          </SelectField>
          <br />
          <br />
          <br />
          <RaisedButton
            label="ADD"
            primary={true}
            onTouchTap={this.addDepartment}
          />
          <RaisedButton
            label="DISCARD"
            primary={true}
            style={{ marginLeft: "36px" }}
            onTouchTap={this.discardData}
          />
          {
            //<RefreshIndicator
            //   size={40}
            //   left={10}
            //   top={0}
            //   status="loading"
            //   style={loaderStyle.refresh}
            // />
          }
          <br />
          <br />
          <Divider />
        </div>
        <p>@2017 Rookies cronj.com|version 1.0</p>
      </div>
    );
  }
}

export default AddDepartment;
