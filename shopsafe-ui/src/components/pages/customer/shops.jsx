import React, { Component } from "react";
import Shop from "./components/shop";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ShopsList } from "../../../utils/auth";
import { getShopList } from "../../../services/dataServices";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Shops extends Component {
  state = {
    shopData: [],
  };

  async componentDidMount() {
    try {
      const response = await getShopList();
      console.log(response);
      this.setState({ shopData: response.data });

    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const { classes } = this.props;
    //console.log(this.getShops());
    return (
      // <Shop/>
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {this.state.shopData.map((data, i) => (
            <Grid key={i} item md={6} lg={4}>
              <Shop data={data} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(Shops);
