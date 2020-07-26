import React, { Component } from 'react';
import { Typography, Box } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";


class Address extends Component {
    state = {  }
    render() { 
        const { address, phoneNumber, ownerName } = this.props.data;
        return (
            <Grid item>
                <Box
                    borderRadius={5}
                    boxShadow={3}
                    padding={2}
                    style={{ backgroundColor: "white" }}
                >
                    <Typography
                        variant="body1"
                        style={{ fontSize: 18, borderRadius: 5 }}
                    >
                        <b>{ownerName}</b>
                        <br />
                        {address}
                        <br />
                        Contact: {phoneNumber}
                    </Typography>
                </Box>
            </Grid>
        );
    }
}
 
export default Address;