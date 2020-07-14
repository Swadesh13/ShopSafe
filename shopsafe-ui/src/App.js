import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./components/pages/signin";
import SignUp from "./components/pages/registration";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange, deepOrange } from "@material-ui/core/colors";
import MainPage from "./components/pages/customer/mainPage";
import CustomAppBar from "./components/AppComponent";
import Home from './components/home';

class App extends Component {
  state = {
    auth: {
      customerLogged: false,
      shopOwnerLogged: false,
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
        label:"Shop Profile",
      },
      {
        path: "/shopowner/dashboard",
        label: "Dashboard",
      }
    ]
  };

  handleAuth = authname => {
    this.setState({auth:{[authname]:true},userLoggedIn:true})
  }

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
    console.log("App render",this.state,menuOption);
    return (
      <div style={{ flexGrow: 1, background: "#fff8f2" }}>
        <CustomAppBar
          menuOption={menuOption}
          auth={shopOwnerLogged || customerLogged}
        />
        <Grid container direction="row" justify="center" alignItems="baseline">
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route
              path="/signup"
              component={() => <SignUp handleAuth={this.handleAuth} />}
            />
            {shopOwnerLogged && (
              <Route
                path="/shopowner"
                component={() => (
                  <h1>Owner Dashboard is still under development</h1>
                )}
              />
            )}
            {customerLogged && (
              <Route
                path="/customer"
                component={() => <MainPage userData={this.state.data} />}
              />
            )}
            <Route path="/" exact component={Home} />
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default App;
