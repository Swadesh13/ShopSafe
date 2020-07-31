import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Button } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DirectionsIcon from "@material-ui/icons/Directions";
import { withStyles } from "@material-ui/core/styles";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";
import http from "../../../../services/httpServices";

const useStyles = (theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
});

class CurrentLocation extends Component {
    state = {
        location: "",
        coordinate: {},
        openDialogue: false,
    };

    componentDidMount() {
        //navigator.geolocation.getCurrentPosition(this.showPosition);
        if (!localStorage.getItem("userAddress"))
            this.setState({
                openDialogue: true,
            });
        else this.setState({ location: localStorage.getItem("userAddress") });
    }

    // showPosition = (position) => {
    //     const location =
    //         "Latitude: " +
    //         position.coords.latitude +
    //         " Longitude: " +
    //         position.coords.longitude;
    //     const coordinate = {};
    //     coordinate.latitude = position.coords.latitude;
    //     coordinate.longitude = position.coords.longitude;
    //     this.setState({ location, coordinate });
    //     console.log("coordinate set");
    // };

    handleClick = () => {
        this.setState({ openDialogue: true });
        // try {
        //     const response = await http.get(
        //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.coordinate.latitude},${this.state.coordinate.longitude}&key=AIzaSyBixtvcF5A38Z2dVP9fFkcvLf5P59RmnEA`,
        //     );
        //     console.log(response);
        // } catch (ex) {
        //     console.log(ex.response);
        // }
    };

    updateLocation = (addr) => {
        console.log(addr.description);
        this.setState({ location: addr.description, openDialogue: false });
        localStorage.setItem("userAddress", addr.description);
        this.props.handleAddress();
    };

    handleClose = () => {
        this.setState({ openDialogue: false });
    };

    render() {
        const { openDialogue } = this.state;
        const { handleClose, handleClick } = this;
        const { classes } = this.props;
        return (
            <Box
                borderRadius={10}
                style={{
                    width: "100%",
                    backgroundColor: "#00583a",
                    color: "white",
                }}
                m={1}
                p={1}
                onClick={this.getLocation}
            >
                <Grid container direction="row" xs xl lg>
                    <Grid item xs={8}>
                        <Typography variant="body1">
                            <LocationOnIcon />
                            Near <b>{this.state.location}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                        <Button
                            variant="outlined"
                            style={{backgroundColor:'white'}}
                            onClick={handleClick}
                        >
                            Change
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={openDialogue} onClose={handleClose}>
                    <DialogContent
                        style={{
                            backgroundColor: "#ffe7ef",
                            height: "300px",
                            width: window.innerWidth < 600 ? "340px" : "600px",
                        }}
                    >
                        <Paper component="form" className={classes.root}>
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                            <GooglePlacesAutocomplete
                                onSelect={this.updateLocation}
                            />
                            <Divider
                                className={classes.divider}
                                orientation="vertical"
                            />
                            <IconButton
                                color="primary"
                                className={classes.iconButton}
                                aria-label="directions"
                            >
                                <DirectionsIcon />
                            </IconButton>
                        </Paper>
                    </DialogContent>
                </Dialog>
            </Box>
        );
    }
}

export default withStyles(useStyles)(CurrentLocation);
