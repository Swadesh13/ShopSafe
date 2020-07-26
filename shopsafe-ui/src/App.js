import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./components/pages/signin";
import SignUp from "./components/pages/registration";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MainPage from "./components/pages/customer/mainPage";
import {CustomAppBar,Footer} from "./components/AppComponent";
import Home from "./components/home";
import Logout from "./components/pages/shopowner/shopLogout";
import { withRouter } from "react-router-dom";
import ShopDashboard from "./components/pages/shopowner/dashBoard";

class App extends Component {
    state = {
        auth: {
            customerLogged: false,
            //localStorage.getItem("userLogged") && !localStorage.getItem("isShop"),
            shopOwnerLogged: false,
            //localStorage.getItem("userLogged") && localStorage.getItem("isShop"),
        },
        data: {
            imageUrl: "https://picsum.photos/554",
            userName: "John Doe",
            address:
                "1600 Amphitheatre Parkway in Mountain View, California, United States",
        },
        customerMenu: [
            {
                path: "/customer/profile",
                label: "Profile",
                //icon: <AccountBoxIcon />,
            },
            {
                path: "/customer/dashboard",
                label: "Dashboard",
                //icon: <DashboardIcon />,
            },
            {
                path: "/customer/booking",
                label: "Bookings",
                //icon: <BookmarksRoundedIcon />,
            },
            {
                path: "/customer/logout",
                label: "Logout",
                //icon: <PowerSettingsNewRoundedIcon />,
            },
        ],
        shopOwnerMenu: [
            {
                path: "/shopowner/shopprofile",
                label: "Shop Profile",
            },
            {
                path: "/shopowner/dashboard",
                label: "Dashboard",
            },
            {
                path: "/logout",
                label: "Logout",
            },
        ],
    };

    componentDidMount() {
        try {
            if (localStorage.getItem("userLogged")) {
                const check = localStorage.getItem("isShop");
                console.log("cdm", check);
                if (check) {
                    console.log("cdm shopOwnerLogged", check);
                    this.setState({ auth: { shopOwnerLogged: true } });
                    this.props.history.push("/shopowner");
                } else {
                    console.log("cdm customerLogged", check);
                    this.setState({ auth: { customerLogged: true } });
                    this.props.history.push("/customer");
                }
            }
        } catch (ex) {}
    }

    handleAuth = (authname) => {
        this.setState({ auth: { [authname]: true } });
    };

    darkTheme = createMuiTheme({
        palette: {
            type: "light",
            //   primary: {
            //     main: orange[500],
            //   },
            //   secondary: {
            //     main: deepOrange[900],
            //   },
        },
    });

    render() {
        const {
            customerMenu,
            shopOwnerMenu,
            auth: { customerLogged, shopOwnerLogged },
            userLoggedIn,
        } = this.state;
        // return (
        //     <ThemeProvider theme={this.darkTheme}>
        //         <div style={{flexGrow:1,marginTop:40}}>
        //             <Grid
        //                 container
        //                 direction="row"
        //                 justify="center"
        //                 alignItems="baseline"
        //             >
        //                 <Switch>
        //                     <Route path="/signup" component={SignUp}/>
        //                     <Route path="/signin" component={SignIn}/>
        //                     <Route path="/" component={() => <Sidebar userData={this.state.data}/>}/>
        //                 </Switch>
        //             </Grid>
        //         </div>
        //     </ThemeProvider>
        //  );

        const menuOption =
            (shopOwnerLogged || customerLogged) &&
            (customerLogged ? customerMenu : shopOwnerMenu);
        return (
            <div style={{ flexGrow: 1, backgroundColor:'#ffffff' }}>
                <CustomAppBar
                    menuOption={menuOption}
                    auth={shopOwnerLogged || customerLogged}
                />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{ marginTop: 20, width: "100%", margin: "auto", }}
                >
                    <Switch>
                        <Route
                            path="/signin"
                            component={() => (
                                <SignIn handleAuth={this.handleAuth} />
                            )}
                        />
                        <Route path="/logout" component={() => <Logout />} />
                        <Route
                            path="/signup"
                            component={() => (
                                <SignUp handleAuth={this.handleAuth} />
                            )}
                        />
                        {shopOwnerLogged && (
                            <Route
                                path="/shopowner"
                                component={() => <ShopDashboard />}
                            />
                        )}
                        {customerLogged && (
                            <Route
                                path="/customer"
                                component={() => (
                                    <MainPage userData={this.state.data} />
                                )}
                            />
                        )}
                        <Route path="/" exact component={Home} />
                    </Switch>
                </Grid>
                <Footer
                    
                />
            </div>
        );
    }
}

export default withRouter(App);
