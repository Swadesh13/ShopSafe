import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import SlotCard from "./components/slotCard";
import { getBookedSlotCustomer } from "../../../utils/auth";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getMyBookings } from "../../../services/dataServices";

class MyBookings extends Component {
    state = {
        slotData: [],
        //slotData:getBookedSlotCustomer(),
        showPastSlot: false,
        editDialogue: false,
        isLoading: false,
        errorMessage: "",
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await getMyBookings();
            console.log(response.data);
            this.setState({ slotData: response.data, errorMessage: "" });
        } catch (ex) {
            console.log(ex.response);
            this.setState({
                errorMessage:
                    "Firebase ID token has expired. Get a fresh ID token by RE SIGN IN.",
            });
        }
        this.setState({ isLoading: false });
    }

    isExpired = (data) => {
        const ctime = new Date();
        let slotStartTme = new Date(data.createdAt);
        slotStartTme.setHours(data.arrivalHour);
        slotStartTme.setMinutes(data.arrivalMinute);
        return ctime.getTime() >= slotStartTme.getTime();
    };

    numberOfActiveBookngs = () => {
        let count = 0;
        for (const item of this.state.slotData) {
            if (!this.isExpired(item)) count++;
        }
        return count;
    };

    showPastSlot = () => {
        this.setState({ showPastSlot: !this.state.showPastSlot });
    };

    render() {
        console.log("render");
        const { slotData: data } = this.state;
        return (
            <Grid container spacing={2} justify="center">
                {this.state.isLoading ? (
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                ) : this.state.errorMessage ? (
                    <h2>{this.state.errorMessage}</h2>
                ) : (
                    <React.Fragment>
                        <Grid xs={12} item style={{ margin: 6 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                            >{`Active Slots  ${this.numberOfActiveBookngs()}`}</Button>
                        </Grid>
                        {data.map(
                            (cards, i) =>
                                this.isExpired(cards) || (
                                    <Grid key={i} item md={4} lg={2}>
                                        <SlotCard
                                            data={cards}
                                            isExpired={this.isExpired(cards)}
                                        />
                                    </Grid>
                                )
                        )}
                        <Grid xs={12} item style={{ margin: 6 }}>
                            <Button
                                variant="contained"
                                onClick={this.showPastSlot}
                                label="See Past Slots"
                                color="secondary"
                            >
                                See Past Slots
                            </Button>
                        </Grid>
                        {this.state.showPastSlot &&
                            data.map(
                                (cards, i) =>
                                    cards.active || (
                                        <Grid key={i} item sm={4} md={3}>
                                            <SlotCard
                                                data={cards}
                                                isExpired={this.isExpired(
                                                    cards
                                                )}
                                            />
                                        </Grid>
                                    )
                            )}
                    </React.Fragment>
                )}
            </Grid>
        );
    }
}

export default MyBookings;
