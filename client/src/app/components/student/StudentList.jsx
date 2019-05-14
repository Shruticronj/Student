import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import EditStudent from "./EditStudent.jsx";
import DeleteStudent from "./DeleteStudent.jsx";
require("rc-pagination/assets/index.css");
const Pagination = require("rc-pagination");

import { path } from "../../utils/general-config";
import DeleteButton from "material-ui/svg-icons/action/delete";
import SvgIcon from "material-ui/SvgIcon";
import { black } from "material-ui/styles/colors";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllocateElseEdit: false,
      showDelete: false,
      selectedIndex: ""
    };
  }

  handleTouchTap = (item, event) => {
    switch (item.identity) {
      case "editButton":
        this.setState({
          selectedIndex: item.index,
          showEdit: true
        });
        break;

      case "closeShowEdit":
        this.setState({ showEdit: false });
        break;

      case "deleteButton":
        this.setState({
          selectedIndex: item.index,
          showDelete: true
        });
        break;

      case "closeShowDelete":
        this.setState({ showDelete: false });
        break;
    }
  };

  render() {
    const snackBar = (
      <Snackbar
        open={true}
        message={this.props.slackBarMsg}
        autoHideDuration={4000}
        onRequestClose={this.props.hideSlackBar}
      />
    );

    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Student Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>DepartMent Name</TableHeaderColumn>
              <TableHeaderColumn>Parent Name</TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.studentList.map((student, index) => (
              <TableRow
                key={index}
                style={
                  student.status == true
                    ? { backgroundColor: "whiteSmoke" }
                    : { backgroundColor: "grey" }
                }
              >
                <TableRowColumn>{student.student_name}</TableRowColumn>
                <TableRowColumn>
                  {student.status == true ? "Active" : "Non-Active"}
                </TableRowColumn>
                <TableRowColumn>{student.department_name}</TableRowColumn>
                <TableRowColumn>{student.father_name}</TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    primary={true}
                    onTouchTap={() =>
                      this.handleTouchTap({ identity: "editButton", index })
                    }
                  >
                    <SvgIcon>
                      <path d={path} />
                    </SvgIcon>
                  </FlatButton>
                </TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    secondary={true}
                    onTouchTap={() =>
                      this.handleTouchTap({ identity: "deleteButton", index })
                    }
                  >
                    {" "}
                    <DeleteButton color={black} />
                  </FlatButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          className="ant-pagination"
          defaultCurrent={1}
          total={this.props.pagination.totalPages}
          current={this.props.pagination.currentPage}
          defaultPageSize={this.props.pagination.pageSize}
          onChange={this.props.pageChange}
        />
        {this.state.showEdit ? (
          <EditStudent
            handleTouchTap={this.handleTouchTap}
            student={this.props.studentList[this.state.selectedIndex]}
            editStudent={this.props.editStudent}
            showSlackBar={this.props.showSlackBar}
          />
        ) : null}

        {this.state.showDelete ? (
          <DeleteStudent
            handleTouchTap={this.handleTouchTap}
            student={this.props.studentList[this.state.selectedIndex]}
            showSlackBar={this.props.showSlackBar}
            deleteStudent={this.props.deleteStudent}
          />
        ) : null}
        {this.props.showSlackBar ? snackBar : null}
      </div>
    );
  }
}

export default StudentList;
