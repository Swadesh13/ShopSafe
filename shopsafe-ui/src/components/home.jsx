import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import http from "../services/httpServices";
import { getShopList } from '../services/dataServices';
import { Box, Grid } from "@material-ui/core";

const sha = require("sha256");

class Home extends Component {
  state = {};
  
  render() {
    
    return (
        <div>
            hello
        </div>
    );
  }
}

export default Home;
