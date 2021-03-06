import React, { Component } from "react";
import http from "../../../services/httpServices";
import { withRouter } from "react-router-dom";
import { logout } from "../../../services/userService";

class Logout extends Component {
  state = {};
  async componentDidMount() {
    try {
      const response = await logout();
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
    localStorage.clear();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default withRouter(Logout);
