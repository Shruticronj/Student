import React from "react";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import "babel-polyfill";

import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import teacherApi from "../../utils/api/teacher";

//import RefreshIndicator from 'material-ui/RefreshIndicator';
class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      errorMessage: "",
      contact_no: "",
      email_id: "",
      gender: "",
      username: "",
      designation: "",
      experience: "",
      qualification: "",
      desigList: [],
      invalidName: "",
      invalidUsername: "",
      invalidContactNo: "",
      invalidEmailId: ""
    };
  }

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
      case "username":
        let username = event.target.value;
        this.setState({
          username
        });
        if (isEmpty(username)) message = "username is required";
        else if (isLengthInvalid(username, 5, 5))
          message = "Length should be 5 characters";
        else message = "";
        this.setState({
          invalidUsername: message
        });
        break;
      case "contact_no":
        let contact_no = event.target.value;
        this.setState({
          contact_no
        });
        if (isEmpty(contact_no)) message = "Contact Number is required";
        else if (isLengthInvalid(contact_no, 10, 10))
          message = "Length should be 5 characters";
        else message = "";
        this.setState({
          invalidContactNo: message
        });
        break;
      case "email_id":
        let email_id = event.target.value;
        this.setState({
          email_id
        });
        if (isEmpty(email_id)) message = "Email Id Number is required";
        else message = "";
        this.setState({
          invalidEmailId: message
        });
        break;
    }
  };
  handleChange = (event, index, value) => {
    this.setState({
      gender: value
    });
  };
  handleExperience = (event, index, value) => {
    this.setState({
      experience: value
    });
  };
  addTeacher = () => {
    if (this.state.name != "") {
      this.setState({ errorMessage: "" });
      let name = this.state.name.trim();
      let teacherObj = {
        teacher_name: name,
        username: this.state.username,
        designation: this.state.designation,
        contact_no: this.state.contact_no,
        gender: this.state.gender,
        email_id: this.state.email_id,
        department_id: 2,
        parent_id: 3,
        batch_id: 2
      };
      this.props.addTeacher(teacherObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested",
        invalidName: "Name is required",
        invalidUsername: "Username is required",
        invalidContactNo: "Contact is required",
        invalidEmailId: "Email Id is required"
      });
    }
  };
  discardData = () => {
    this.setState({
      name: "",
      status: "",
      errorMessage: "",
      contact_no: "",
      email_id: "",
      gender: "",
      username: "",
      designation: ""
    });
  };

  componentDidMount = () => {
    let desigList = [];
    let designationList = [
      "Professor",
      "Assistant Professor",
      "Associate Professor",
      "Junior Professor",
      "Lab Assistant"
    ];
    for (let i = 0; i < designationList.length; i++) {
      desigList.push(
        <MenuItem
          value={designationList[i]}
          key={i}
          primaryText={designationList[i]}
        />
      );
    }
    this.setState({
      desigList
    });
  };

  handleDesignation = (event, index, value) => {
    this.setState({
      designation: value
    });
  };

  render() {
    return (
      <div>
        <div className="contentCenter">
          <h2>Add Teacher</h2>
          <br />
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Teacher Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Teacher Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
            style={{ display: "inline-block" }}
          />
          <TextField
            hintText="Username"
            errorText={this.state.invalidUsername}
            floatingLabelText="Username"
            onChange={e => this.handleTextChange(e, "username")}
            value={this.state.username}
            style={{ marginLeft: "36px", display: "inline-block" }}
          />
          <br />
          <br />
          <br />
          <TextField
            type="number"
            hintText="Contact Number"
            errorText={this.state.invalidContactNo}
            floatingLabelText="Contact Number"
            onChange={e => this.handleTextChange(e, "contact_no")}
            value={this.state.contact_no}
            style={{ display: "inline-block" }}
          />
          <TextField
            hintText="Email Id"
            errorText={this.state.invalidEmailId}
            floatingLabelText="Email Id"
            onChange={e => this.handleTextChange(e, "email_id")}
            value={this.state.email_id}
            style={{ marginLeft: "36px", display: "inline-block" }}
          />
          <br />
          <br />
          <SelectField
            hintText="Designation"
            floatingLabelText="Designation"
            onChange={this.handleDesignation}
            required={true}
            value={this.state.designation}
            style={{ display: "inline-block" }}
          >
            {this.state.desigList}
          </SelectField>
          <SelectField
            floatingLabelText="Gender"
            onChange={this.handleChange}
            value={this.state.gender}
            style={{ marginLeft: "36px", display: "inline-block" }}
          >
            <MenuItem value={"FEMALE"} primaryText="Female" />
            <MenuItem value={"MALE"} primaryText="Male" />
          </SelectField>
          <br />
          <br />
          <br />
          <SelectField
            floatingLabelText="Experience"
            onChange={this.handleExperience}
            value={this.state.experience}
            style={{ marginLeft: "36px", display: "inline-block" }}
          >
            <MenuItem value={"EXPERIENCED"} primaryText="Experienced" />
            <MenuItem value={"FRESHER"} primaryText="Fresher" />
          </SelectField>
          {this && this.state && this.state.experience == "EXPERIENCED" ? (
            <SelectField
              hintText="Years of Experience"
              floatingLabelText="Years of Experience"
              type="number"
              onChange={e => this.handleTextChange(e, "yearsExp")}
              required={true}
              value={this.state.yearsExp}
              style={{ display: "inline-block" }}
            />
          ) : (
            <SelectField
              hintText="Qualification"
              floatingLabelText="Qualification"
              onChange={e => this.handleTextChange(e, "qualification")}
              required={true}
              value={this.state.qualification}
              style={{ display: "inline-block" }}
            />
          )}
          <br />
          <br />
          <br />
          <RaisedButton
            label="ADD"
            primary={true}
            onTouchTap={this.addTeacher}
          />

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

export default AddTeacher;
