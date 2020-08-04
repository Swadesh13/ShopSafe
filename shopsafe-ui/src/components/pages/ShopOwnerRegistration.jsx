import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getStateName, getStateWiseCity } from "../../utils/auth";
import { ShopRegister } from "../../services/userService";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderStyles: "solid",
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
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

class ShopOwnerRegistration extends Component {
    state = {
        data: {
            firstName: "",
            lastName: "",
            shopName: "",
            email: "",
            phoneNumber: "",
            address:"",
            password: "",
            confirmPassword: "",
            openingHour: 0,
            openingMinute: 0,
            closingHour: 0,
            closingMinute: 0,
            tags: [],
            bookingTimeUnit: "",
            maxConcurrent: 0,
            payment_modes: [],
            discount: 0,
        },
        error: {},
    };

    formData = {
        states: getStateName(),
        cityList: getStateWiseCity(this.state.stateName),
    };

    handleChange = ({ currentTarget: input }) => {
        let data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    };

    handleNumberChange = ({ currentTarget: input }) => {
        let data = { ...this.state.data };
        data[input.name] = parseInt(input.value);
        this.setState({ data });
    };

    handleSelect = ({ target: { name, value } }) => {
        let data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    };

    updateLocation = (addr) => {
        let data = { ...this.state.data };
        data["address"] = addr.description;
        this.setState({ data });
        localStorage.setItem("userAddress", addr.description);
    };

    handleMultipleSelect = (event) => {};

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Registered", this.state);

        try {
            const response = await ShopRegister(this.state.data);
            console.log(response);
            alert(
                "SignedUp Successfully. Check your email to verify and Signin ."
            );
            window.location = "/";
        } catch (ex) {
            if (ex.response) {
                if (ex.response.status == 500) {
                    alert(ex.response.data);
                } else {
                    const error = { ...ex.response.data };
                    this.setState({ error });
                }
                console.log("error", ex.response);
            }
        }
    };

    // handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log("Registered", this.state);
    //   this.props.onSuccess("/shopowner");
    //   this.props.auth("shopOwnerLogged");
    // };

    handleHidden = () => {
        return this.props.tabValue !== this.props.index;
    };

    handleSignin = () => {
        this.props.onSuccess();
    };

    render() {
        console.log(this.state.data);

        const { classes } = this.props;
        const { error } = this.state;
        return (
            <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
                hidden={this.props.tabValue !== this.props.index}
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
                        <TextField
                            name="shopName"
                            variant="filled"
                            required
                            fullWidth
                            id="shopName"
                            label="Shop Name"
                            autoFocus
                            error={error && error.shopName}
                            helperText={error && error.shopName}
                            onChange={this.handleChange}
                        />
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
                            Name and Contact Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    variant="filled"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={error && error.ownerName}
                                    helperText={error && error.ownerName}
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
                                    onChange={this.handleChange}
                                    error={error && error.ownerName}
                                    helperText={error && error.ownerName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email"
                                    variant="filled"
                                    type="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Complete Email Address"
                                    onChange={this.handleChange}
                                    error={error && error.email}
                                    helperText={error && error.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="filled"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Contact Number"
                                    name="phoneNumber"
                                    onChange={this.handleChange}
                                    error={error && error.phoneNumber}
                                    helperText={error && error.phoneNumber}
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
                                    className={classes.root}
                                >
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
                                </Paper>
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
                            Opening Time And Closing Time(Please use 24Hr
                            format)
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    name="openingHour"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 24,
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="openingHour"
                                    label="Opening Hour"
                                    error={error && error.openingHour}
                                    helperText={error && error.openingHour}
                                    onChange={this.handleNumberChange}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    name="openingMinute"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 60,
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="openingMinute"
                                    label="Opening Minute"
                                    error={error && error.openingMinute}
                                    helperText={error && error.openingMinute}
                                    onChange={this.handleNumberChange}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    name="closingHour"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 24,
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="closingHour"
                                    label="Closing Hour"
                                    error={error && error.closingHour}
                                    helperText={error && error.closingHour}
                                    onChange={this.handleNumberChange}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    name="closingMinute"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 60,
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="closingMinute"
                                    label="Cloosing Minute"
                                    error={error && error.closingMinute}
                                    helperText={error && error.closingMinute}
                                    onChange={this.handleNumberChange}
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
                            Discount And Times given to Customer per each Item
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="bookingTimeUnit"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="bookingTimeUnit"
                                    label="Average Times given for Five items(In Minutes)"
                                    error={error && error.bookingTimeUnit}
                                    helperText={error && error.bookingTimeUnit}
                                    onChange={this.handleNumberChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="discount"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="discount"
                                    label="Discount"
                                    error={error && error.discount}
                                    helperText={error && error.discount}
                                    onChange={this.handleNumberChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="maxConcurrent"
                                    variant="filled"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    fullWidth
                                    id="maxConcurrent"
                                    label="Max Customer Accomodetion"
                                    error={error && error.maxConcurrent}
                                    helperText={error && error.maxConcurrent}
                                    onChange={this.handleNumberChange}
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
                            Items Type And Payments Method Avaialable
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <MultipleSelect
                                    selectedItems={
                                        this.state.data.payment_modes
                                    }
                                    handleChange={this.handleSelect}
                                    classes={classes}
                                    name="payment_modes"
                                    label="Accepted Payment Modes"
                                    theme={this.props.theme}
                                    items={[
                                        "Cards",
                                        "Cash",
                                        "Gpay",
                                        "Digital Wallets",
                                        "UPI",
                                        "Other Methods",
                                    ]}
                                />
                                <Typography
                                    variant="caption"
                                    display="block"
                                    style={{ color: "red" }}
                                >
                                    {error && error.payment_modes}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <MultipleSelect
                                    selectedItems={this.state.data.tags}
                                    handleChange={this.handleSelect}
                                    classes={classes}
                                    name="tags"
                                    label="Type of Items Available"
                                    theme={this.props.theme}
                                    items={[
                                        "Meat & Fish",
                                        "Grocery",
                                        "Condiments(Spices)",
                                        "Grains and Bread",
                                        "Dairy & Eggs",
                                        "Oil & Fat",
                                        "Tinned & Dried Produce",
                                        "Electronics",
                                    ]}
                                />
                                <Typography
                                    variant="caption"
                                    display="block"
                                    style={{ color: "red" }}
                                >
                                    {error && error.tags}
                                </Typography>
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
                            Password
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange}
                                    error={error && error.password}
                                    helperText={error && error.password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange}
                                    error={error && error.confirmPassword}
                                    helperText={error && error.confirmPassword}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="allowExtraEmails"
                                    color="primary"
                                />
                            }
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item onClick={this.handleSignin}>
                        <Link style={{ cursor: "pointer" }} variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(
    ShopOwnerRegistration
);

class MultipleSelect extends Component {
    state = {
        items: this.props.items,
    };

    getStyles = (item, selectedItems, theme) => {
        return {
            fontWeight:
                selectedItems.indexOf(item) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    };

    MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    render() {
        const {
            selectedItems,
            handleChange,
            classes,
            theme,
            name,
            label,
        } = this.props;

        return (
            <FormControl className={classes.formControl} variant="filled">
                <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    name={name}
                    value={selectedItems}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    color="primary"
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                    MenuProps={this.MenuProps}
                >
                    {this.props.items.map((item, i) => (
                        <MenuItem
                            key={item}
                            value={item}
                            style={this.getStyles(item, selectedItems, theme)}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}
