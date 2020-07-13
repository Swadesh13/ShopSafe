import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';

import Shops from './shops';
import {Route,Switch,Redirect} from 'react-router-dom';
import BookNewSlot from './bookSlot/BookSlot';
import SignIn from '../../pages/signin';
import MyBookings from './myBookings';



const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
  },
});


class MainPage extends Component {
  state = { 
    data:[
      {path:"/customer/profile", label:"Profile",icon:<AccountBoxIcon/>},
      {path:"/customer/dashboard", label:"Dashboard",icon:<DashboardIcon/>},
      {path:"/customer/booking", label:"Bookings",icon:<BookmarksRoundedIcon/>},
      {path:"/customer/logout", label:"Logout",icon:<PowerSettingsNewRoundedIcon/>}
    ],
    mobileOpen:false,
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen:(!this.state.mobileOpen)});
  }

  handleClick = path => {
    this.props.history.push(path);
  }

  drawer = (
    <div>
      <div className={this.props.classes.toolbar} style={{padding:10}}>
      <Avatar src={this.props.userData.imageUrl} className={this.props.classes.largeAvatar}/>
      <br/>
      <Typography variant="h5" component="h2" align="center">
        {this.props.userData.userName}
      </Typography>
      </div>
      <Divider />
      <List>
        {this.state.data.map((item, index) => (
          <ListItem button key={index} onClick={() => this.handleClick(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label}/>
          </ListItem>
        ))}
      </List>
    </div>
  )

  render() { 
    const {window,classes,theme} = this.props;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ShopSafeJU
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {this.drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/customer/profile" component={SignIn}/>
          
          <Route path="/customer/dashboard" component={Shops}/>
          <Route path="/customer/booknewslot/:uid" component={BookNewSlot}/>
          <Route path="/customer/booking/" component={MyBookings}/>
          <Route path="/" component={Shops}/>
      </Switch>
      </main>
    </div>
  );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(MainPage));
