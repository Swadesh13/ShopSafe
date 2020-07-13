import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import {Route,Switch,Redirect} from 'react-router-dom';
import SignIn from './components/pages/signin';
import SignUp from './components/pages/registration';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange,deepOrange } from '@material-ui/core/colors';
import MainPage from './components/pages/customer/mainPage';




class App extends Component {
    state = { 
        data:{
            imageUrl:"https://picsum.photos/554",
            userName:"John Doe",
            address:"1600 Amphitheatre Parkway in Mountain View, California, United States"
        }
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
    
    })

    render() { 

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
                        <Route path="/signup" component={SignUp}/>
                        {/* <Route path="/customer" component={() => <Sidebar userData={this.state.data}/>}/> */}
                        <Route path="/shopowner" component={() => <h1>Owner Dashboard is still under development</h1>}/>
                        <Route path="/customer" component={() => <MainPage userData={this.state.data} />}/>
                        <Route path="/" exact component={SignIn}/>
                    </Switch>
                </Grid>
            </div>
        );
    }
}
 
export default App;