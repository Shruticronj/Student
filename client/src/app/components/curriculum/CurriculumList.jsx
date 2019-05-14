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
import EditCurriculum from "./EditCurriculum.jsx";
import DeleteCurriculum from "./DeleteCurriculum.jsx";
import DeleteButton from "material-ui/svg-icons/action/delete";
import SvgIcon from "material-ui/SvgIcon";
import { black } from "material-ui/styles/colors";
require("rc-pagination/assets/index.css");
const Pagination = require("rc-pagination");

import { path } from "../../utils/general-config";

class CurriculumList extends React.Component {
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
      <EditCurriculum
        handleTouchTap={this.handleTouchTap}
        curriculum={this.props.curriculumList[this.state.selectedIndex]}
        editCurriculum={this.props.editCurriculum}
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
              <TableHeaderColumn>Curriculum Name</TableHeaderColumn>
              <TableHeaderColumn>Department Name</TableHeaderColumn>
              <TableHeaderColumn>Academic Year</TableHeaderColumn>
              <TableHeaderColumn>Semester Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.curriculumList.map((curriculum, index) => (
              <TableRow
                key={index}
                style={
                  curriculum.status == true
                    ? { backgroundColor: "whiteSmoke" }
                    : { backgroundColor: "grey" }
                }
              >
                <TableRowColumn>{curriculum.name}</TableRowColumn>
                <TableRowColumn>{curriculum.department_name}</TableRowColumn>
                <TableRowColumn>{curriculum.academic_year_name}</TableRowColumn>
                <TableRowColumn>{curriculum.semester_name}</TableRowColumn>
                <TableRowColumn>
                  {curriculum.status.toString() == "true"
                    ? "Active"
                    : "Non-Active"}
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
          <DeleteCurriculum
            handleTouchTap={this.handleTouchTap}
            curriculum={this.props.curriculumList[this.state.selectedIndex]}
            showSlackBar={this.props.showSlackBar}
            deleteCurriculum={this.props.deleteCurriculum}
          />
        ) : null}
        {this.props.showSlackBar ? snackBar : null}
      </div>
    );
  }
}

export default CurriculumList;
