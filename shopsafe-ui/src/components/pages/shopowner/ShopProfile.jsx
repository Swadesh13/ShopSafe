import React, { Component } from "react";
import {
    getShopDetailsAuthorized,
    updateShopDetails,
    uploadShopPhoto,
} from "../../../services/userService";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

function timeString(h, m = 0) {
    let d = new Date();
    d.setHours(h);
    d.setMinutes(m);
    return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
}
const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "90%",
    },
    button: {
        margin: theme.spacing(1),
        marginTop: 10,
        //backgroundColor: "#d96477",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
});

class ShopProfile extends Component {
    state = {
        isLoading: true,
        errorMessage: "",
        shopData: {},
        data: {},
        item: "",
        label: (
            <label
                htmlFor="uploadFile"
                style={{
                    cursor: "pointer",
                }}
            ></label>
        ),
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await getShopDetailsAuthorized();
            console.log(response.data);
            const { userCredentials } = response.data;
            let data = {
                payment_modes: userCredentials.payment_modes,
                closingHour: userCredentials.closingHour,
                closingMinute: userCredentials.closingMinute,
                openingHour: userCredentials.openingHour,
                openingMinute: userCredentials.openingMinute,
                maxConcurrent: userCredentials.maxConcurrent,
                tags: userCredentials.tags,
                phoneNumber: userCredentials.phoneNumber,
            };
            this.setState({
                shopData: response.data.userCredentials,
                errorMessage: "",
                data,
            });
        } catch (ex) {
            console.log(ex.response);
            this.setState({
                errorMessage:
                    "Firebase ID token has expired. Get a fresh ID token by RE SIGN IN.",
            });
        }
        this.setState({ isLoading: false });
    }

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

    handleChange = ({ currentTarget: input }) => {
        this.setState({ [input.name]: input.value });
    };

    handleAddItem = () => {
        const data = { ...this.state.data };
        if (this.state.item) data.tags.push(this.state.item);
        this.setState({ data, item: "" });
    };

    handleDelete = (item) => {
        const data = { ...this.state.data };
        const index = data.tags.indexOf(item);
        data.tags.splice(index, 1);
        this.setState({ data });
    };

    handleSubmit = async () => {
        console.log("Data", this.state.data);
        try {
            const response = await updateShopDetails(this.state.data);
            console.log(response);
            alert(response.data.message);
        } catch (ex) {
            console.log(ex.response);
        }
    };

    handleClickFile = () => {
        document.getElementById("uploadFile").click();
        console.log("button click");
    };

    updateImageFile = async (event) => {
        console.log("input change triggered");
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("Image", file);
        const shopData2 = { ...this.state.shopData };

        try {
            const url = URL.createObjectURL(file);
            const shopData = { ...this.state.shopData };
            shopData.imgURL = url;
            this.setState({ shopData });
            this.forceUpdate();
            const response = await uploadShopPhoto(formData);
            console.log(response);
            alert(response.data.message);
        } catch (ex) {
            console.log(ex.response);
            this.setState({ shopData:shopData2 });
        }
    };

    //     address: "Sealdah Railway Station No 1 & 2, Sealdah, Raja Bazar, Calcutta, West Bengal, India"
    // bookingTimeUnit: 24
    // closingHour: 23
    // closingMinute: 59
    // createdAt: "2020-07-26T20:53:17.534Z"
    // discount: 11
    // email: "zunaidubeh@gmail.com"
    // maxConcurrent: 60
    // openingHour: 2
    // openingMinute: 0
    // ownerName: "Andrew Mizerati"
    // payment_modes: (4) ["Cards", "Cash", "Gpay", "UPI"]
    // phoneNumber: 9123574185
    // shopName: "My Own Shit Electronics"
    // shopRating: (2) ["4.0", 1]
    // tags: (5) ["Electronics", "Oil & Fat", "Grains and Bread", "Grocery", "Dairy & Eggs"]
    //     userId: "25QLTdo85CRarWC0b3Rc4YG5Ozu2"

    render() {
        const { shopData: data, data: info, item } = this.state;
        const imageUrl =
            "https://img.etimg.com/thumb/width-640,height-480,imgsize-789754,resizemode-1,msid-73320353/small-biz/sme-sector/the-kirana-is-a-technology-shop-too/kirana-bccl.jpg";
        const { classes, themes } = this.props;
        return (
            <React.Fragment>
                <Container maxWidth="xl" style={{ marginTop: 80 }}>
                    {this.state.isLoading ? (
                        <CircularProgress
                            style={{ marginLeft: window.innerWidth * 0.48 }}
                        />
                    ) : this.state.errorMessage ? (
                        <h2 style={{ paddingTop: 60 }}>
                            {this.state.errorMessage}
                        </h2>
                    ) : (
                        <Grid container direction="row" spacing={0}>
                            <Grid
                                item
                                container
                                sm={4}
                                md={4}
                                lg={4}
                                spacing={1}
                                direction="column"
                                alignItems="center"
                            >
                                <Grid item style={{ width: "100%" }}>
                                    <Box
                                        borderRadius={16}
                                        boxShadow={3}
                                        style={{
                                            backgroundImage: `url(${
                                                data.imgURL || imageUrl
                                            })`,
                                            height: 450,
                                            backgroundSize: "cover",
                                            width: "100%",
                                        }}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-end"
                                            alignItems="flex-end"
                                            style={{ height: "100%" }}
                                        >
                                            <Grid xs={12} item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ width: "100%" }}
                                                    onClick={
                                                        this.handleClickFile
                                                    }
                                                >
                                                    upload
                                                </Button>

                                                <input
                                                    type="file"
                                                    id="uploadFile"
                                                    multiple="multiple"
                                                    onChange={
                                                        this.updateImageFile
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid container item direction="row">
                                    <Grid
                                        item
                                        container
                                        direction="column"
                                        xs={12}
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Typography
                                                variant="h4"
                                                style={{
                                                    marginBottom: 10,
                                                }}
                                            >
                                                <b>{data.shopName}</b>
                                            </Typography>
                                            <Typography variant="body1">
                                                <FiberManualRecordIcon
                                                    style={{
                                                        color: "green",
                                                        fontSize: 13,
                                                        marginRight: 5,
                                                    }}
                                                />
                                                {timeString(
                                                    data.openingHour,
                                                    data.openingMinute
                                                )}
                                                <FiberManualRecordIcon
                                                    style={{
                                                        color: "red",
                                                        fontSize: 13,
                                                    }}
                                                />
                                                {timeString(
                                                    data.closingHour,
                                                    data.closingMinute
                                                )}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        xs={12}
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        direction="column"
                                    >
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            style={{ marginBottom: 10 }}
                                        >
                                            <Rating
                                                name="ratings"
                                                defaultValue={
                                                    data.shopRating[0]
                                                }
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
                                                <b>{data.shopRating[0]}</b>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    justify="flex-start"
                                    direction="column"
                                >
                                    <Grid item style={{ width: "100%" }}>
                                        <Box
                                            borderRadius={5}
                                            boxShadow={3}
                                            padding={2}
                                            style={{ backgroundColor: "white" }}
                                        >
                                            <Typography
                                                variant="body1"
                                                style={{
                                                    fontSize: 18,
                                                    borderRadius: 5,
                                                }}
                                            >
                                                <b>{data.ownerName}</b>
                                                <br />
                                                {data.address}
                                                <br />
                                                {/* Contact: {phoneNumber} */}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                sm={8}
                                md={8}
                                lg={8}
                                style={{ width: "100%" }}
                                spacing={2}
                                direction="column"
                                alignItems="center"
                            >
                                <form style={{ width: "95%", marginTop: 20 }}>
                                    <Box
                                        borderRadius="borderRadius"
                                        boxShadow={5}
                                        m={1}
                                        p={2}
                                        style={{ width: "95%" }}
                                    >
                                        <Typography
                                            variant="h5"
                                            display="block"
                                            align="center"
                                            style={{ margin: 5 }}
                                        >
                                            Edit Info
                                        </Typography>
                                        <Grid item container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                >
                                                    Opening Time And Closing
                                                    Time(Please use 24Hr format)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <TextField
                                                    name="openingHour"
                                                    value={info.openingHour}
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
                                                    onChange={
                                                        this.handleNumberChange
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <TextField
                                                    name="openingMinute"
                                                    value={info.openingMinute}
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
                                                    onChange={
                                                        this.handleNumberChange
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <TextField
                                                    name="closingHour"
                                                    value={info.closingHour}
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
                                                    onChange={
                                                        this.handleNumberChange
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <TextField
                                                    name="closingMinute"
                                                    value={info.closingMinute}
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
                                                    onChange={
                                                        this.handleNumberChange
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                >
                                                    Available Transaction
                                                    Options
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MultipleSelect
                                                    selectedItems={
                                                        info.payment_modes
                                                    }
                                                    handleChange={
                                                        this.handleSelect
                                                    }
                                                    classes={this.props.classes}
                                                    name="payment_modes"
                                                    label="Accepted Payment Modes"
                                                    theme={this.props.theme}
                                                    items={[
                                                        "Cards",
                                                        "PayTm",
                                                        "PayPal",
                                                        "Credit Card",
                                                        "ATM Card",
                                                        "Cash",
                                                        "Gpay",
                                                        "Digital Wallets",
                                                        "UPI",
                                                        "Other Methods",
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                >
                                                    Available Items (Tags)
                                                </Typography>
                                                <Grid item container xs={12}>
                                                    <Grid item xs={12} md={8}>
                                                        <TextField
                                                            id="standard-basic"
                                                            name="item"
                                                            value={item}
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            label="Item"
                                                            className={
                                                                classes.formControl
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            size="large"
                                                            onClick={
                                                                this
                                                                    .handleAddItem
                                                            }
                                                            className={
                                                                classes.button
                                                            }
                                                            startIcon={
                                                                <AddIcon />
                                                            }
                                                        >
                                                            add
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box>
                                                            {info.tags.map(
                                                                (value, i) => (
                                                                    <Chip
                                                                        key={i}
                                                                        label={
                                                                            value
                                                                        }
                                                                        color="secondary"
                                                                        onDelete={() =>
                                                                            this.handleDelete(
                                                                                value
                                                                            )
                                                                        }
                                                                        className={
                                                                            classes.chip
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6}>
                                                <TextField
                                                    name="phoneNumber"
                                                    value={info.phoneNumber}
                                                    variant="filled"
                                                    type="number"
                                                    fullWidth
                                                    id="phoneNumber"
                                                    label="Phone Number"
                                                    onChange={
                                                        this.handleNumberChange
                                                    }
                                                    style={{ margin: 2 }}
                                                />
                                            </Grid>
                                            <Grid item sm={6} md={6} lg={6}>
                                                <TextField
                                                    name="maxConcurrent"
                                                    value={info.maxConcurrent}
                                                    variant="filled"
                                                    type="number"
                                                    fullWidth
                                                    id="maxConcurrent"
                                                    label="Max Customer Allowed"
                                                    onChange={
                                                        this.handleNumberChange
                                                    }
                                                    style={{ margin: 2 }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                container
                                                direction="row"
                                                justify="center"
                                            >
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={this.handleSubmit}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(ShopProfile);

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
            handleDelete,
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
