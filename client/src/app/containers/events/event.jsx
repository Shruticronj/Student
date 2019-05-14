import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import Divider from "material-ui/Divider";
import EventList from "../../components/events/EventList.jsx";
import AddEvent from "./../../components/events/AddEvents.jsx";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {
  getEventList,
  addEvent,
  deleteEvent,
  editEvent,
  hideSlackBar,
  updateSlackBarMsg,
  handleTabChange,
  pageChange
} from "./../../actions/eventActions.jsx";
import { connect } from "react-redux";

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillMount() {
    let event = { id: 1 };
    this.props.getEventList(event);
  }

  render() {
    return (
      <div>
        <Divider />
        <h1> Manage Event </h1>
        <Divider />
        <Tabs
          value={this.props.event.selectedTab}
          onChange={this.props.handleTabChange}
        >
          <Tab label="event List" value="list">
            <EventList
              getEventList={course => this.props.getEventList(course)}
              eventList={this.props.event.pagedEvent}
              showSlackBar={this.props.event.showSlackBar}
              slackBarMsg={this.props.event.queryStatusMessage}
              hideSlackBar={() => this.props.hideSlackBar()}
              editEvent={event => this.props.editEvent(event)}
              updateSlackBarMsg={message =>
                this.props.updateSlackBarMsg(message)
              }
              deleteEvent={event => this.props.deleteEvent(event)}
              pagination={this.props.event.pagination}
              pageChange={(currentPage, size) =>
                this.props.pageChange(currentPage, size)
              }
            />
          </Tab>
          <Tab className="contentCenter" label="Add event" value="add">
            <AddEvent
              addEvent={event => this.props.addEvent(event)}
              showSlackBar={this.props.event.showSlackBar}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Event.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
Event.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    login: state.login,
    event: state.eventReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEventList: course => {
      dispatch(getEventList(course));
    },
    addEvent: event => {
      dispatch(addEvent(event));
    },
    deleteEvent: event => {
      dispatch(deleteEvent(event));
    },
    editEvent: event => {
      dispatch(editEvent(event));
    },
    hideSlackBar: () => {
      dispatch(hideSlackBar());
    },
    updateSlackBarMsg: message => {
      dispatch(updateSlackBarMsg(message));
    },
    handleTabChange: value => {
      dispatch(handleTabChange(value));
    },
    pageChange: (currentPage, size) => {
      dispatch(pageChange(currentPage, size));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
