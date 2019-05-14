import React from "react";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import "babel-polyfill";

import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";

import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import subjectApi from "../../utils/api/subject";
import curriculumApi from "../../utils/api/curriculum";

//import RefreshIndicator from 'material-ui/RefreshIndicator';
class AddSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      departmentList: [],
      departmentId: "",
      invalidName: "",
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
        if (isEmpty(name)) message = "Name is required";
        else if (isLengthInvalid(name, 5, 75))
          message = "Length should be greater than 5 characters";
        else message = "";
        this.setState({ invalidName: message });
        break;
    }
  };

  addSubject = () => {
    if (this.state.name != "") {
      this.setState({ errorMessage: "" });
      let name = this.state.name.trim();
      let subjectObj = {
        subject_name: name,
        status: true,
        department_id: 2,
        skill_id: 1
      };
      this.props.addSubject(subjectObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested",
        invalidName: "Name is required"
      });
    }
  };

  async componentDidMount(props) {
    let departmentList = [];
    let response;
    let curriculum = {
      courseId: 1,
      academicYearId: 1,
      semesterId: 1
    };

    response = await curriculumApi.getDepartmentList(curriculum);
    if (response) {
      for (let i = 0; i < response.data.data.length; i++) {
        departmentList.push(
          <MenuItem
            value={response.data.data[i].department_id}
            key={i}
            primaryText={response.data.data[i].department_name}
          />
        );
      }
    }
  }

  handleChange = (event, index, value) => {
    this.setState({ status: value });
  };

  discardData = () => {
    this.setState({
      name: "",
      status: ""
    });
  };

  render() {
    return (
      <div>
        <div className="contentCenter">
          <h2>Add Subject</h2>
          <br />
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Subject Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Subject Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
            style={{ display: "inline-block" }}
          />
          <TextField
            hintText="Skill Set"
            errorText={this.state.invalidName}
            floatingLabelText="Skill Set"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
            style={{ marginLeft: "36px", display: "inline-block" }}
          />
          <br />
          <SelectField
            hintText="Select Department"
            errorText={this.state.invalidDeptId}
            floatingLabelText="Select Department"
            onChange={this.handleDept}
            required={true}
            value={this.state.departmentId}
            style={{ display: "inline-block" }}
          >
            {this.state.departmentList}
          </SelectField>
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
          <RaisedButton
            label="ADD"
            primary={true}
            onTouchTap={this.addSubject}
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

export default AddSubject;
