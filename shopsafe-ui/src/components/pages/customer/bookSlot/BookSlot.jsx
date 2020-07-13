import React, { Component } from 'react';
import { withStyles, duration } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm.jsx';
import SelectSlotAndItem from './PaymentForm.jsx';
import Review from './Review.jsx';
import {getUserDetails, ShopsList} from '../../../../utils/auth';


const useStyles = (theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    color:"primary",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const steps = ['Shop Details', 'Item details', 'Review your order'];


class BookNewSlot extends Component {
  state = { 
    activeStep:0,
    shopData:ShopsList(this.props.match.params.uid),
    checkConfirmation:true,
    selectedItems:[],
    slotTime:"",
    duration:15,//in Minutes
    period:"Morning",
  }

  getStepContent = (step,data,onCheck) => {
    switch (step) {
      case 0:
        return <AddressForm shopInfo={data} onCheck={onCheck}/>;
      case 1:
        return <SelectSlotAndItem
          onCheck={onCheck}
          handleSelectItems={this.handleSelectItems}
          setSlotTime={this.setSlotTime}
          setDuration={this.setDuration}
          setPeriod={this.setPeriod}
          selectedItems={this.state.selectedItems}
          slotTime={this.state.slotTime}
          duration={this.state.duration}
          period={this.state.period}
        />;
      case 2:
        return <Review 
          onCheck={onCheck}
          items={this.state.selectedItems}
          period={this.state.period}
          slotTime={this.state.slotTime}
          shopData={this.state.shopData}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = () => {
    this.setState({activeStep:(this.state.activeStep + 1)});
    if(this.state.activeStep==2) this.confirmSlotSubmit();
  }

  handleBack = () => {
    this.setState({activeStep:(this.state.activeStep - 1)});
  }

  handleCheck = e => {
    const checkConfirmation = e.currentTarget._valueTracker.getValue();
    this.setState({checkConfirmation});
  }

  confirmSlotSubmit = () => {
    console.log("slot confirm");
  }

  //Mehods for component SelectSlotAndItems

  handleSelectItems = e => {
    this.setState({selectedItems:e.target.value});
  }

  setSlotTime = time => {
    this.setState({slotTime:time});
  }

  setDuration = duration => {
    this.setState({duration});
  }

  setPeriod = period => {
    this.setState({period});
  }


  render() { 
    const {classes} = this.props;
    const {activeStep,shopData} = this.state;
    const {handleBack,handleNext} = this;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Booking New Slot
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" align="center" gutterBottom>
                    <img src="https://www.huayeahfabric.com/wp-content/uploads/2019/06/success.gif" style={{height:150,margin:'auto'}} />
                    <br/>Thank you for your order.<br/>
                    <p style={{fontSize:40}}>6:00 PM → 7:00 PM</p>
                  </Typography>
                  <Typography variant="h6" align="center">
                    Order No: <b>kl34j513l5143jlk1</b>
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep,shopData,this.handleCheck)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button} color="secondary">
                        Back
                      </Button>
                    )}
                    <Button
                      disabled={! this.state.checkConfirmation}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Confirm Slot' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
 
export default withStyles(useStyles)(BookNewSlot);