import React from "react";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
let userImage = require("./../images/user.png");
import { Link } from "react-router";
import { browserHistory } from "react-router";

export default class SideBarMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Dashboard"
    };
  }

  componentWillMount() {
    if (!this.props.isLogin) {
      browserHistory.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isLogin) {
      browserHistory.push("/");
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleTouchTap = (item, event) => {
    this.setState({
      selected: item
    });
  };

  render() {
    var list = {
      "/dashboard": "white",
      "/department": "white",
      "/curriculum": "white",
      "/students": "white",
      "/teachers": "white",
      "/subjects": "white",
      "/events": "white",
      "/important": "white"
    };

    list[this.state.selected] = "#e3e7ea";
    let sizeWidth = 230;
    if (this.props.open === false) {
      sizeWidth = 70;
    }

    return (
      <div>
        <Drawer
          width={sizeWidth}
          openSecondary={false}
          docked={true}
          zDepth={2}
          open={true}
        >
          <AppBar
            title="Menu"
            onLeftIconButtonTouchTap={this.props.handleToggle}
          />

          {this.props.user.role ? (
            <List>
              {this.props.user.role.isAdmin ? (
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <ListItem
                    primaryText="DashBoard"
                    leftAvatar={<Avatar src={userImage} />}
                    style={{ backgroundColor: list["Dashboard"] }}
                    onTouchTap={this.handleTouchTap.bind(this, "Dashboard")}
                  />
                </Link>
              ) : null}
              <Link to="/department" style={{ textDecoration: "none" }}>
                <ListItem
                  primaryText="Department"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{ backgroundColor: list["Department"] }}
                  onTouchTap={this.handleTouchTap.bind(this, "Department")}
                />
              </Link>
              <Link to="/curriculum" style={{ textDecoration: "none" }}>
                <ListItem
                  primaryText="Curriculum"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{ backgroundColor: list["/curriculum"] }}
                  onTouchTap={this.handleTouchTap.bind(this, "/curriculum")}
                />
              </Link>
              <Link to="/student" style={{ textDecoration: "none" }}>
                <ListItem
                  primaryText="Student"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{ backgroundColor: list["Student"] }}
                  onTouchTap={this.handleTouchTap.bind(this, "Student")}
                />
              </Link>
              <Link to="/teacher" style={{ textDecoration: "none" }}>
                <ListItem
                  primaryText="Teacher"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{ backgroundColor: list["Teacher"] }}
                  onTouchTap={this.handleTouchTap.bind(this, "Teacher")}
                />
              </Link>
              <Link to="/subject" style={{ textDecoration: "none" }}>
                <ListItem
                  primaryText="Subjects"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{ backgroundColor: list["Subjects"] }}
                  onTouchTap={this.handleTouchTap.bind(this, "Subjects")}
                />
              </Link>
              <Link to="/event" style={{ textDecoration: "none" }}>
                <ListItem
                  primaryText="Events"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{ backgroundColor: list["Events"] }}
                  onTouchTap={this.handleTouchTap.bind(this, "Events")}
                />
              </Link>
            </List>
          ) : null}
          <Divider />
          <List>
            <ListItem
              primaryText="Important"
              leftAvatar={<Avatar src={userImage} />}
              style={{ backgroundColor: list["Important"] }}
              onTouchTap={this.handleTouchTap.bind(this, "Important")}
            />
            <ListItem
              primaryText="Teachers/Students"
              leftAvatar={<Avatar src={userImage} />}
              style={{ backgroundColor: list["T/S"] }}
              onTouchTap={this.handleTouchTap.bind(this, "T/S")}
            />
          </List>
        </Drawer>
      </div>
    );
  }
}

SideBarMenu.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
SideBarMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
};
