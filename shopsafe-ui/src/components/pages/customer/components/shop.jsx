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
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import IconButton from "@material-ui/core/IconButton";
import StarRateOutlinedIcon from "@material-ui/icons/StarRateOutlined";

const useStyles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        width: "100%",
        //width: window.innerWidth<500 ? (window.innerWidth*0.96) : 600,
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
        flexDirection: "column",
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
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
});

class Shop extends Component {
    state = {
        imWidth: "90%",
    };

    handleClick = () => {
        //this.props.history.push(`/customer/shop/`);
        this.props.history.push(`/customer/shop/${this.props.data.shopId}`);
        console.log("Loved");
    };

    openedNow = () => {
        let d = new Date();
        let currentOffset = d.getTimezoneOffset();
        let ISTOffset = 330;
        let ISTTime = new Date(
            d.getTime() + (ISTOffset + currentOffset) * 60000
        );
        const openingTime = new Date();
        const closingTime = new Date();
        const {
            openingHour,
            openingMinute,
            closingHour,
            closingMinute,
        } = this.props.data;
        openingTime.setHours(openingHour);
        openingTime.setMinutes(openingMinute);
        closingTime.setHours(closingHour);
        closingTime.setMinutes(closingTime);

        const currentTime =
            ISTTime.getHours() * 3600 + ISTTime.getMinutes() * 60;

        return (
            currentTime >= openingHour * 3600 + openingMinute * 60 &&
            currentTime <= closingHour * 3600 + closingMinute * 60
        );
    };

    time = (t) => {
        let d = new Date();
        d.setHours(t.hour);
        d.setMinutes(t.minute);
        d.setSeconds(0);
        return d.toLocaleTimeString();
    };

    render() {
        this.state.imWidth = window.innerWidth < 800 ? "90%" : "100%";
        const { classes, theme } = this.props;
        const {
            shopName: name,
            address,
            imageUrl,
            discount,
            distancemetric,
            openingTimeIST,
            closingTimeIST,
            tags: itemsAvailable,
            shopRating: ratings,
            payment_modes,
            travelDuration,
        } = this.props.data;
        const distance = distancemetric || -1;
        
        return (
            <Grid item>
                <Box
                    className={classes.root}
                    boxShadow={8}
                    style={{ width: "95%" }}
                    borderRadius="borderRadius"
                    borderRadius={15}
                    borderColor="primary.main"
                    m={2}
                >
                    <Box className={classes.cover}>
                        <Grid item container xs={12} direction="column">
                            <Grid
                                container
                                spacing={2}
                                xs={12}
                                justify="center"
                            >
                                <Grid item xs={12} sm={5} justify="center">
                                    <Box
                                        className={classes.bim}
                                        boxShadow={5}
                                        style={{
                                            backg: 0.5,
                                            height: "200px",
                                            width: `${this.state.imWidth}`,
                                            borderRadius: 15,
                                            padding: 10,
                                            marginTop: 10,
                                            marginLeft: 10,
                                            marginBottom: 10,
                                            backgroundImage: `url(${imageUrl})`,
                                        }}
                                    >
                                        <Chip
                                            label={
                                                this.openedNow()
                                                    ? "Open"
                                                    : "Closed"
                                            }
                                            style={{
                                                background: this.openedNow()
                                                    ? "#00b476"
                                                    : "#ef0052",
                                                fontSize: 17,
                                                fontWeight: "bold",
                                                color: "white",
                                            }}
                                        ></Chip>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        gutterBottom
                                        style={{
                                            paddingLeft: 10,
                                            margin: "auto",
                                        }}
                                    >
                                        <FiberManualRecordIcon
                                            style={{
                                                color: "green",
                                                fontSize: 13,
                                                marginRight: 5,
                                            }}
                                        />
                                        {openingTimeIST}
                                        <FiberManualRecordIcon
                                            style={{
                                                color: "red",
                                                fontSize: 13,
                                                marginLeft: 10,
                                            }}
                                        />
                                        {closingTimeIST}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <Box className={classes.details}>
                                        <Typography
                                            component="h4"
                                            variant="h4"
                                            style={{ color: "indigo" }}
                                        >
                                            <b>{name}</b>
                                        </Typography>
                                        {this.openedNow() || (
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                            >
                                                Opens next at {openingTimeIST}
                                            </Typography>
                                        )}
                                        <br />
                                        <Box
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Chip
                                                icon={
                                                    <StarRateOutlinedIcon
                                                        style={{
                                                            color: "#ffffff",
                                                        }}
                                                    />
                                                }
                                                label={ratings[0]}
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#58AC00",
                                                    margin: 2,
                                                    fontSize: 18,
                                                    color: "white",
                                                }}
                                            />
                                        </Box>
                                        <br />
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <LocationOnIcon />
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        paddingBottom: 3,
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                    }}
                                                >
                                                    {`${distance} km`}
                                                </Typography>
                                                <DirectionsBikeIcon />
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        paddingBottom: 3,
                                                        marginLeft: 5,
                                                    }}
                                                >
                                                    {travelDuration <= 3600
                                                        ? `${Math.round(
                                                              travelDuration /
                                                                  60
                                                          )} Min`
                                                        : `${
                                                              travelDuration /
                                                              3600
                                                          } Hour`}
                                                </Typography>
                                            </Box>
                                            {true && (
                                                <Box
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <PaymentIcon
                                                        style={{
                                                            color: "#00b300",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body1"
                                                        style={{
                                                            paddingBottom: 3,
                                                            marginLeft: 5,
                                                        }}
                                                    >
                                                        Accepts{" "}
                                                        {payment_modes.join()}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <br />
                            <Divider />
                            <Grid item container xs={12} direction="row">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    xs={7}
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Box
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <LocalOfferIcon
                                            style={{ color: "#f445a6" }}
                                        />
                                        <Typography
                                            variant="body1"
                                            style={{
                                                paddingBottom: 3,
                                                color: "#f445a6",
                                                marginLeft: 5,
                                            }}
                                        >
                                            {discount}% off on all On-Time
                                            orders
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={5}
                                    direction="row"
                                    justify="flex-end"
                                >
                                    <IconButton
                                        style={{ color: "red", margin: 2 }}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                    <Button
                                        variant="contained"
                                        onClick={this.handleClick}
                                        style={{
                                            backgroundColor: "green",
                                            color: "white",
                                            margin: 2,
                                            fontSize: 17,
                                        }}
                                        endIcon={
                                            <ArrowForwardIosIcon
                                                style={{ paddingBottom: 1 }}
                                            />
                                        }
                                    >
                                        <b>Book Slot</b>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        );
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Shop));
