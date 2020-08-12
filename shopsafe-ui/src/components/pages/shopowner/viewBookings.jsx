import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, Typography, Grid, TextField, Button } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getShopBookings } from "../../../services/dataServices";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { validateSlotByOtp } from "../../../services/userService";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

class ViewBookings extends Component {
    state = {
        isLoading: false,
        errorMessage: "",
        bookingsData: [],
        filter: { status: "All", period: ["Morning", "Afternoon", "Evening"], todayOnly:true },
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await getShopBookings();
            console.log(response.data);
            this.setState({ bookingsData: response.data, errorMessage: "" });
        } catch (ex) {
            console.log(ex.response);
            this.setState({
                errorMessage:
                    "Firebase ID token has expired. Get a fresh ID token by RE SIGN IN.",
            });
        }
        this.setState({ isLoading: false });
    }

    updateFilter = (filter) => {
        this.setState({ filter });
        this.forceUpdate();
    };

    updateStatus = (data) => {
        //data.status = 2;
        let bookingsData = [...this.state.bookingsData];
        const index = bookingsData.indexOf(data);
        console.log(data, bookingsData, index);
        bookingsData[index].status = 2;
        this.setState({ bookingsData });
    };

    filterData = () => {
        const { status, period,todayOnly } = this.state.filter;
        let data = [...this.state.bookingsData];
        console.log(period);
        //filter by period
        if (period.indexOf("Morning") == -1) {
            data = data.filter((c) => c.arrivalHour >= 12);
        }
        if (period.indexOf("Afternoon") == -1) {
            data = data.filter(
                (c) => c.arrivalHour >= 18 || c.arrivalHour < 12
            );
        }
        if (period.indexOf("Evening") == -1) {
            data = data.filter((c) => c.arrivalHour < 18);
        }

        if (todayOnly)
            data = data.filter(c => {
                const creationTime = new Date(c.createdAt);
                const d = new Date(); d.setHours(0); d.setMinutes(0); d.setSeconds(0);
                return creationTime.getTime() > d.getTime();
            })

        //filter according to status
        if (status.localeCompare("All") == 0) return data;
        else if (status.localeCompare("Pending") == 0)
            return data.filter((c) => c.status == 1);
        else if (status.localeCompare("Complete") == 0)
            return data.filter((c) => c.status == 2);
        else if (status.localeCompare("Expired") == 0)
            return data.filter((c) => c.status == 0);
    };

    // arrivalHour: 3;
    // arrivalMinute: 0;
    // arrivalTimeIST: "3 AM";
    // bookingId: "kvalOpAcU4mj8ENy3Ovc";
    // createdAt: "2020-07-28T18:47:04.441Z";
    // customerId: "iS3rFzmTr6MPbySvMjaiBlR8MDO2";
    // deliveryHour: 3;
    // deliveryMinute: 30;
    // deliveryTimeIST: "3:30 AM";
    // duration: 30;
    // purchaseItems: "tiktok,katbery,fsafas,Dettol";
    // shopId: "25QLTdo85CRarWC0b3Rc4YG5Ozu2";
    // slotGroupBegins: 3;
    // slotGroupEnds: 4;

    render() {
        const data = this.filterData();
        return (
            <Container maxWidth="xl" style={{ marginTop: 90 }}>
                {this.state.isLoading ? (
                    <CircularProgress
                        style={{ marginLeft: window.innerWidth * 0.48 }}
                    />
                ) : this.state.errorMessage ? (
                    <h2 style={{ paddingTop: 60 }}>
                        {this.state.errorMessage}
                    </h2>
                ) : (
                    <React.Fragment>
                        <Grid container direction="row">
                            <Grid
                                item
                                container
                                direction="row"
                                spacing={2}
                                xs={6}
                            >
                                <Grid item>
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                    >
                                        All Bookings
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        color="primary"
                                        label={
                                            "Total: " +
                                            data.length
                                        }
                                        style={{
                                            fontSize: 20,
                                        }}
                                    ></Chip>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        color="secondary"
                                        label={
                                            "Pending: " +
                                            data.filter(
                                                (c) => c.status == 1
                                            ).length
                                        }
                                        style={{
                                            color: "black",
                                            backgroundColor: "#ffbf00",
                                            fontSize: 20,
                                        }}
                                    ></Chip>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Filter setFilter={this.updateFilter} />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <TableContainer component={Paper}>
                            <Table
                                style={{ width: "100%", margin: "auto" }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            size="small"
                                            align="right"
                                        ></TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 20 }}
                                        >
                                            <b>Name</b>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 20 }}
                                        >
                                            <b>Items</b>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 20 }}
                                        >
                                            <b>Slot</b>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 20 }}
                                        >
                                            <b>Duration</b>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 20 }}
                                        >
                                            <b>Status</b>
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, i) => (
                                        <RowBody
                                            key={i}
                                            data={row}
                                            index={i}
                                            updateStatus={this.updateStatus}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </React.Fragment>
                )}
            </Container>
        );
    }
}

export default ViewBookings;

class RowBody extends Component {
    state = {
        data: this.props.data,
    };

    getChip = (status) => {
        if (status == 1)
            return (
                <Chip
                    style={{
                        backgroundColor: "#ffbf00",
                    }}
                    icon={<ErrorOutlineIcon />}
                    label="Pending"
                />
            );
        else if (status == 0)
            return <Chip icon={<CancelOutlinedIcon />} label="Expired" />;
        else if (status == 2)
            return (
                <Chip
                    style={{
                        backgroundColor: "#00f600",
                    }}
                    icon={<CheckCircleOutlineOutlinedIcon />}
                    label="Complete"
                />
            );
    };

    handleOtp = async (otp) => {
        try {
            const response = await validateSlotByOtp(
                this.props.data.bookingId,
                otp
            );
            if (response.status == 200) {
                this.props.updateStatus(this.props.data);
            }
            console.log(response);
        } catch (ex) {
            console.log(ex);
            alert("Something went wrong");
        }
        console.log(otp);
    };

    render() {
        const { data: row, index } = this.props;
        return (
            <TableRow>
                <TableCell align="right" size="small">
                    {index + 1}
                </TableCell>
                <TableCell align="center" style={{ fontSize: 17 }}>
                    {row.customerName || "DemoName Zunaid"}
                </TableCell>
                <TableCell align="center" style={{ fontSize: 17 }}>
                    {row.purchaseItems}
                </TableCell>
                <TableCell
                    align="center"
                    style={{ fontSize: 17 }}
                >{`${row.arrivalTimeIST} ⟶ ${row.deliveryTimeIST}`}</TableCell>
                <TableCell align="center" style={{ fontSize: 17 }}>
                    {row.duration}
                </TableCell>
                <TableCell align="center" style={{ fontSize: 17 }}>
                    {this.getChip(row.status)}
                </TableCell>
                <TableCell align="center" style={{ fontSize: 17 }}>
                    {row.status == 1 ? (
                        <OTP submitOtp={this.handleOtp} />
                    ) : null}
                </TableCell>
            </TableRow>
        );
    }
}

class Filter extends Component {
    state = {
        period: ["Morning", "Afternoon", "Evening"],
        status: "All",
        todayOnly: true,
    };

    handleChange = (event) => {
        let data = { ...this.state };
        this.setState({ [event.target.name]: event.target.value });
        data[event.target.name] = event.target.value;
        this.props.setFilter(data);
    };

    handleCheck = (event) => {
        let data = { ...this.state };
        this.setState({ [event.target.name]: event.target.checked });
        data[event.target.name] = event.target.checked;
        this.props.setFilter(data);
    };

    render() {
        const { period, status } = this.state;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: 224,
                    width: 160,
                },
            },
        };

        return (
            <Paper elevation={0}>
                <Grid container direction="row" spacing={2} justify="flex-end">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.todayOnly}
                                    onChange={this.handleCheck}
                                    name="todayOnly"
                                    color="primary"
                                />
                            }
                            label="Only Today"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl style={{ minWidth: 150, maxWidth: 300 }}>
                            <InputLabel id="demo-mutiple-checkbox-label">
                                Period
                            </InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                name="period"
                                value={period}
                                onChange={this.handleChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                            >
                                {["Morning", "Afternoon", "Evening"].map(
                                    (name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox
                                                checked={
                                                    period.indexOf(name) > -1
                                                }
                                            />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl style={{ minWidth: 150, maxWidth: 300 }}>
                            <InputLabel id="demo-simple-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                name="status"
                                onChange={this.handleChange}
                            >
                                {["All", "Complete", "Pending", "Expired"].map(
                                    (name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

class OTP extends Component {
    state = {
        showInputField: false,
        otp: "",
    };

    handleChange = ({ currentTarget: input }) => {
        this.setState({ [input.name]: input.value });
    };

    handleClick = () => {
        if (this.state.showInputField) {
            if (this.state.otp) this.props.submitOtp(parseInt(this.state.otp));
        } else {
            this.setState({ showInputField: true });
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.state.showInputField ? (
                    <TextField
                        name="otp"
                        size="small"
                        variant="outlined"
                        onChange={this.handleChange}
                        label="OTP"
                        style={{ margin: 5 }}
                    />
                ) : null}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleClick}
                >
                    {this.state.otp ? "Submit" : "approve"}
                </Button>
            </React.Fragment>
        );
    }
}
