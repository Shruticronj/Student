import React from "react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { isEmpty, isLengthInvalid } from "./../../utils/validation.js";

class EditDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidName: "",
      invalidShortName: "",
      nameText: "",
      noOfStudents: "",
      status: "",
      shortNameText: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    let department = this.props.department;
    this.setState({
      nameText: department.name,
      shortNameText: department.abbreviated_name,
      noOfStudents: department.total_no_of_students,
      status: department.status
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

      case "shortName":
        let shortName = event.target.value;
        this.setState({ shortNameText: shortName });
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

  handleSave = () => {
    if (this.state.invalidShortName == "" && this.state.invalidName == "") {
      this.setState({ errorMessage: "" });
      let name = this.state.nameText.trim();
      let shortName = this.state.shortNameText.trim();
      let departmentObj = {
        id: this.props.department.id,
        name: name,
        abbreviated_name: shortName,
        // course_id: 1,
        status: this.state.status,
        total_no_of_students: this.state.noOfStudents
      };
      this.props.editDepartment(departmentObj);
    } else {
      this.setState({
        errorMessage: "Error! Please enter all the fields as suggested: "
      });
    }
  };
  handleChange = (event, index, value) => {
    this.setState({ status: value });
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
        title="Edit Department"
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
            hintText="Department Full Name"
            errorText={this.state.invalidName}
            floatingLabelText={this.props.department.name}
            onChange={e => this.handleTextChange(e, "name")}
            value={this.state.nameText}
          />
          <TextField
            style={{ marginLeft: "36px" }}
            hintText="Department Short Name"
            floatingLabelText={this.props.department.abbreviated_name}
            errorText={this.state.invalidShortName}
            value={this.state.shortNameText}
            onChange={e => this.handleTextChange(e, "shortName")}
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
            style={{ marginLeft: "36px" }}
          >
            <MenuItem value={true} primaryText="Active" />
            <MenuItem value={false} primaryText="Not Active" />
          </SelectField>
        </div>
      </Dialog>
    );
  }
}

export default EditDepartment;
