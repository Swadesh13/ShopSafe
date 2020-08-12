//Only for App.js, Includes Appbar and Options,

import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Popover from "@material-ui/core/Popover";
import { Box } from "@material-ui/core";
import SignIn from "./pages/signin";

class CustomAppBarClass extends Component {
    state = {
        anchorEl: null,
    };

    handlePath = (path) => {
        this.props.history.push(path);
    };

    handleSignIn = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSignUp = () => {
        this.props.history.push("/signup");
    };

    HideOnScroll = (props) => {
        const { children, window } = props;
        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
        });

        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    };

    render() {
        const { menuOption, auth } = this.props;
        const { HideOnScroll } = this;
        const open = Boolean(this.state.anchorEl);
        const id = open ? "simple-popover" : undefined;
        const homePage = !localStorage.getItem("userLogged");
        console.log("home ",homePage);
        return (
            <HideOnScroll {...this.props}>
                {/* <AppBar color="transparent"  style={{ flexGrow: 1,  }} > */}
                <AppBar
                    color={homePage ? "transparent" : ""}
                    elevation={homePage ? 0 : 6}
                    disableGutters={homePage ? "true" : "false"}
                    style={{
                        flexGrow: 1,
                        background: homePage ? "" : "#28da8b",
                        //background: homePage ? "" : "#00ff80",
                    }}
                    //style={{ flexGrow: 1, background: "#00ff80" }}
                >
                    <Toolbar>
                        <img
                            src="https://storage.googleapis.com/shopsafe-ju/logonew.png"
                            //src="https://drive.google.com/uc?export=view&id=18cWTWvu9cTgiZWWp_yDnwzvic3HDZPhz"
                            width="60"
                            height="50"
                        />
                        <div style={{ flexGrow: 1 }} />
                        {/* <Typography variant="h4" noWrap /> */}
                        {auth ? (
                            <ProfileMenu
                                menuOption={menuOption || []}
                                handlePath={this.handlePath}
                            />
                        ) : (
                            <React.Fragment>
                                <Button
                                    variant="outlined"
                                    onClick={this.handleSignIn}
                                    color="primary"
                                    style={{ margin: 3 }}
                                >
                                    Sign In
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={this.state.anchorEl}
                                    onClose={this.handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                >
                                    <Box m={2} p={2}>
                                        <SignIn
                                            handleAuth={this.props.handleAuth}
                                            handleClose={this.handleClose}
                                        />
                                    </Box>
                                </Popover>
                                <Button
                                    variant="outlined"
                                    onClick={this.handleSignUp}
                                    color="primary"
                                    style={{ margin: 3 }}
                                >
                                    Sign Up
                                </Button>
                            </React.Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        );
    }
}

//export default withRouter(CustomAppBar);

class CustomFooter extends Component {
    state = {};
    render() {
        return (
            <footer
                style={{
                    backgroundColor: "grey",
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                    marginTop: "auto",
                    width: "100%",
                }}
            >
                This is footer
            </footer>
        );
    }
}

class ProfileMenu extends Component {
    state = {
        anchorEl: null,
        menuOption: this.props.menuOption,
    };

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handlePath = (path) => {
        this.props.handlePath(path);
        this.handleClose();
    };

    render() {
        const { anchorEl, menuOption } = this.state;
        const { handleClose, handleMenu } = this;
        return (
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle style={{ fontSize: 45 }} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={anchorEl ? true : false}
                    onClose={handleClose}
                >
                    {menuOption.map((option, i) => (
                        <MenuItem
                            key={i}
                            onClick={() => this.handlePath(option.path)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export const CustomAppBar = withRouter(CustomAppBarClass);
export const Footer = withRouter(CustomFooter);
