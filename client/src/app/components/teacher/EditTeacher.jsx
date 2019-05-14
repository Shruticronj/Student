import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import curriculumApi from "../../utils/api/curriculum";

class EditTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidName: "",
      departmentList: [],
      desigList: [],
      designation: "",
      status: "",
      departmentId: "",
      nameText: "",
      errorMessage: ""
    };
  }

  async componentDidMount() {
    let departmentList = [];
    let response;
    let curriculumObj = {
      courseId: 1,
      academicYearId: 1,
      semesterId: 1
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

    let teacher = this.props.teacher;
    this.setState({
      nameText: teacher.teacher_name,
      departmentList: departmentList,
      desigList: desigList,
      departmentId: teacher.department_id,
      designation: teacher.designation,
      status: teacher.status
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
      let teacherObj = {
        id: this.props.teacher.id,
        name: name
      };
      this.props.editTeacher(teacherObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested: "
      });
    }
  };

  handleDept = (event, index, value) => {
    this.setState({ departmentId: value });
  };

  handleChange = (event, index, value) => {
    this.setState({ status: value });
  };

  handleDesignation = (event, index, value) => {
    this.setState({
      designation: value
    });
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
        title="Edit Teacher Details"
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
            hintText="Teacher Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Teacher Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.nameText}
          />
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
          <br />
          <SelectField
            floatingLabelText="Status"
            errorText={this.state.invalidStatus}
            onChange={this.handleChange}
            style={{ display: "inline-block" }}
            value={this.state.status}
          >
            <MenuItem value={true} primaryText="Active" />
            <MenuItem value={false} primaryText="Not Active" />
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
        </div>
      </Dialog>
    );
  }
}

export default EditTeacher;
