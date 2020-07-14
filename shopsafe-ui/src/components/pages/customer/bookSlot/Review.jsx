import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getUserDetails } from "../../../../utils/auth";
import Divider from "@material-ui/core/Divider";

const useStyles = (theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 200,
  },
});

class Review extends Component {
  state = {
    products: this.props.items,
    userDetails: getUserDetails(),
  };
  render() {
    const { products, userDetails: user } = this.state;
    const { classes, period, shopData, slotTime } = this.props;
    return (
      <React.Fragment>
        <Divider />
        <br />
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding className={classes.root}>
          {products.map((product, i) => (
            <ListItem className={classes.listItem} key={i}>
              <ListItemText primary={product} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="period"
              //label=""
              defaultValue={period}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="slotTime"
              label="Slot Time"
              defaultValue={slotTime}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Your Info
            </Typography>
            <Typography gutterBottom>{user.name}</Typography>
            <Typography gutterBottom>{user.email}</Typography>
            <Typography gutterBottom>{user.address}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shop Details
            </Typography>
            <Typography gutterBottom>{shopData.name}</Typography>
            <Typography gutterBottom>{shopData.email}</Typography>
            <Typography gutterBottom>{shopData.phoneNumber}</Typography>
            <Typography gutterBottom>{shopData.address}</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Review);
