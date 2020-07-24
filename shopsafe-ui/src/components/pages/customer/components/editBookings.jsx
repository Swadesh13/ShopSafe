import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
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
import DialogContent from "@material-ui/core/DialogContent";

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

class EditBookings extends Component {
    state = {
        data: {
            itemList: this.props.bookingDetails.purchaseItems.split(","),
            period:
                this.props.bookingDetails.arrivalHour < 12
                    ? "Morning"
                    : this.props.bookingDetails.arrivalHour < 18
                    ? "Afternoon"
                    : "Evening",
            slot: {
                start: this.props.bookingDetails.slotGroupBegins,
                end: this.props.bookingDetails.slotGroupEnds,
            },
        },
        slotLabel: `${timeString(
            this.props.bookingDetails.slotGroupBegins
        )} - ${timeString(this.props.bookingDetails.slotGroupEnds)}`,
        item: "",
    };

    formData = {
        period: [
            { label: "Morning", slot: { start: 0, end: 12 } },
            { label: "Afternoon", slot: { start: 12, end: 18 } },
            { label: "Evening", slot: { start: 18, end: 23 } },
        ],
    };

    getSlotTimes = (period) => {
        let slotTimeArr = [];
        let stime = new Date();
        const currentTime = new Date();
        const gap = 60 * 60 * 1000;
        if (!period)
            period = this.formData.period.filter(
                (c) => !c.label.localeCompare(this.state.data.period)
            )[0].slot;
        const duration = 3600 * 1000;
        stime.setHours(period.start);
        stime.setMinutes(0);
        stime.setSeconds(0);
        const {
            openingHour,
            openingMinute,
            closingHour,
            closingMinute,
        } = this.props.data;
        if (period.end < currentTime.getHours()) return [];
        while (
            stime.getHours() < period.end &&
            stime.getHours() < closingHour
        ) {
            const start = new Date(stime);
            const end = new Date(stime.getTime() + duration);
            if (
                start.getTime() < currentTime.getTime() ||
                start.getHours() < openingHour
            ) {
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

    render() {
        const { handleClose, open, classes } = this.props;
        const { data, item, slotLabel } = this.state;
        const { period } = this.formData;
        const {
            handlePeriod,
            handleSlotTime,
            handleAddItem,
            handleDelete,
        } = this;

        return (
            <Dialog
                maxWidth="xl"
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
                style={{ width: window.innerWidth * 0.6,margin:'auto' }}
            >
                <form style={{ width: "100%" }}>
                    <Box
                        style={{ width: "100%", backgroundColor: "white" }}
                        m={2}
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
                        style={{ width: "100%", backgroundColor: "white" }}
                        m={2}
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
                        m={2}
                        p={1}
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
                                //onClick={handleBooking}
                            >
                                Confirm Booking
                            </Button>
                        </Grid>
                    </Box>
                </form>
            </Dialog>
        );
    }
}

export default withStyles(useStyles)(EditBookings);
