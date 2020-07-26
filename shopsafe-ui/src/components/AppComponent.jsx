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




class CustomAppBarClass extends Component {
  state = {};

  handlePath = (path) => {
    this.props.history.push(path);
  };

  handleSignIn = () => {
    this.props.history.push("/signin");
  }
  
  handleSignUp = () => {
    this.props.history.push("/signup");
  }

  HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

  render() {
    const { menuOption, auth } = this.props;
    const { HideOnScroll } = this;
    return (
      <HideOnScroll {...this.props}>
        <AppBar  style={{ flexGrow: 1, background: "#00ff80" }}>
          <Toolbar>
            <Typography variant="h4" noWrap style={{ flexGrow: 1 }}>
              <b>ShopSafeJU</b>
            </Typography>
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
	state = {  }
	render() { 
		return (
            <footer
                style={{
                    backgroundColor: "grey",
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                    marginTop:'auto',
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
          open={anchorEl}
          onClose={handleClose}
        >
          {menuOption.map((option, i) => (
            <MenuItem key={i} onClick={() => this.handlePath(option.path)}>
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