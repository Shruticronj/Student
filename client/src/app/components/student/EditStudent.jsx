import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import curriculumApi from "../../utils/api/curriculum";

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidName: "",
      admission_no: "",
      departmentId: "",
      father_name: "",
      nameText: "",
      errorMessage: "",
      departmentList: []
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

    let student = this.props.student;
    this.setState({
      nameText: student.student_name,
      admission_no: student.admission_no,
      status: student.status,
      father_name: student.father_name,
      email_id: student.email_id,
      gender: student.gender,
      departmentList: departmentList,
      departmentId: student.department_id
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.showSlackBar) {
      this.props.handleTouchTap({ identity: "closeShowEdit" });
    }
  }
  handleChange = (event, index, value) => {
    this.setState({
      status: value
    });
  };

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
      let studentObj = {
        id: this.props.student.id,
        student_name: name
      };
      this.props.editStudent(studentObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested: "
      });
    }
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
        title="Edit Student Details"
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
            hintText="Student Full Name"
            errorText={this.state.invalidName}
            floatingLabelText="Student Full Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.nameText}
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
          <br />
          <TextField
            hintText="Father Name"
            errorText={this.state.invalidAdmissionNo}
            floatingLabelText="Father Name"
            onChange={e => this.handleTextChange(e, "father_name")}
            value={this.state.father_name}
            style={{ display: "inline-block" }}
          />
          <br />
        </div>
      </Dialog>
    );
  }
}

export default EditStudent;
