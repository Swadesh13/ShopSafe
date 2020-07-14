import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CustomerRegistration from './CustomerRegistration';
import ShopOwnerRegistration from './ShopOwnerRegistration';
import { withRouter } from 'react-router-dom';


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
});


class SignUp extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log("value", this.state.value);
  };

  handlePath = (path) => {
    this.props.history.push(path);
  };

  handleAuth = auth => {
    this.props.handleAuth(auth);
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Paper square>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
            >
              <Tab label="Customer" />
              <Tab label="Shop Owner" />
            </Tabs>
          </Paper>
          <CustomerRegistration
            tabValue={value}
            onSuccess={this.handlePath}
            auth={this.handleAuth}
            index={0}
          />
          <ShopOwnerRegistration
            tabValue={value}
            onSuccess={this.handlePath}
            auth={this.handleAuth}
            index={1}
          />
        </div>
      </Container>
    );
  }
}
 
export default withRouter(withStyles(useStyles)(SignUp));