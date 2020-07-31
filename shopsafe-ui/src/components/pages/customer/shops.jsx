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
    };

    formData = {
        distance: [
            { value: 1, label: "1 km" },
            { value: 2, label: "2 km" },
            { value: 5, label: "5 km" },
            { value: 10, label: "10 km" },
        ],
    };

    async componentDidMount() {
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
            if (ex.response)
                this.setState({
                    message: ex.response.data ? ex.response.data.message : "An Error Occured",
                });
            else this.setState({ message: "An Error Occured" });
            console.log(ex.response);
        }
        this.setState({ isLoading: false });
    }

    handleChange = (event, newValue) => {
        const distance = newValue;
        this.setState({ distance });
        this.updateShopList();
    };

    handleAddress = () => {
        this.updateShopList();
    }

    render() {
        const { classes } = this.props;
        const { distance } = this.state;
        console.log(this.state);
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
                            <FilterCard />
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
                            <CurrentLocation handleAddress={this.handleAddress}/>
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
                                {this.state.shopData.map((data, i) => (
                                    <GridListTile
                                        key={i}
                                        cols={window.innerWidth < 500 ? 2 : 1}
                                    >
                                        <Shop
                                            data={data}
                                            userAddress={this.state.userAddress}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Shops);
