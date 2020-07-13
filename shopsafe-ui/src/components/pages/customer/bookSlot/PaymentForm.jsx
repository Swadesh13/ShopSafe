import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { getItemList } from '../../../../utils/auth';





const useStyles = theme => ({
 formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "90%",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

const absSecond = (hour,minute=0) => {
  let d = new Date();
  d.setHours(hour);d.setMinutes(minute);
  return d.getTime();
};

const fieldValue = {
  period:[
    {label:"Morning",slot:{start:8,end:12}},
    {label:"Afternoon",slot:{start:12,end:18}},
    {label:"Evening",slot:{start:18,end:23}},
  ],
  duration:[
    {label:"15 Minutes",value:15},
    {label:"30 Minutes",value:30},
    {label:"1 Hour",value:60},
    {label:"1 Hour 30 Minutes",value:90},
    {label:"2 Hour",value:120},
  ],
};

class SelectSlotAndItem extends Component {
  state = { 
    period:fieldValue.period.filter(c => !c.label.localeCompare(this.props.period))[0],
    duration:fieldValue.duration.filter(c => c.value==this.props.duration)[0],
    shopSchedule:{openingTime:{hour:8,minute:0},closingTime:{hour:8,minute:30}},
  }

  componentDidMount() {
    this.setState({slotTime:this.getSlotTimes()[0]})
    //if(!this.props.slotTime) this.props.setSlotTime(this.getSlotTimes()[0]);
  }

  getSlotTimes = (period, duration) => {
    let slotTimeArr = [];
    let stime = new Date();
    const currentTime = new Date();
    const gap=15*60*1000;
    if(!period) period = this.state.period.slot;
    if(!duration) duration = this.state.duration.value * 60000;
    else duration *= 60000;
    stime.setHours(period.start); stime.setMinutes(0); stime.setSeconds(0);
    if(period.end<currentTime.getHours()) return [];
    while(stime.getHours()<period.end){
      const start = new Date(stime);
      const end = new Date(stime.getTime()+duration);      
      if(start.getTime()<currentTime.getTime()) {
        stime.setTime(stime.getTime()+gap);
        continue;
      }
      slotTimeArr.push(start.toLocaleTimeString()+" - "+end.toLocaleTimeString());
      stime.setTime(stime.getTime()+gap);
    }
    return slotTimeArr;
  }

  handlePeriod = e => {
    this.setState({period:e.target.value});
    this.props.setPeriod(e.target.value.label);
    this.props.setSlotTime(this.getSlotTimes(e.target.value.slot)[0] || "");
  }

  handleDuration = e => {
    this.setState({duration:e.target.value});
    this.props.setDuration(e.target.value.value);
    this.props.setSlotTime(this.getSlotTimes(null,e.target.value.value)[0]);
  }

  handleSlotTime = e => {
    //this.setState({slotTime:e.target.value});
    this.props.setSlotTime(e.target.value);
  }

  
  render() { 
    const {classes,theme} = this.props;
    const {period,duration} = this.state;
    const {handleDuration,handlePeriod,handleSlotTime} = this;
    const {handleSelectItems,slotTime} = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
         Select Slot
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl} required>
              <InputLabel id="SelectPeriod" >Time</InputLabel>
              <Select
                labelId="SelectPeriod"
                id="SelectPeriod"
                value={period}
                onChange={handlePeriod}
                label="Age"
              >
                {fieldValue.period.map((time,i) => <MenuItem key={i} value={time}>{time.label}</MenuItem> )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl variant="outlined" required className={classes.formControl}>
              <InputLabel id="SelectDuration">Duration</InputLabel>
              <Select
                labelId="SelectDuration"
                id="SelectDuration"
                value={duration}
                onChange={handleDuration}
                label="Duration"
              >
                {fieldValue.duration.map((slot,i) => <MenuItem key={i} value={slot}>{slot.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
          <FormControl variant="outlined" required className={classes.formControl}>
              <InputLabel id="SlotTime">Slot Time</InputLabel>
              <Select
                labelId="SlotTime"
                id="SlotTime"
                value={slotTime}
                onChange={handleSlotTime}
                label="Slot Time"
              >
                {this.getSlotTimes().map((item,i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MultipleSelect 
              selectedItems={this.props.selectedItems} 
              handleChange={handleSelectItems} 
              classes={classes}
              theme={theme}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
 
export default withStyles(useStyles,{ withTheme: true })(SelectSlotAndItem);



class MultipleSelect extends Component {
  state = { 
    items:[],
  }

  componentDidMount() {
    this.setState({items:getItemList()});
  }

  getStyles = (item, selectedItems, theme) => {
    return {
      fontWeight:
        selectedItems.indexOf(item) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  };


  render() { 
    const {selectedItems,handleChange,classes,theme} = this.props;
    
    return ( 
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} color="primary" className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={this.MenuProps}
        >
          {this.state.items.map((items,i) => (
              //(<ListSubheader>{items.label}</ListSubheader>)
              items.value.map(item => 
                <MenuItem key={item} value={item} style={this.getStyles(item, selectedItems, theme)}>
                  {item}
                </MenuItem>
              )
            
          ))}
        </Select>
      </FormControl>
    );

  }
}
 