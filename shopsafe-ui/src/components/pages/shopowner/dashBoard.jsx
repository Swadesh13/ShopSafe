import React, { Component } from "react";
import ApexLineChart from "./components/graph";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import SimpleStatCard, { TodayChart } from "./components/simpleStat";
import UpcomingBookingsTable from "./components/UpcomingBookingsTable";
import { getShopBookings } from "../../../services/dataServices";
import { getShopDetailsAuthorized } from "../../../services/userService";

class ShopDashboard extends Component {
    state = {
        isLoading: false,
        errorMessage: "",
        bookingsData: [],
        shopData: {},
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response1 = await getShopBookings();
            console.log(response1.data);
            const data = response1.data.filter((c) => {
                const creationTime = new Date(c.createdAt);
                const d = new Date();
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                return creationTime.getTime() > d.getTime();
            });
            this.setState({ bookingsData:data , errorMessage: "" });
            const response2 = await getShopDetailsAuthorized();
            this.setState({ shopData: response2.data.userCredentials });
        } catch (ex) {
            console.log(ex.response);
            this.setState({
                errorMessage:
                    "Firebase ID token has expired. Get a fresh ID token by RE SIGN IN.",
            });
        }
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <React.Fragment>
                <Grid container xl spacing={0} style={{ marginTop: 80 }}>
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
                            <Grid item sm={4} md={4} lg={4} xl={4}>
                                <TodayChart data={this.state.bookingsData} />
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8}>
                                <ApexLineChart shopData={this.state.shopData} data={this.state.bookingsData} />
                            </Grid>
                            <Grid item sm={4} md={4} lg={4} xl={4}>
                                <SimpleStatCard
                                    data={this.state.bookingsData}
                                    shopData={this.state.shopData}
                                />
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8}>
                                <UpcomingBookingsTable
                                    data={this.state.bookingsData}
                                />
                            </Grid>
                        </React.Fragment>
                    )}
                </Grid>
            </React.Fragment>
        );
    }
}

export default ShopDashboard;
