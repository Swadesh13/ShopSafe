//Only for App.js, Includes Appbar and Options,
import React, { Component } from "react";
import Link from "@material-ui/core/Link";
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
import { Box, Grid } from "@material-ui/core";
import SignIn from "./pages/signin";
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined';
import GitHubIcon from "@material-ui/icons/GitHub";


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
        console.log("home ", homePage);
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
                        {homePage || (
                            <img
                                src="https://storage.googleapis.com/shopsafe-ju/logonew.png"
                                //src="https://drive.google.com/uc?export=view&id=18cWTWvu9cTgiZWWp_yDnwzvic3HDZPhz"
                                width="60"
                                height="50"
                            />
                        )}
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
                                    variant="contained"
                                    onClick={this.handleSignIn}
                                    color="primary"
                                    style={{
                                        margin: 3,
                                    }}
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
                                    variant="contained"
                                    onClick={this.handleSignUp}
                                    color="primary"
                                    style={{
                                        margin: 3,
                                    }}
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
            <div
                style={{
                    width: "100%",
                    height: "35x",
                    bottom: 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginBottom: -1,
                    background: "#f2f2e4",
                }}
            >
                <Grid container spacing={2}>
                    <Grid
                        item
                        container
                        direction="column"
                        justify="space-evenly"
                        spacing={2}
                        alignItems="center"
                        xs={4}
                    >
                        <Grid item>
                            <img
                                src="https://storage.googleapis.com/shopsafe-ju/eQ-logo-circle.png"
                                width="60"
                                heigt="60"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" align="center">
                                Queue for the New Normal
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        xs={4}
                    >
                        <Link href="#">Home</Link>
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">About Us</Link>
                        <Link href="#">Helps and Support</Link>
                        <Link href="#">Terms and Condition</Link>
                    </Grid>
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        xs={4}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ margin: 2 }}
                            startIcon={<AndroidOutlinedIcon />}
                        >
                            Download App
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ margin: 2 }}
                            startIcon={<GitHubIcon />}
                        >
                            Contribute
                        </Button>
                    </Grid>
                    <Grid item container justify="center">
                        <Typography variant="body1" align="center">
                            Copyright © 2020 eQ. All rights reserved
                        </Typography>
                    </Grid>
                </Grid>
            </div>
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
