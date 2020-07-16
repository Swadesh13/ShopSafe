import React, { Component } from "react";
import http from "../../../services/httpServices";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  state = {};
  async componentDidMount() {
    try {
      const response = await http.get(
        "https://us-central1-shopsafe-ju.cloudfunctions.net/api/logout"
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.clear();
        window.location = "/";
        //this.props.history.push("/");
      }
    } catch (ex) {
      console.log(ex);
    }
    // localStorage.clear();
    // window.location = "/";
  }
  render() {
    return null;
  }
}

export default withRouter(Logout);
