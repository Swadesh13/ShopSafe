import React, { Component } from 'react';

import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

class Sidebar extends Component {
    state = { 
        data:{
            imageUrl:"https://picsum.photos/204",
            userName:"John Doe",
            address:"1600 Amphitheatre Parkway in Mountain View, California, United States"
        }
    }

    handleBookings = () => {
        console.log("bookings");
    }

    handleDashboard = () => {
        console.log("Dashboard");
    }
    
    handleProfile = () => {
        console.log("Profile");
    }
    
    handleLogout = () => {
        console.log("Logged Out");
    }

    render() { 
        return ( 
                <Drawer
                    style={{width:"100px",flexShrink: 0,display:"flex"}}
                    variant="permanent"
                    anchor="center"
                >
                    <Container fixed>
                        <CardMedia 
                            style={{height:"250px",marginTop:20}}
                            image="https://picsum.photos/550"
                        /> 
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.data.userName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.data.address}
                        </Typography>
                    </Container>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            //selected={selectedIndex === 2}
                            onClick={this.handleDashboard}
                            alignItems="flex-start"
                        >
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            button
                            //selected={selectedIndex === 2}
                            onClick={this.handleBookings}
                            alignItems="flex-start"
                        >
                            <ListItemText primary="Bookings" />
                        </ListItem>
                        <ListItem
                            button
                            //selected={selectedIndex === 2}
                            onClick={this.handleProfile}
                            alignItems="flex-start"
                        >
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem
                            button
                            //selected={selectedIndex === 2}
                            onClick={this.handleLogout}
                            alignItems="flex-start"
                        >
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
        );
    }
}
 
export default Sidebar;