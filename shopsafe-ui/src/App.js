import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Sidebar from './components/sidebar';
import {Route,Switch,Redirect} from 'react-router-dom';
import SignIn from './components/pages/signin';


class App extends Component {
    state = { 
        data:{
            imageUrl:"https://picsum.photos/554",
            userName:"John Doe",
            address:"1600 Amphitheatre Parkway in Mountain View, California, United States"
        }
     }
    render() { 
        return (
            <div style={{flexGrow:1,marginTop:40}}>
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="baseline"                    
                >
                    <Switch>
                        <Route path="/signin" component={SignIn}/>
                        <Route path="/" component={() => <Sidebar userData={this.state.data}/>}/>
                    </Switch>
                </Grid>
            </div>
        );
    }
}
 
export default App;