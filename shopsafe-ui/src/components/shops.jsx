import React, { Component } from "react";
import Shop from "./shop";
import Grid from "@material-ui/core/Grid";

class Shops extends Component {
  state = {};
  render() {
    return (
      // <Shop/>
      <div style={{ flexGrow: 1 }} alignItems="center">
        <br />
        <br />
        <br />
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Shop />
          </Grid>
          <Grid item xs>
            <Shop />
          </Grid>
          <Grid item xs>
            <Shop />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Shop />
          </Grid>
          <Grid item xs>
            <Shop />
          </Grid>
          <Grid item xs>
            <Shop />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Shops;
