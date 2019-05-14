import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import curriculumApi from "../../utils/api/curriculum";

class EditSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidName: "",
      nameText: "",
      errorMessage: "",
      skill_set: "",
      departmentList: [],
      departmentId: "",
      status: ""
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
    let subject = this.props.subject;
    this.setState({
      nameText: subject.name,
      skill_set: subject.skill_set,
      departmentList: departmentList,
      departmentId: subject.department_id,
      status: subject.status
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
      let subjectObj = {
        id: this.props.subject.id,
        name: name
      };
      this.props.editSubject(subjectObj);
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
        title="Edit Subject Details"
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
            hintText="Subject Name"
            errorText={this.state.invalidName}
            floatingLabelText="Subject Name"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.nameText}
            style={{ display: "inline-block" }}
          />

          <TextField
            hintText="Skill Set"
            errorText={this.state.invalidName}
            floatingLabelText="Skill Set"
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.skill_set}
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
        </div>
      </Dialog>
    );
  }
}

export default EditSubject;
