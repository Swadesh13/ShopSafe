import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getStateName, getStateWiseCity } from '../../utils/auth';


const useStyles =(theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderStyles:"solid"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class CustomerRegistration extends Component {
    state = { 
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:"",
        streetname:"",
        cityName:"",
        zipCode:"",
        country:"",
        stateName:"",
        password:"",

    }

    formData = {
        states:getStateName(),
        cityList:getStateWiseCity(this.state.stateName),
    }


    handleChange = ({currentTarget:input}) => {
      this.setState({[input.name]:input.value});
    }

    handleSelect = ({target:{name,value}}) => {
        this.setState({[name]:value});
    }

    handleState = ({target:{name,value}}) => {
      this.setState({[name]:value,cityName:""});
    }

    handleSubmit = e => {
      e.preventDefault();
      console.log("Registered",this.state);
      this.props.onSuccess("/customer");
      this.props.auth("customerLogged");
    }

    handleHidden = () => {
        return this.props.tabValue!==this.props.index;
    }

    handleSignin = () => {
      this.props.onSuccess("/signin");
    }

    render() {
        console.log(this.state); 
        const {classes} = this.props;
        const {states:statesList,cityList} = this.formData;
        return (
            <form className={classes.form} noValidate onSubmit={this.handleSubmit} hidden={this.props.tabValue!==this.props.index}>
                <Grid container spacing={2}>
                  <Box borderColor="primary.main" border={1} borderRadius="borderRadius" m={1} p={2} style={{width: '100%'}}>
                      <Typography variant="caption" display="block" >
                          Name and Contact Details
                      </Typography>
                      <Grid container spacing={2} >
                          <Grid item xs={12} sm={6}>
                          <TextField
                              name="firstName"
                              variant="filled"
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              autoFocus
                              onChange={this.handleChange}
                          />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <TextField
                              variant="filled"
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              onChange={this.handleChange}
                          />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <TextField
                              name="email"
                              variant="filled"
                              type="email"
                              required
                              fullWidth
                              id="email"
                              label="Complete Email Address"
                              onChange={this.handleChange}
                          />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <TextField
                              variant="filled"
                              required
                              fullWidth
                              id="phoneNumber"
                              label="Contact Number"
                              name="phoneNumber"
                              onChange={this.handleChange}
                          />
                          </Grid>
                      </Grid>
                  </Box>
                  <Box borderColor="primary.main" border={1} borderRadius="borderRadius" m={1} p={2} style={{width: '100%'}}>
                      <Typography variant="caption" display="block" >
                          Address
                      </Typography>
                      <Grid container spacing={2} >
                          <Grid item xs={12} sm={4}>
                            <FormControl variant="filled" fullWidth className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
                                    <Select
                                      name="stateName"
                                      labelId="demo-simple-select-filled-label"
                                      id="demo-simple-select-filled"
                                      value={this.state.stateName}
                                      onChange={this.handleState}
                                    >
                                    <MenuItem value="">
                                        <em>Choose...</em>
                                    </MenuItem>
                                      {statesList.map((state,i)=><MenuItem key={i} value={state}>{state}</MenuItem>)}
                                    </Select>
                                </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                              <FormControl variant="filled" fullWidth className={classes.formControl}>
                                  <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
                                  <Select
                                    name="cityName"
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={this.state.cityName}
                                    onChange={this.handleSelect}
                                  >
                                  <MenuItem value="">
                                      <em>Choose...</em>
                                  </MenuItem>
                                    {getStateWiseCity(this.state.stateName).map((city,i)=><MenuItem key={i} value={city}>{city}</MenuItem>)}
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                          <TextField
                              variant="filled"
                              required
                              fullWidth
                              id="country"
                              label="Country"
                              name="country"
                              defaultValue="India"
                              //onChange={this.handleChange}
                              InputProps={{
                                readOnly: true,
                              }}
                          />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <TextField
                              variant="filled"
                              required
                              fullWidth
                              id="zipCode"
                              label="Zip Code"
                              name="zipCode"
                              onChange={this.handleChange}
                          />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <TextField
                              variant="filled"
                              required
                              fullWidth
                              id="streetName"
                              label="Street Name"
                              name="streetName"
                              onChange={this.handleChange}
                          />
                          </Grid>
                      </Grid>
                  </Box>
                  <Box borderColor="primary.main" border={1} borderRadius="borderRadius" m={1} p={2} style={{width: '100%'}}>
                      <Typography variant="caption" display="block" >
                          Password
                      </Typography>
                      <Grid container spacing={2} >
                          <Grid item xs={12} sm={6}>
                              <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  name="password"
                                  label="Password"
                                  type="password"
                                  id="password"
                                  onChange={this.handleChange}
                              />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  name="password"
                                  label="Confirm Password"
                                  type="password"
                                  id="password"
                                  onChange={this.handleChange}
                              />
                          </Grid>
                      </Grid>
                  </Box>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item onClick={this.handleSignin}>
                    <Link style={{cursor:"pointer"}} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
        );
    }
}
 
export default withStyles(useStyles)(CustomerRegistration);