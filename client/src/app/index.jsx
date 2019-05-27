import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import { render } from "react-dom";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Login from "./containers/login/App.jsx";
import App from "./containers/App.jsx";
import Dashboard from "./components/dashboard/DashBoard.jsx";
import Department from "./containers/department/Department.jsx";
import Curriculum from "./containers/curriculum/Curriculum.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Student from "./containers/student/Student.jsx";
import Teacher from "./containers/teacher/teacher.jsx";
import Subject from "./containers/subject/subject.jsx";
import Event from "./containers/events/event.jsx";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword.jsx";
import ChangePassword from "./containers/ChangePassword/ChangePassword.jsx";

const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={history}>
    <Route path="/" component={Login} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/changePassword" component={ChangePassword} />
    <Route path="/dashboard" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/department" component={Department} />
        <Route path="/curriculum" component={Curriculum} />
        <Route path="/student" component={Student} />
        <Route path="/teacher" component={Teacher} someValue="sideBar" />
        <Route path="/subject" component={Subject} />
        <Route path="/event" component={Event} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
