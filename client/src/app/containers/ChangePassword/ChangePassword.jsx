import React, { Component } from "react";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import RaisedButton from "material-ui/RaisedButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import { Card } from "material-ui/Card";
import { Link } from "react-router";
import TopBar from './../../components/login/TopBar.jsx';
import { isEmpty, isValidPassword, isPasswordMatched } from "./../../utils/validation.js";
let show = require('../../images/show.png');
let hide = require('../../images/hide.png');

class ChangePassword extends Component {
    constructor() {
      super();
      this.state = {
          success:false,
          type:'password',
          new_password: "",
          confirm_password: "",
          invalidNew: "",
          invalidConfirm: "",
          errorMessage:""
      }
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
      
    handleTextChange = (event,item) => {
        let message = "";
        switch (item) {
            
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

    ChangePassword = () => {
        if (
            this.state.new_password != "" &&
            this.state.confirm_password != ""
          ) {
            this.setState({ errorMessage: "" });
            let passwordObj = {
              new_password: this.state.new_password,
              confirm_password: this.state.confirm_password
            };
            
            utils.resetPassword(passwordObj).then(res=>{
              this.setState({
                success: res.data.flag
              })
              
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
        }
    
render(){
    return(
        <div>
        <TopBar />  
        <Card
          style={{
            width: "330px",
            height: "420px",
            margin: "auto",
            marginTop: "55px",
            padding: "15px"
          }}
        >
        <span style={{fontFamily: 'Roboto, sans-serif',color:'grey',marginLeft:'15%',marginTop:'5%',
            fontSize: '23px' }}>
            Change Password
            </span>
            <div style={{display:'flex'}}>
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
          <br />
          
            <RaisedButton
                label="Change Password"
                onClick={this.changePassword}
                style={{fontFamily: 'Roboto, sans-serif',color:'grey',marginLeft:'63px',fontSize: '20px',
                position:'fixed',cursor:'pointer',marginTop:'30px'}}
            />
          
            <Snackbar
                open={this.state.success}
                message={"Password changed successfully!!"}
                autoHideDuration={3000}
            />
            </Card>
        </div>
        )
    }
}

ChangePassword.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };
  
  ChangePassword.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

export default ChangePassword;