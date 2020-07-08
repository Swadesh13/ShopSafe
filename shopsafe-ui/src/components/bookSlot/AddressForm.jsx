import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getUserDetails } from '../../utils/auth';



class AddressForm extends Component {
  state = { 
    userInfo:getUserDetails(),
    shopData:this.props.shopInfo,
  }

  render() { 
    const {userInfo,shopData} = this.state;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Your Info
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              defaultValue={userInfo.email}
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              id="phoneNumber"
              label="Contact Number"
              defaultValue={userInfo.phoneNumber}
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Shop Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} >
          <TextField
              id="name"
              defaultValue={shopData.name}
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
         <Grid item xs={12}>
         <TextField
              id="address"
              defaultValue={shopData.address}
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
         <Grid item xs={12} sm={6}>
         <TextField
              id="email"
              label="Email"
              defaultValue={shopData.email}
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              id="phoneNumber"
              label="Contact Number"
              defaultValue={shopData.phoneNumber}
              variant="filled"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
 
export default AddressForm;