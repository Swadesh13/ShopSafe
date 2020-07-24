import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { bookNewSlot } from "../../../../services/userService";
import CurrentLocation from "./getLocation";

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

class Order extends Component {
    state = {
        data: {
            itemList: [],
            period: "Morning",
            slot: {},
        },
        slotLabel: "",
        item: "",
        openModal: false,
        dialogueData: {},
    };

    // componentDidMount() {
    //     let data = { ...this.state.data };
    //     data.period = this.periodData()[0].label;
    //     this.setState({ data });
    // }

    formData = {
        period: [
            { label: "Morning", slot: { start: 0, end: 12 } },
            { label: "Afternoon", slot: { start: 12, end: 18 } },
            { label: "Evening", slot: { start: 18, end: 23 } },
        ],
    };

    periodData = () => {
        const {
            openingHour,
            openingMinute,
            closingHour,
            closingMinute,
        } = this.props.data;
        let period = [
            { label: "Morning", slot: { start: {h:0,m:0}, end: {h:12,m:0} } },
            { label: "Afternoon", slot: { start: {h:12,m:0}, end: {h:18,m:0} } },
            { label: "Evening", slot: { start: {h:18,m:0}, end: {h:24,m:0} } },
        ];
        if (openingHour < 12 && openingHour > 0) {
            period[0].slot.start = { h: openingHour, m: openingMinute };
        } else if (openingMinute >= 12 && openingHour < 18) {
            period.splice(0, 1);
            period[0].slot.start = { h: openingHour, m: openingMinute };
        }else if (openingMinute >= 18 && openingHour < 24) {
            period.splice(0, 2);
            period[0].slot.start = { h: openingHour, m: openingMinute };
        }

        if (closingHour > 0 && closingHour <= 12) {
            period[period.length-1].slot.end = { h: closingHour, m: closingMinute };
            period.splice(1, 2);
        } else if (closingHour > 12 && closingHour <= 18) {
            period[period.length - 1].slot.end = {
                h: closingHour,
                m: closingMinute,
            };
            period.splice(2, 1);
        }else if (closingHour > 18 && closingHour <= 24) {
            period[period.length - 1].slot.end = {
                h: closingHour,
                m: closingMinute,
            };
        }
        
        return period;  
    };

    getSlotTimes = (period) => {
        let slotTimeArr = [];
        let stime = new Date();
        const currentTime = new Date();
        const gap = 60*60 * 1000;
        if (!period)
            period = this.formData.period.filter(
                (c) => !c.label.localeCompare(this.state.data.period)
            )[0].slot;
        const duration = 3600 * 1000;
        stime.setHours(period.start);
        stime.setMinutes(0);
        stime.setSeconds(0);
        const { openingHour, openingMinute, closingHour, closingMinute } = this.props.data;
        if (period.end < currentTime.getHours()) return [];
        while (stime.getHours() < period.end && stime.getHours()<closingHour) {
            const start = new Date(stime);
            const end = new Date(stime.getTime() + duration);
            if (start.getTime() < currentTime.getTime() || start.getHours()<openingHour ) {
                stime.setTime(stime.getTime() + gap);
                continue;
            }
            let slot = {};
            slot.interval = { start: start.getHours(), end: end.getHours() };
            slot.label =
                start.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                }) +
                " - " +
                end.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                });
            
            slotTimeArr.push(slot);
            //if (start.getHours() <= this.props.closingHour) break;
            stime.setTime(stime.getTime() + gap);
        }
        //console.log(slotTimeArr);
        return slotTimeArr;
    };

    handlePeriod = (e) => {
        const data = { ...this.state.data };
        data.period = e.target.value.label;
        //data.slot = this.getSlotTimes(e.target.value.slot)[0] || "" ;
        this.setState({ data });
    };

    handleAddItem = () => {
        const data = { ...this.state.data };
        if (this.state.item) data.itemList.push(this.state.item);
        this.setState({ data, item: "" });
    };

    handleSlotTime = (e) => {
        const data = { ...this.state.data };
        const slot = this.getSlotTimes().find(
            (time) => !time.label.localeCompare(e.target.value)
        ).interval;
        data.slot = slot;
        this.setState({ data, slotLabel: e.target.value });
    };

    handleChange = ({ currentTarget: input }) => {
        this.setState({ [input.name]: input.value });
    };

    handleDelete = (item) => {
        const data = { ...this.state.data };
        const index = data.itemList.indexOf(item);
        data.itemList.splice(index, 1);
        this.setState({ data });
    };

    handleBooking = async () => {
        try {
            const { data } = await bookNewSlot(
                this.state.data,
                this.props.data.shopId
            );
            this.setState({ dialogueData: data });
            this.setState({ openModal: true });
        } catch (ex) {
            console.log(ex);
            alert("An error occured, Try re signin and booking");
        }
    };

    handleClose = () => {
        this.setState({ openModal: false });
    };

    render() {
        //console.log("order:", this.periodData());
        const { data, item, openModal, slotLabel } = this.state;
        const  {period}  = this.formData;
        const { classes } = this.props;
        const {
            handlePeriod,
            handleSlotTime,
            handleAddItem,
            handleDelete,
            handleBooking,
            handleClose,
        } = this;
        return (
            <Grid container spacing={2} style={{ paddingTop: 15 }}>
                <form style={{ width: "100%" }}>
                    <CurrentLocation />
                    <br />
                    <Box
                        borderRadius={5}
                        boxShadow={5}
                        style={{ width: "100%", backgroundColor: "white" }}
                        m={1}
                        p={1}
                    >
                        <Grid item container xs={12}>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                    required
                                >
                                    <InputLabel id="SelectPeriod">
                                        Slot Type
                                    </InputLabel>
                                    <Select
                                        labelId="SelectPeriod"
                                        id="SelectPeriod"
                                        value={
                                            period.filter(
                                                (c) =>
                                                    !c.label.localeCompare(
                                                        data.period
                                                    )
                                            )[0]
                                        }
                                        onChange={handlePeriod}
                                        label="Period"
                                    >
                                        {period.map((time, i) => (
                                            <MenuItem key={i} value={time}>
                                                {time.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    variant="outlined"
                                    required
                                    className={classes.formControl}
                                >
                                    <InputLabel id="SlotTime">
                                        Slot Time
                                    </InputLabel>
                                    <Select
                                        labelId="SlotTime"
                                        id="SlotTime"
                                        value={slotLabel}
                                        onChange={handleSlotTime}
                                        label="Slot Time"
                                    >
                                        {this.getSlotTimes().map((item, i) => (
                                            <MenuItem
                                                key={i}
                                                value={item.label}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        borderRadius={5}
                        boxShadow={5}
                        style={{ width: "100%", backgroundColor: "white" }}
                        m={1}
                        p={1}
                    >
                        <Grid item container xs={12}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    id="standard-basic"
                                    name="item"
                                    value={item}
                                    onChange={this.handleChange}
                                    label="Item"
                                    className={classes.formControl}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={handleAddItem}
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                >
                                    add
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    {data.itemList.map((value, i) => (
                                        <Chip
                                            key={i}
                                            label={value}
                                            color="secondary"
                                            onDelete={() => handleDelete(value)}
                                            className={classes.chip}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        borderRadius={5}
                        boxShadow={2}
                        style={{ width: "100%", backgroundColor: "white" }}
                        m={1}
                        p={3}
                    >
                        <Typography>
                            {data.itemList.length
                                ? `${data.itemList.length} items selected.`
                                : ""}
                            <br />
                            You'll be alloted a period within the slot you
                            choosed.
                        </Typography>
                        <br />
                        <Grid item container direction="row" justify="center">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleBooking}
                            >
                                Confirm Booking
                            </Button>
                        </Grid>
                        <Dialog
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <DialogContent>
                                <ModalNoticeBody
                                    data={this.state.dialogueData}
                                />
                            </DialogContent>
                        </Dialog>
                    </Box>
                </form>
            </Grid>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Order);

function timeString(h, m) {
    let d = new Date();
    d.setHours(h);
    d.setMinutes(m);
    return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
}

class ModalNoticeBody extends Component {
    state = {};

    render() {
        const {
            arrivalHour,
            arrivalMinute,
            deliveryHour,
            bookingId,
            customerId,
            duration,
            deliveryMinute,
        } = this.props.data;
        return (
            <Box>
                <Typography variant="h5" align="center" gutterBottom>
                    <img
                        src="https://www.huayeahfabric.com/wp-content/uploads/2019/06/success.gif"
                        style={{ height: 150, margin: "auto" }}
                    />
                    <br />
                    Thank you for your order.
                    <br />
                    <p style={{ fontSize: 20 }}>
                        You are alloted the slot <br />
                        <b style={{ fontSize: 26 }}>
                            {timeString(arrivalHour, arrivalMinute)} →{" "}
                            {timeString(deliveryHour, deliveryMinute)}
                        </b>
                    </p>
                </Typography>
                <Typography variant="h6" align="center">
                    Your Booking Id: <b>{bookingId}</b>
                </Typography>
            </Box>
        );
    }
}
