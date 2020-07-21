import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Chip from "@material-ui/core/Chip";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    //padding: 10,
    marginLeft: 8,
    marginTop: 10,
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    display: "flex",
    flexDirection: "row",
    // marginBottom:20,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  bim: {
    //height: 'auto',
    //backgroundImage: `url(${"https://picsum.photos/355"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    //width:"100%",
    // borderRadius:15,
    // padding:10,
    //width: `calc(100vw + 48px)`,
    //margin: -24,
    //padding: 24,
  },
});

class Shop extends Component {
  state = {
    imWidth: "90%",
    
  };

  handleClick = () => {
    this.props.history.push(`/customer/booknewslot/${this.props.data.uid}`);
    console.log("Loved");
  };

  openedNow = () => {
    let d = new Date();
    let currentOffset = d.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(d.getTime() + (ISTOffset + currentOffset) * 60000);
    const openingTime = new Date();
    const closingTime = new Date();
    const { openingHour, openingMinute, closingHour, closingMinute } = this.props.data;
    openingTime.setHours(openingHour); openingTime.setMinutes(openingMinute);
    closingTime.setHours(closingHour); closingTime.setMinutes(closingTime);

    // return (
    //   ISTTime.getTime() > openingTime.getTime() &&
    //   ISTTime.getTime() < closingTime.getTime()
    // );
    return (
      ISTTime.getHours() >= openingHour && ISTTime.getHours() <= closingHour
    );
  }

  time = (t) => {
    let d = new Date();
    d.setHours(t.hour);
    d.setMinutes(t.minute);
    d.setSeconds(0);
    return d.toLocaleTimeString();
  };

  render() {
    this.state.imWidth = window.innerWidth < 800 ? "100%" : "90%";
    console.log(this.state.imWidth, window.screen.width);
    const { classes, theme } = this.props;
    const {
      shopName: name,
      address,
      imageUrl,
      discount,
      openingTimeIST,
      closingTimeIST,
      tags: itemsAvailable,
      shopRating: ratings,
      //payment_modes,
    } = this.props.data;
    const imgUrl = imageUrl || "https://picsum.photos/" + Math.round(Math.random(0, 1) * 1000);
    //const { openingTime, closingTime } = shopSchedule;
    return (
      <Box
        className={classes.root}
        boxShadow={5}
        //border={0.5}
        borderRadius="borderRadius"
        borderRadius={10}
        borderColor="primary.main"
      >
        <Box className={classes.cover}>
          <Grid container spacing={2} xs={12} justify="center">
            <Grid item xs={12} sm={4} justify="center">
              <Box
                className={classes.bim}
                boxShadow={5}
                style={{
                  height: "200px",
                  width: `${this.state.imWidth}`,
                  borderRadius: 15,
                  padding: 10,
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                  backgroundImage: `url(${imgUrl})`,
                }}
              >
                <Chip
                  label={(this.openedNow())?"Open":"Closed"}
                  style={{
                    background: "#ffd79f",
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "black",
                  }}
                ></Chip>
              </Box>
              <Typography
                variant="body1"
                align="center"
                gutterBottom
                style={{ paddingLeft: 10, margin: "auto" }}
              >
                <FiberManualRecordIcon
                  style={{ color: "green", fontSize: 13, marginRight: 5 }}
                />
                {openingTimeIST}
                <FiberManualRecordIcon style={{ color: "red", fontSize: 13 }} />
                {closingTimeIST}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box className={classes.details}>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{ color: "indigo" }}
                >
                  <b>{name}</b>
                </Typography>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={ratings[0]}
                    precision={0.5}
                    readOnly
                    size="small"
                    style={{ color: "red", padding: 5 }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ paddingTop: 3 }}
                  >
                    {ratings[0]} ({ratings[1]} reviews)
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {address}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Box style={{ display: "flex", flexDirection: "row" }}>
                    <LocationOnIcon />
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: 3, marginLeft: 5 }}
                    >
                      {"3 km"}
                    </Typography>
                  </Box>
                  {true && (
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                      <PaymentIcon style={{ color: "#00b300" }} />
                      <Typography
                        variant="body1"
                        style={{ paddingBottom: 3, marginLeft: 5 }}
                      >
                        Accepts Cash and Online Payments
                      </Typography>
                    </Box>
                  )}
                </Typography>
                <Box style={{ display: "flex", flexDirection: "row" }}>
                  <LocalOfferIcon style={{ color: "#ff0f39" }} />
                  <Typography
                    variant="body1"
                    style={{
                      paddingBottom: 3,
                      color: "#ff375a",
                      marginLeft: 5,
                    }}
                  >
                    {discount}% off on all On-Time orders
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          style={{ padding: 10, display: "flex", flexDirection: "row" }}
        >
          <Grid
            xs={12}
            xl={4}
            md={4}
            lg={4}
            item
            justify="center"
            alignItems="center"
            direction="column"
          >
            {itemsAvailable.map((label, index) => (
              <Chip
                key={index}
                label={label}
                style={{ margin: 2 }}
                clickable
                color={index % 2 === 0 ? "primary" : "secondary"}
                variant="outlined"
              />
            ))}
          </Grid>
          <Grid
            xs={12}
            xl={8}
            md={8}
            lg={8}
            item
            justify="center"
            alignItems="stretch"
            direction="column"
          >
            <Box>
              <Button
                style={{ color: "red", margin: 2 }}
                variant="outlined"
                color="secondary"
                startIcon={<FavoriteIcon />}
              >
                {" "}
                mark Favourite
              </Button>
              <Button
                variant="outlined"
                onClick={this.handleClick}
                style={{ color: "green", margin: 2 }}
                endIcon={<ArrowForwardIosIcon style={{ paddingBottom: 1 }} />}
              >
                Book Slot
              </Button>
            </Box>
          </Grid>
        </Grid>
        <br />
      </Box>
    );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Shop));
