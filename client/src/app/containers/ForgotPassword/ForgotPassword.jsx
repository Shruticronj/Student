import React, { Component } from "react";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import RaisedButton from "material-ui/RaisedButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import { Card } from "material-ui/Card";
import { Link } from "react-router";
import utils  from "../../utils/api/forgotPassword";
import TopBar from './../../components/login/TopBar.jsx';
import {isValidEmail, isEmpty, isValidPassword, isPasswordMatched} from "./../../utils/validation.js";
let show = require('../../images/show.png');
let hide = require('../../images/hide.png');

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_id: "",
      invalidEmail: "",
      new_password: "",
      confirm_password: "",
      invalidNew: "",
      invalidConfirm: "",
      message: "",
      errorMessage:"",
      success: false,
      type: 'password'
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  showHide = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }

  handleTextChange = (event, item) => {
    let message = "";
    switch (item) {

      case "email_id":
        let email_id = event.target.value;
        this.setState({ email_id: email_id });
        email_id = email_id.trim();
        if(isEmpty(email_id)) message = "Email is required";
        else if (!isValidEmail(email_id)) message = "Email is not valid";
        else message = "";
        this.setState({ invalidEmail: message });
        break;

        case "new_password":
          let new_password = event.target.value;
          this.setState({ new_password: new_password });
          new_password = new_password.trim();
          if (isEmpty(new_password)) message = "New password is required";
          else if (!isValidPassword(new_password)) message = "Password is too weak";
          else message = "";
          this.setState({ invalidNew: message });
          break;

        case "confirm_password":
          let confirm_password = event.target.value;
          this.setState({ confirm_password: confirm_password });
          confirm_password = confirm_password.trim();
          if (isEmpty(confirm_password)) message = "Re-type your new password";
          else if (!isPasswordMatched(this.state.new_password,confirm_password)) message = "Password is not matched";
          else if (!isValidPassword(confirm_password)) message = "Password is too weak;"
          else message = "";
          this.setState({ invalidConfirm: message });
          break;
      }
    }

  changePassword = () => {
    if (
      this.state.email_id != "" &&
      this.state.new_password != "" &&
      this.state.confirm_password != ""
    ) {
      this.setState({ errorMessage: "" });
      let email_id = this.state.email_id.trim();
      let passwordObj = {
        email_id: email_id,
        new_password: this.state.new_password,
        confirm_password: this.state.confirm_password
      };
      
      utils.resetPassword(passwordObj).then(res=>{
        this.setState({
          success: res.data.flag
        })
        
      });
    }
    
    if (this.state.email_id == "") {
      this.setState({
        invalidEmail: "Email is required"
      });
    }
    if (this.state.new_password == "") {
      this.setState({ invalidNew: "Password is required" });
    }
    if (this.state.confirm_password == "") {
      this.setState({
        invalidConfirm: "Re-type your new password"
      });
    }
  };

render() {
  return (
      <div>
        <TopBar />  
        <Card
          style={{
            width: "330px",
            height: "430px",
            margin: "auto",
            marginTop: "55px",
            padding: "15px"
          }}
        >
          
          <span style={{fontFamily: 'Roboto, sans-serif',color:'grey',marginLeft:'15%',fontSize: '23px' }}>
            Change Password
            </span>
            
          
          <TextField
            type="email"
            hintText="Your email address"
            floatingLabelText="Email Address"
            errorText={this.state.invalidEmail}
            onChange={e => this.handleTextChange(e, "email_id")}
          />
          
          <div style={{display:'flex',marginBottom:'10px'}}>
          <TextField
            type={this.state.type}
            hintText="New password"
            floatingLabelText="New password"
            errorText={this.state.invalidNew}
            onChange={e => this.handleTextChange(e, "new_password")}
            />
         <span onClick={this.showHide}>{this.state.type === 'input' ?
         <img src={show} width='25px' height='15px' style={{marginTop:'25px', cursor:'pointer'}}/>:
         <img src={hide} width='25px' height='15px' style={{marginTop:'25px', cursor:'pointer'}}/>
          }
         </span>
          </div>
          <TextField
            type="password"
            hintText="re-type New password"
            floatingLabelText="Confirm password"
            errorText={this.state.invalidConfirm}
            onChange={e => this.handleTextChange(e, "confirm_password")}
          />
        
          <div style={{marginTop:'10px',position:'fixed'}}>
          <RaisedButton
            label="Change Password"
            onClick={this.changePassword}
            style={{fontFamily: 'Roboto, sans-serif',color:'grey',marginLeft:'65px',fontSize: '20px',
            position:'fixed',cursor:'pointer'}}
          />
          <Link to = '/'>
          <p style={{marginLeft:'130px', marginTop:'50px', cursor:'pointer'}}>Login</p>
          </Link>
          </div>
          <Snackbar
          open={this.state.success}
          message={"Password changed successfully!!"}
          autoHideDuration={3000}
          />
      </Card>
      </div>
    );
  }
}

ForgotPassword.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

ForgotPassword.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ForgotPassword;
