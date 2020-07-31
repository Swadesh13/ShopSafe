import React, { Component } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { userDetails } from "../../../services/userService";
import CircularProgress from "@material-ui/core/CircularProgress";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";



const useStyles = (theme) => ({
    largeAvatar: {
        width: theme.spacing(35),
        height: theme.spacing(35),
        margin: "auto",
    },
});
class MyProfile extends Component {
    state = {
        userData: {},
        isLoading: false,
        edit: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await userDetails();
            this.setState({ userData: response.data.userCredentials });
            console.log(response);
        } catch (ex) {
            console.log(ex.response);
        }
        this.setState({ isLoading: false });
    }

    getTime = (t) => {
        const d = new Date(t);
        return d.toDateString();
    };

    handleClick = () => {
        this.setState({ edit: true });
    };

    handleClose = () => {
        this.setState({ edit: false });
    };

    // address: "undefined, Durgapur, West Bengal [WB], India";
    // createdAt: "2020-07-17T06:34:53.036Z";
    // email: "skshahnawaz2909@gmail.com";
    // firstName: "Sk";
    // gender: "Male";
    // imageUrl: "https://picsum.photos/200";
    // lastName: "Shahnawaz";
    // phoneNumber: "6297939928";
    // userId: "iS3rFzmTr6MPbySvMjaiBlR8MDO2";

    render() {
        const { classes } = this.props;
        const { userData } = this.state;
        return (
            <Grid container justify="center" spacing={5}>
                {this.state.isLoading ? (
                    <Grid item style={{ marginTop: 20 }}>
                        <CircularProgress color="secondary" />
                    </Grid>
                ) : (
                    <React.Fragment>
                        {" "}
                        <Grid item xs={12}>
                            <div style={{ padding: 10 }}>
                                <Avatar
                                    src={
                                        userData.imageUrl ||
                                        "https://picsum.photos/500/500"
                                    }
                                    className={classes.largeAvatar}
                                />
                                <br />
                                <Typography
                                    variant="h3"
                                    component="h3"
                                    align="center"
                                >
                                    {userData.firstName +
                                        " " +
                                        userData.lastName}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography variant="h6" align="center">
                                {userData.address}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            justify="center"
                            xs={8}
                            direction="row"
                        >
                            <Grid
                                item
                                sm={4}
                                md={4}
                                lg={4}
                                xl={4}
                                container
                                alignItems="center"
                                direction="column"
                            >
                                <Grid item>
                                    <EmailIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" align="center">
                                        {userData.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                sm={4}
                                md={4}
                                lg={4}
                                xl={4}
                                container
                                alignItems="center"
                                direction="column"
                            >
                                <Grid item>
                                    <PhoneIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" align="center">
                                        {userData.phoneNumber}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            container
                            spacing={3}
                            alignItems="center"
                            direction="column"
                        >
                            <Grid item>
                                <Button
                                    onClick={this.handleClick}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                >
                                    Member since{" "}
                                    {this.getTime(userData.createdAt)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <EditForm
                            open={this.state.edit}
                                handleClose={this.handleClose}
                                data={userData}
                        />
                    </React.Fragment>
                )}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(MyProfile);

class EditForm extends Component {
    state = {
        data: {
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            phoneNumber: this.props.data.phoneNumber,
            address: this.props.data.address,
        },
    };

    handleChange = ({ currentTarget: input }) => {
        let data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    };

    handleSelect = ({ target: { name, value } }) => {
        let data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registered", this.state);
        this.props.handleClose();
    };

    updateLocation = (addr) => {
        let data = { ...this.state.data };
        data["address"] = addr.description;
        this.setState({ data });
        localStorage.setItem("userAddress", addr.description);
    };

    render() {
        const { handleClose, open } = this.props;
        const { data } = this.state;
        return (
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <Box m={2}>
                    <form
                        style={{ width: "100%", marginTop: 5 }}
                        noValidate
                        onSubmit={this.handleSubmit}
                    >
                        <Grid container spacing={2}>
                            <Box
                                borderColor="primary.main"
                                border={1}
                                borderRadius="borderRadius"
                                m={1}
                                p={2}
                                style={{ width: "100%" }}
                            >
                                <Typography variant="caption" display="block">
                                    Name and Contact Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            value={data.firstName}
                                            variant="filled"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="filled"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            value={data.lastName}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            variant="filled"
                                            required
                                            fullWidth
                                            value={data.phoneNumber}
                                            id="phoneNumber"
                                            label="Contact Number"
                                            name="phoneNumber"
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                borderColor="primary.main"
                                border={1}
                                borderRadius="borderRadius"
                                m={1}
                                p={2}
                                style={{ width: "100%" }}
                            >
                                <Typography variant="caption" display="block">
                                    Address
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            component="form"
                                            style={{
                                                padding: "2px 4px",
                                                display: "flex",
                                                alignItems: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <IconButton
                                                type="submit"
                                                style={{ padding: 5 }}
                                                aria-label="search"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                            <GooglePlacesAutocomplete
                                                onSelect={this.updateLocation}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 15 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Dialog>
        );
    }
}
