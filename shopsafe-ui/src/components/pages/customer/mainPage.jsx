import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";

import Shops from "./shops";
import { Route, Switch } from "react-router-dom";
import BookNewSlot from "./bookSlot/BookSlot";
import MyBookings from "./myBookings";
import MyProfile from "./profile";
import Logout from "./Logout";
import ShopPage from "./shopPage/shopPage";
import { userDetails } from "../../../services/userService";

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        display: "flex",
        width: "100%",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        // [theme.breakpoints.up('sm')]: {
        //   width: `calc(100% - ${drawerWidth}px)`,
        //   marginLeft: drawerWidth,
        // },
        background: "#f98b88",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing(3),
    },
    largeAvatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: "auto",
    },
});

class MainPage extends Component {
    state = {
        data: [
            {
                path: "/customer/profile",
                label: "Profile",
                icon: <AccountBoxIcon />,
            },
            {
                path: "/customer/dashboard",
                label: "Dashboard",
                icon: <DashboardIcon />,
            },
            {
                path: "/customer/booking",
                label: "Bookings",
                icon: <BookmarksRoundedIcon />,
            },
            {
                path: "/customer/logout",
                label: "Logout",
                icon: <PowerSettingsNewRoundedIcon />,
            },
        ],
    };

    async componentDidMount() {
        try {
            const response = await userDetails();
            const { firstName, lastName } = response.data.userCredentials;
            localStorage.setItem("userName", firstName + " " + lastName);
            console.log(response);
        } catch (ex) {
            console.log(ex.response)
        }
    }

    handleClick = (path) => {
        this.props.history.push(path);
    };

    render() {
        const { window, classes, theme } = this.props;
        const container =
            window !== undefined ? () => window().document.body : undefined;

        return (
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route
                            path="/customer/profile"
                            component={() => <MyProfile />}
                        />
                        <Route
                            path="/customer/dashboard"
                            component={() => <Shops />}
                        />
                        <Route
                            path="/customer/booknewslot/:uid"
                            component={BookNewSlot}
                        />
                        <Route
                            path="/customer/booking/"
                            component={MyBookings}
                        />
                        <Route path="/customer/logout/" component={Logout} />
                        <Route
                            path="/customer/shop/:shopId?"
                            component={ShopPage}
                        />
                        <Route path="/" component={() => <Shops />} />
                        {/* <Route path="/" component={MyProfile} /> */}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(MainPage));
