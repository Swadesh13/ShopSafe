import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import SlotCard from './components/slotCard';
import { getBookedSlotCustomer } from '../../../utils/auth';
import Button from '@material-ui/core/Button';


class MyBookings extends Component {
    state = { 
        slotData:getBookedSlotCustomer(),
        showPastSlot:false,
    }

    numberOfActiveBookngs = () => {
        let count = 0;
        for (const item of this.state.slotData) {
            if(item.active) count++;
        }
        return count;
    }

    showPastSlot = () => {
        this.setState({showPastSlot:!this.state.showPastSlot});
    }

    render() { 
        console.log("render");
        const {slotData:data} = this.state;
        return ( 
            <Grid container spacing={2} justify="center" >
                <Grid xs={12} item style={{margin:6}}>
                <Button variant="contained" color="primary" size="large" >{`Active Slots  ${this.numberOfActiveBookngs()}`}</Button>
                </Grid>
                {data.map(
                    (cards,i) => cards.active && <Grid key={i}  item  md={4} lg={2} ><SlotCard data={cards} /></Grid>
                )}
                <Grid xs={12} item style={{margin:6}}>
                    <Button
                        variant="contained"
                        onClick={this.showPastSlot}
                        label="See Past Slots"
                        color="secondary"
                    >See Past Slots</Button>
                </Grid>
                {this.state.showPastSlot && data.map(
                    (cards,i) => cards.active || <Grid key={i}  item  sm={4} md={3} ><SlotCard data={cards} /></Grid>
                )}
            </Grid>
         );
    }
}
 
export default MyBookings;

