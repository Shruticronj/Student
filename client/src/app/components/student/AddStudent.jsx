import React from "react";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import "babel-polyfill";

import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import curriculumApi from "../../utils/api/curriculum";

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      admission_no: "",
      username: "",
      contact_no: "",
      email_id: "",
      gender: "",
      curriculum: "",
      invalidName: "",
      invalidAdmissionNo: "",
      invalidUsername: "",
      invalidContactNo: "",
      invalidEmailId: "",
      errorMessage: "",
      departmentList: [],
      curriculumList: [],
      departmentId: ""
    };
  }
  async componentDidMount() {
    let departmentList = [],
      curriculumList = [];
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

    response = await curriculumApi.getCurriculumByCourse(curriculum);
    if (response) {
      for (let i = 0; i < response.data.data.length; i++) {
        curriculumList.push(
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
      curriculumList
    });
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
      case "admission_no":
        let admission_no = event.target.value;
        this.setState({
          admission_no
        });
        if (isEmpty(admission_no)) message = "Admission Number is required";
        else if (isLengthInvalid(admission_no, 5, 6))
          message = "Length should be 5 characters";
        else message = "";
        this.setState({
          invalidAdmissionNo: message
        });
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

  discardData = () => {
    this.setState({
      name: "",
      admission_no: "",
      username: "",
      contact_no: "",
      email_id: "",
      gender: ""
    });
  };

  addStudent = () => {
    if (this.state.name != "" && this.state.admission_no) {
      this.setState({ errorMessage: "" });
      let name = this.state.name.trim();
      let studentObj = {
        studentName: name,
        admission_no: this.state.admission_no,
        username: this.state.username,
        contact_no: this.state.contact_no,
        gender: this.state.gender,
        email_id: this.state.email_id,
        department_id: 2,
        parent_id: 3,
        batch_id: 2
      };
      this.props.addStudent(studentObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested",
        invalidName: "Name is required",
        invalidAdmissionNo: "Admission Number is required",
        invalidUsername: "Username is required",
        invalidContactNo: "Contact is required",
        invalidEmailId: "Email Id is required"
      });
    }
  };

  handleChange = (event, index, value) => {
    this.setState({
      gender: value
    });
  };
  handleDept = (event, index, value) => {
    this.setState({ departmentId: value });
  };

  handleChange = (event, index, value) => {
    this.setState({
      status: value
    });
  };

  handleCurriculum = (event, index, value) => {
    this.setState({
      curriculum: value
    });
  };

  render() {
    return (
      <div>
        <div className="contentCenter">
          <h2>Add Student</h2>
          <br />
          <label className="errorMsg">{this.state.errorMessage}</label>
          <br />
          <TextField
            hintText="Student Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Student Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.name}
            style={{ display: "inline-block" }}
          />
          <TextField
            type="number"
            hintText="Admission Number"
            errorText={this.state.invalidAdmissionNo}
            floatingLabelText="Admission Number"
            onChange={e => this.handleTextChange(e, "admission_no")}
            value={this.state.admission_no}
            style={{ display: "inline-block", marginLeft: "36px" }}
          />
          <br />
          <br />
          <br />
          <TextField
            hintText="Username"
            errorText={this.state.invalidUsername}
            floatingLabelText="Username"
            onChange={e => this.handleTextChange(e, "username")}
            value={this.state.username}
            style={{ display: "inline-block" }}
          />

          <TextField
            type="number"
            hintText="Contact Number"
            errorText={this.state.invalidContactNo}
            floatingLabelText="Contact Number"
            onChange={e => this.handleTextChange(e, "contact_no")}
            value={this.state.contact_no}
            style={{ display: "inline-block", marginLeft: "36px" }}
          />
          <br />
          <br />
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
            floatingLabelText="Gender"
            onChange={this.handleChange}
            value={this.state.gender}
            style={{ display: "inline-block", marginLeft: "36px" }}
          >
            <MenuItem value={"FEMALE"} primaryText="Female" />
            <MenuItem value={"MALE"} primaryText="Male" />
          </SelectField>
          <br />
          <br />
          <br />

          <SelectField
            floatingLabelText="Select Curriculum"
            onChange={this.handleCurriculum}
            value={this.state.curriculum}
            style={{ display: "inline-block" }}
          >
            {this.state.curriculumList}
          </SelectField>

          <TextField
            hintText="Email Id"
            errorText={this.state.invalidEmailId}
            floatingLabelText="Email Id"
            onChange={e => this.handleTextChange(e, "email_id")}
            value={this.state.email_id}
          />

          <br />
          <br />
          <br />
          <RaisedButton
            label="ADD"
            admission_no
            primary={true}
            onTouchTap={this.addStudent}
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

export default AddStudent;
