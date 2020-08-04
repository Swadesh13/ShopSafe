import React, { Component } from "react";
import api from "../configApi.json";
import { Link } from "react-router-dom";
import { Grid } from '@material-ui/core';

class NotFound extends Component {
    getStyles = () => {
        let st = {};
        const { innerWidth: w, innerHeight: h } = window;
        if (w > h) st.height = h * 0.8;
        else st.width = w * 0.95;
        st.margin = "auto";
        st.marginTop = 60;
        return st;
    }
    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid Item>
                    <img
                        src={api.errorPageImage}
                        style={this.getStyles()}
                        // style={{
                        //     height: window.innerHeight * 0.8,
                        //     margin: "auto",
                        //     marginTop: 60,
                        // }}
                    ></img>
                </Grid>
                <Grid item>
                    <Link to="/">HOME</Link>
                </Grid>
            </Grid>
        );
    }
}

export default NotFound;
