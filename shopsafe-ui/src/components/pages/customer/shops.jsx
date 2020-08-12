import React, { Component } from "react";
import Shop from "./components/shop";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getShopList } from "../../../services/dataServices";
import GridList from "@material-ui/core/GridList";
import Slider from "@material-ui/core/Slider";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { updateRadius } from "../../../services/userService";
import CurrentLocation from "./shopPage/getLocation";
import GridListTile from "@material-ui/core/GridListTile";
import FilterCard from "./components/filter";
import filter from "./components/filter";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
});

class Shops extends Component {
    state = {
        shopData: [],
        distance: 3,
        isLoading: false,
        message: "An Error Occured",
        filter: {
            openClose: { showAll: true, isOpen: false },
            items: [],
            slotTypes: { Morning: true, Afternoon: true, Evening: true },
            customerRatings: { "4": false, "3": false },
        },
    };

    formData = {
        distance: [
            { value: 1, label: "1 km" },
            { value: 2, label: "2 km" },
            { value: 5, label: "5 km" },
            { value: 10, label: "10 km" },
        ],
    };

    componentDidMount() {
        this.updateShopList();
    }

    updateShopList = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await getShopList(this.state.distance);
            console.log(response);
            if (response.data)
                this.setState({ shopData: response.data, message: "" });
            else this.setState({ message: "No Shop Found" });
        } catch (ex) {
            if (ex.response) {
                if (ex.response.status == 403)
                    this.setState({ message: ex.response.data.message });
                else
                    this.setState({
                        message: ex.response.data
                            ? ex.response.data.message
                            : "An Error Occured",
                    });
            } else this.setState({ message: "An Error Occured" });
            console.log(ex.response);
        }
        this.setState({ isLoading: false });
    };

    updateFilter = (filter) => {
        this.setState({ filter });
    };

    //     customerRatings:
    // 3: false
    // 4: false
    // __proto__: Object
    // items: []
    // openClose:
    // isOpen: false
    // showAll: true
    // __proto__: Object
    // slotTypes:
    // Afternoon: true
    // Evening: true
    // Morning: true

    filterList = () => {
        const filter = this.state.filter;
        let list = [];
        const shopList = this.state.shopData;

        //Rating based filter
        if (filter.customerRatings["3"])
            list = shopList.filter((c) => c.shopRating[0] >= 3);
        else if (filter.customerRatings["4"])
            list = shopList.filter((c) => c.shopRating[0] >= 4);
        else list = shopList;

        //Open-Close based
        const openedNow = (data) => {
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
            } = data;
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
        if (!filter.openClose.showAll) list = list.filter((c) => openedNow(c));

        //Period Based
        let newList = [];
        if (filter.slotTypes.Morning)
            newList = list.filter((c) => c.openingHour < 12);
        // else newList = list.filter((c) => c.openingHour >= 12);
        if (filter.slotTypes.Afternoon)
            newList = newList.concat(
                list
                    .filter((c) => c.openingHour < 18 && c.closingHour >= 12)
                    .filter((c) => !newList.includes(c))
            );
        if (filter.slotTypes.Evening)
            newList = newList.concat(
                list
                    .filter((c) => c.closingHour > 18)
                    .filter((c) => !newList.includes(c))
            );

        return newList;
    };

    getItemList = (shopList) => {};

    handleChange = (event, newValue) => {
        const distance = newValue;
        this.setState({ distance });
        this.updateShopList();
    };

    handleAddress = () => {
        this.updateShopList();
    };

    render() {
        const shopList = this.filterList();
        const { classes } = this.props;
        const { distance } = this.state;
        console.log("render called");
        return (
            // <Shop/>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid
                        container
                        sm={3}
                        md={3}
                        lg={3}
                        spacing={1}
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item style={{ width: "100%" }}>
                            <Box
                                boxShadow={5}
                                style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                    marginTop: 23,
                                }}
                                p={2}
                                borderRadius={5}
                            >
                                <Typography variant="body1">
                                    Choose Your Radius(in Km)..
                                </Typography>
                                <Slider
                                    value={distance}
                                    aria-labelledby="discrete-slider-always"
                                    step={1}
                                    onChange={this.handleChange}
                                    min={1}
                                    max={5}
                                    marks
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                            style={{ width: "100%" }}
                        >
                            <FilterCard updateFilter={this.updateFilter} />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        sm={8}
                        md={8}
                        lg={8}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{ width: "100%" }}
                    >
                        <Grid container xs={12} direction="row">
                            <CurrentLocation
                                handleAddress={this.handleAddress}
                            />
                        </Grid>
                        {this.state.isLoading ? (
                            <Grid
                                container
                                spacing={5}
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                style={{ marginTop: 20 }}
                            >
                                <CircularProgress color="secondary" />
                            </Grid>
                        ) : this.state.message ? (
                            <Typography variant="body1" align="center">
                                {this.state.message}
                            </Typography>
                        ) : (
                            <GridList
                                cellHeight="auto"
                                cols={2}
                                spacing={10}
                                style={{ width: "100%" }}
                            >
                                {shopList.length == 0 ? (
                                    <Grid container xs={12} justify="center" direction="row">
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                align="center"
                                            >
                                                No Shop Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    shopList.map((data, i) => (
                                        <GridListTile
                                            key={i}
                                            cols={
                                                window.innerWidth < 500 ? 2 : 1
                                            }
                                        >
                                            <Shop
                                                data={data}
                                                userAddress={
                                                    this.state.userAddress
                                                }
                                            />
                                        </GridListTile>
                                    ))
                                )}
                            </GridList>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Shops);
