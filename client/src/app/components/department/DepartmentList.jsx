import React from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import EditDepartment from "./EditDepartment.jsx";
import DeleteDepartment from "./DeleteDepartment.jsx";
require("rc-pagination/assets/index.css");
const Pagination = require("rc-pagination");
import { path } from "../../utils/general-config";
import DeleteButton from "material-ui/svg-icons/action/delete";
import SvgIcon from "material-ui/SvgIcon";
import { black } from "material-ui/styles/colors";

class DepartmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
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
      <EditDepartment
        handleTouchTap={this.handleTouchTap}
        department={this.props.departmentList[this.state.selectedIndex]}
        editDepartment={this.props.editDepartment}
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
              <TableHeaderColumn>Department Name</TableHeaderColumn>
              <TableHeaderColumn>Short Name</TableHeaderColumn>
              <TableHeaderColumn>No. of Students</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.props.departmentList.map((department, index) => (
              <TableRow
                key={index}
                style={
                  department.status == true
                    ? { backgroundColor: "whiteSmoke" }
                    : { backgroundColor: "grey" }
                }
              >
                <TableRowColumn>{department.name}</TableRowColumn>
                <TableRowColumn>{department.abbreviated_name}</TableRowColumn>
                <TableRowColumn>
                  {department.total_no_of_students}
                </TableRowColumn>
                <TableRowColumn>
                  {department.status.toString() == "true"
                    ? "Active"
                    : "Not-active"}
                </TableRowColumn>
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
          <DeleteDepartment
            handleTouchTap={this.handleTouchTap}
            department={this.props.departmentList[this.state.selectedIndex]}
            showSlackBar={this.props.showSlackBar}
            deleteDepartment={this.props.deleteDepartment}
          />
        ) : null}
        {this.props.showSlackBar ? snackBar : null}
      </div>
    );
  }
}

export default DepartmentList;
