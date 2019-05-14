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
import EditTeacher from "./EditTeacher.jsx";
import DeleteTeacher from "./DeleteTeacher.jsx";
require("rc-pagination/assets/index.css");
const Pagination = require("rc-pagination");

import { path } from "../../utils/general-config";
import DeleteButton from "material-ui/svg-icons/action/delete";
import SvgIcon from "material-ui/SvgIcon";
import { black } from "material-ui/styles/colors";

class TeacherList extends React.Component {
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
    const edit = (
      <EditTeacher
        handleTouchTap={this.handleTouchTap}
        teacher={this.props.teacherList[this.state.selectedIndex]}
        editTeacher={this.props.editTeacher}
        showSlackBar={this.props.showSlackBar}
      />
    );

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
              <TableHeaderColumn>Teacher Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Designation</TableHeaderColumn>
              <TableHeaderColumn>Department Name</TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.teacherList.map((teacher, index) => (
              <TableRow
                key={index}
                style={
                  teacher.status == true
                    ? { backgroundColor: "whiteSmoke" }
                    : { backgroundColor: "grey" }
                }
              >
                <TableRowColumn>{teacher.teacher_name}</TableRowColumn>
                <TableRowColumn>
                  {teacher.status == true ? "Active" : "Non-Active"}
                </TableRowColumn>
                <TableRowColumn>{teacher.designation}</TableRowColumn>
                <TableRowColumn>{teacher.department_name}</TableRowColumn>
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
        {this.state.showEdit ? edit : null}

        {this.state.showDelete ? (
          <DeleteTeacher
            handleTouchTap={this.handleTouchTap}
            teacher={this.props.teacherList[this.state.selectedIndex]}
            showSlackBar={this.props.showSlackBar}
            deleteTeacher={this.props.deleteTeacher}
          />
        ) : null}
        {this.props.showSlackBar ? snackBar : null}
      </div>
    );
  }
}

export default TeacherList;
