import React, { Component } from "react";
import ShopDashboard from "./dashBoard";
import Logout from "./shopLogout";
import { Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewBookings from './viewBookings';
import ShopProfile from './ShopProfile';

class ShopMainPage extends Component {
    state = {};

    
    render() {
        return (
            <main style={{ display: "flex", width: "100%" }}>
                {this.state.isLoading ? (
                    <CircularProgress />
                ) : this.state.errorMessage ? (
                    <h2 style={{ paddingTop: 60 }}>
                        {this.state.errorMessage}
                    </h2>
                ) : (
                    <Switch>
                        {/* <Route
                        path="/shopowner/profile"
                        component={() => (
                            <MyProfile />
                        )}
                    /> */}
                        <Route
                            path="/shopowner/dashboard"
                            component={() => <ShopDashboard />}
                        />
                        <Route
                            path="/shopowner/bookings/"
                            component={ViewBookings}
                        />
                        <Route
                            path="/shopowner/shopprofile/"
                            component={ShopProfile}
                        />
                        <Route path="/shopowner/logout/" component={Logout} />
                        {/* <Route
                            path="/shopowner"
                            component={() => <ShopProfile />}
                        /> */}
                        <Route
                            path="/shopowner"
                            component={() => <ShopDashboard />}
                        />
                    </Switch>
                )}
            </main>
        );
    }
}

export default ShopMainPage;
