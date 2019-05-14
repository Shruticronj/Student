import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import "babel-polyfill";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import curriculumApi from "../../utils/api/curriculum";

class EditCurriculum extends React.Component {
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
      invalidName: "",
      nameText: "",
      errorMessage: ""
    };
  }

  async componentDidMount() {
    let departmentList = [],
      semesterList = [];
    let response;
    let curriculumObj = {
      courseId: 1,
      academicYearId: 1,
      semesterId: 1
    };
    let semester = {
      courseId: 1,
      academicYearId: 1
    };

    response = await curriculumApi.getDepartmentList(curriculumObj);
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
    let curriculum = this.props.curriculum;
    this.setState({
      nameText: curriculum.name,
      shortNameText: curriculum.abbreviated_name,
      acedemicYear: curriculum.academic_year_name,
      semesterId: curriculum.semester_id,
      departmentId: curriculum.department_id,
      status: curriculum.status
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
          message = "Name is required";
        } else if (isLengthInvalid(name, 5, 75)) {
          message = "Length should be greater than 5 characters";
        } else {
          message = "";
        }
        this.setState({ invalidName: message });
        break;
    }
  };

  handleSave = () => {
    if (this.state.invalidName == "") {
      this.setState({ errorMessage: "" });
      let name = this.state.nameText.trim();
      let curriculumObj = {
        id: this.props.curriculum.id,
        name: name
      };
      this.props.editCurriculum(curriculumObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested: "
      });
    }
  };
  handleChange = (event, index, value) => {
    this.setState({
      status: value
    });
  };

  handleDept = (event, index, value) => {
    this.setState({ departmentId: value });
  };

  handleSem = (event, index, value) => {
    this.setState({ semesterId: value });
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
        title="Edit Curriculum"
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
            hintText="Curriculum Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Curriculum Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.nameText}
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
        </div>
      </Dialog>
    );
  }
}

export default EditCurriculum;
