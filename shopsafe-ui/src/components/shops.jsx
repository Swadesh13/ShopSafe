import React, { Component } from 'react';
import Shop from './shop';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import { ShopsList } from '../utils/auth';


const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    //   marginTop:5
    },
});
  


class Shops extends Component {
    state = { 
        shopData: ShopsList(),
    }
    
    render() { 
        const {classes} = this.props;
        return ( 
            // <Shop/>
            <div className={classes.root}  >
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    {this.state.shopData.map((data,i) => <Grid key={i} item  sm={6} md={4} lg={3}><Shop data={data}/></Grid> )}
                </Grid>               
            </div>
        );
    }
}
 
export default withStyles(useStyles)(Shops);