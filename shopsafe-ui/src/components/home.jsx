import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import http from "../services/httpServices";
import { getShopList } from '../services/dataServices';

const sha = require("sha256");

class Home extends Component {
  state = {
    token: "",
    data: "",
  };
  getLogin = async () => {
    try {
      const response = await http.post(
        "https://us-central1-shopsafe-ju.cloudfunctions.net/api/login",
        {
          email: "abcd@gmail.com",
          password: sha("abcd123"),
        }
      );
      this.setState({ token: response.data.token });
    } catch (ex) {
      console.log(ex);
    }
  };

  getUser = async () => {
    try {
      const response = await http.get(
        "https://us-central1-shopsafe-ju.cloudfunctions.net/api/user",
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      );
      console.log(response);
      this.setState({ data: response.data.userCredentials });
    } catch (ex) {
      console.log(ex);
    }
  };

  getShops = () => {
    this.setState({ data: sha("abcd1234") });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        <Typography variant="h1" align="center" onClick={this.getLogin}>
          I see this an absolute win !<br />
          <br />
        </Typography>
        <p>{this.state.token}</p>
        <br />
        <Typography variant="h1" align="center" onClick={this.getShops}>
          GET
          <br />
          {data}
        </Typography>
      </div>
    );
  }
}

export default Home;
