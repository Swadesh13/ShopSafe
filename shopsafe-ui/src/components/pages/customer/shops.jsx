import React, { Component } from 'react';
import Shop from './components/shop';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import { ShopsList } from '../../../utils/auth';


const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
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
                    justify="center"
                    alignItems="center"
                >
                    {this.state.shopData.map((data,i) => <Grid key={i} item  md={6} lg={4} ><Shop data={data}/></Grid> )}
                </Grid>               
            </div>
        );
    }
}
 
export default withStyles(useStyles)(Shops);