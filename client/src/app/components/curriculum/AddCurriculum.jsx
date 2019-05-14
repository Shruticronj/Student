import React from "react";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import "babel-polyfill";

import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import curriculumApi from "../../utils/api/curriculum";

//import RefreshIndicator from 'material-ui/RefreshIndicator';
class AddCurriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      semesterId: "",
      acedemicYear: "",
      departmentId: "",
      errorMessage: "",
      departmentList: [],
      semesterList: [],
      invalidName: ""
    };
  }

  //validate curriculum mandatory fields
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
      case "acedemicYear":
        let acedemicYear = event.target.value;
        this.setState({ acedemicYear: acedemicYear });
        acedemicYear = acedemicYear.trim();
        if (isEmpty(acedemicYear)) message = "Acedemic Year is required";
        else if (isLengthInvalid(name, 4, 4))
          message = "Please provide a valid 4 character year!!";
        else message = "";
        this.setState({ invalidYear: message });

        break;
    }
  };

  handleDept = (event, index, value) => {
    this.setState({ departmentId: value });
  };

  handleSem = (event, index, value) => {
    this.setState({ semesterId: value });
  };

  addCurriculum = () => {
    if (
      this.state.name != "" &&
      this.state.departmentId != "" &&
      this.state.semesterId != ""
    ) {
      this.setState({ errorMessage: "" });
      let name = this.state.name.trim();
      let curriculumObj = {
        courseId: 1,
        semesterId: this.state.semesterId,
        academicYearId: 1,
        curriculumName: name,
        departmentId: this.state.departmentId
      };
      this.props.addCurriculum(curriculumObj);
    }
    if (this.state.name == "") {
      this.setState({
        invalidName: "Name is required"
      });
    }
    if (this.state.departmentId == "") {
      this.setState({ invalidDeptId: "Department Id is required" });
    }
    if (this.state.semesterId == "") {
      this.setState({
        invalidSemId: "Semester Id is required"
      });
    }
    if (this.state.acedemicYear == "") {
      this.setState({
        invalidYear: "Acedemic Year is required"
      });
    }
    if (this.state.status == "") {
      this.setState({
        invalidYear: "Status is required"
      });
    }
  };

  async componentDidMount(props) {
    let departmentList = [],
      semesterList = [];
    let response;
    let curriculum = {
      courseId: 1,
      academicYearId: 1,
      semesterId: 1
    };
    let semester = {
      courseId: 1,
      academicYearId: 1
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
    response = await curriculumApi.getSemesterList(semester);
    if (response) {
      for (let i = 0; i < response.data.data.length; i++) {
        semesterList.push(
          <MenuItem
            value={response.data.data[i].id}
            key={i}
            primaryText={response.data.data[i].name}
          />
        );
      }
    }
    this.setState({
      departmentList,
      semesterList
    });
  }

  discardData = () => {
    this.setState({
      name: "",
      status: "",
      invalidName: "",
      semesterId: "",
      departmentId: ""
    });
  };

  render() {
    return (
      <div>
        <div className="contentCenter">
          <h2>Add Curriculum</h2>
          <br />
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Curriculum Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Curriculum Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
            style={{ display: "inline-block" }}
          />
          <TextField
            hintText="Acedemic Year"
            type="number"
            errorText={this.state.invalidYear}
            floatingLabelText="Acedemic Year"
            onChange={e => this.handleTextChange(e, "acedemicYear")}
            value={this.state.acedemicYear}
            style={{ marginLeft: "36px", display: "inline-block" }}
          />
          <br />
          <SelectField
            floatingLabelText="Select Semester"
            errorText={this.state.invalidSemId}
            hintText="Select semester"
            onChange={this.handleSem}
            value={this.state.semesterId}
            style={{ display: "inline-block" }}
          >
            {this.state.semesterList}
          </SelectField>

          <SelectField
            hintText="Select Department"
            errorText={this.state.invalidDeptId}
            floatingLabelText="Select Department"
            onChange={this.handleDept}
            required={true}
            value={this.state.departmentId}
            style={{ marginLeft: "36px", display: "inline-block" }}
          >
            {this.state.departmentList}
          </SelectField>

          <br />
          <SelectField
            floatingLabelText="Status"
            errorText={this.state.invalidStatus}
            onChange={this.handleChange}
            value={this.state.status}
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
            onTouchTap={this.addCurriculum}
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

export default AddCurriculum;
