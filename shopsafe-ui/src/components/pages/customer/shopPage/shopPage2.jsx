import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

import BallotOutlinedIcon from "@material-ui/icons/BallotOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import DirectionsIcon from "@material-ui/icons/Directions";
import ShareIcon from "@material-ui/icons/Share";

import Address from "./Adress";
import Overview from "./Overview";
import Order from "./Order";
import Image from "./Image";
import Review from "./Reviews";
import GiveReview from "./giveReview";
import { getShopDetails } from "../../../../services/dataServices";

const useStyles = (theme) => ({
    chip: {
        margin: 2,
    },
    toolbarSecondary: {
        justifyContent: "space-between",
        overflowX: "auto",
    },
    toolbarLink: {
        padding: theme.spacing(1),
        margin: 5,
        flexShrink: 0,
        fontSize: 12,
        cursor: "pointer",
    },
});

const tabs = [
    { title: "Overview", value: 0, icon: <DashboardOutlinedIcon /> },
    { title: "Book Slot", value: 1, icon: <AddBoxOutlinedIcon /> },
    { title: "Reviews", value: 2, icon: <BallotOutlinedIcon /> },
    { title: "Photos", value: 3, icon: <PhotoLibraryOutlinedIcon /> },
];

class ShopPage extends Component {
    state = {
        data: {},
        tabPageNumber: 1,
        isLoading: true,
        address: "",
    };

    async componentDidMount() {
        const id = this.props.match.params.shopId;
        this.setState({ isLoading: true });
        try {
            const { data } = await getShopDetails(id);
            console.log("cmd2");
            console.log("Fetched Data", data);
            this.setState({ data: data[0], isLoading: false });
        } catch (ex) {
            console.log(ex);
        }
    }

    getTabPage = (id, data) => {
        const tabPage = [
            <Overview />,
            <Order data={data} />,
            <Review id={data.shopId} />,
            <Image />,
        ];
        return tabPage[id];
    };

    handleTabs = (event, tabPageNumber) => {
        this.setState({ tabPageNumber });
    };

    handleDirection = () => {
        const userAddress = localStorage
            .getItem("userAddress")
            .split(" ")
            .join("%20");
        const destination = this.state.data.address.split(" ").join("%20");

        window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${userAddress}&destination=${destination}`,
            "_blank"
        );
    };

    render() {
        console.log(this.state, this.props.userAddress);
        const { classes } = this.props;
        const {
            imgUrl,
            tags,
            payment_modes,
            shopRating: rating,
            address,
            phoneNumber,
            ownerName,
            shopId,
            shopName,
            discount,
            openingTimeIST,
            closingTimeIST,
            openingHour,
            openingMinute,
            closingHour,
            closingMinute,
        } = this.state.data;
        const imageUrl =
            imgUrl ||
            "https://picsum.photos/3000/" +
                Math.round(Math.random(0, 1) * 200 + 500);

        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">
                    <main>
                        <Box boxShadow={0} p={2} style={{ width: "100%" }}>
                            {this.state.isLoading ? (
                                <Grid
                                    container
                                    direction="row"
                                    xs
                                    xl
                                    lg
                                    justify="center"
                                    style={{ marginTop: 20 }}
                                >
                                    <CircularProgress color="secondary" />
                                </Grid>
                            ) : (
                                <Grid
                                    container
                                    direction="column"
                                    spacing={5}
                                    lg
                                    sm
                                    md
                                    xs
                                >
                                    <Grid item>
                                        <Box
                                            borderRadius={16}
                                            boxShadow={3}
                                            style={{
                                                backgroundImage: `url(${imageUrl})`,
                                                height: 450,
                                                backgroundSize: "cover",
                                            }}
                                        ></Box>
                                    </Grid>
                                    <Grid
                                        container
                                        item
                                        direction="row"
                                        lg={12}
                                        sm={12}
                                        md={12}
                                        xl={12}
                                    >
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            sm={8}
                                            lg={8}
                                            md={8}
                                            xl={8}
                                            justify="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Grid item>
                                                <Typography
                                                    variant="h4"
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <b>{shopName}</b>
                                                </Typography>
                                                <Typography variant="body1">
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
                                                        }}
                                                    />
                                                    {closingTimeIST}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                style={{
                                                    marginTop: 20,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                {tags.map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                        color="primary"
                                                        variant="outlined"
                                                        className={classes.chip}
                                                    />
                                                ))}
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            container
                                            sm={4}
                                            lg={4}
                                            xl={4}
                                            justify="flex-Start"
                                            alignItems="flex-end"
                                            direction="column"
                                        > 
                                            <Grid
                                                item
                                                container
                                                direction="row"
                                                justify="flex-end"
                                                style={{ marginBottom: 10 }}
                                            >
                                                <Rating
                                                    name="ratings"
                                                    defaultValue={rating[0]}
                                                    precision={0.1}
                                                    readOnly
                                                    style={{
                                                        fontSize: 40,
                                                        color: "red",
                                                    }}
                                                />
                                                <Typography
                                                    variant="h5"
                                                    style={{
                                                        marginTop: 5,
                                                        marginLeft: 5,
                                                    }}
                                                >
                                                    <b>{rating[0]}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                container
                                                direction="row"
                                                justify="flex-end"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                <Typography variant="body1">
                                                    {rating[1] + " "}
                                                    reviews
                                                </Typography>
                                            </Grid>
                                            <br />
                                            <Grid
                                                item
                                                container
                                                direction="row"
                                                justify="flex-end"
                                                spacing={5}
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    style={{ margin: 5 }}
                                                    color="secondary"
                                                    onClick={
                                                        this.handleDirection
                                                    }
                                                    startIcon={
                                                        <DirectionsIcon />
                                                    }
                                                >
                                                    direction
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    style={{ margin: 5 }}
                                                    color="secondary"
                                                    startIcon={<ShareIcon />}
                                                >
                                                    share
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <br />
                                    <Divider />
                                    <Grid
                                        container
                                        item
                                        direction="row"
                                        lg={12}
                                        sm={12}
                                        md={12}
                                        xl={12}
                                        spacing={10}
                                    >
                                        <Grid
                                            item
                                            container
                                            sm={4}
                                            lg={4}
                                            xl={4}
                                            spacing={2}
                                            alignItems="center"
                                            justify="flex-start"
                                            direction="column"
                                        >
                                            <Grid item>
                                                <Address
                                                    data={{
                                                        address,
                                                        phoneNumber,
                                                        ownerName,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                style={{ width: "100%" }}
                                            >
                                                <GiveReview />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            container
                                            sm={8}
                                            lg={8}
                                            xl={8}
                                            justify="flex-start"
                                            direction="column"
                                        >
                                            <Grid item>
                                                <Tabs
                                                    value={
                                                        this.state.tabPageNumber
                                                    }
                                                    onChange={this.handleTabs}
                                                    variant="scrollable"
                                                    scrollButtons="auto"
                                                    indicatorColor="secondary"
                                                    textColor="secondary"
                                                    aria-label="icon label tabs example"
                                                >
                                                    {tabs.map((tab) => (
                                                        <Tab
                                                            color="inherit"
                                                            noWrap
                                                            icon={tab.icon}
                                                            label={tab.title}
                                                            key={tab.title}
                                                            variant="body2"
                                                            className={
                                                                classes.toolbarLink
                                                            }
                                                        />
                                                    ))}
                                                </Tabs>
                                            </Grid>
                                            <Grid>
                                                {this.getTabPage(
                                                    this.state.tabPageNumber,
                                                    this.state.data
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </main>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(ShopPage);
