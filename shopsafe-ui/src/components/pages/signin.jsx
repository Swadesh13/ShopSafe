import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { login } from "../../services/userService";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";

const Joi = require("@hapi/joi");

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends Component {
    state = {
        data: {
            email: "",
            password: "",
        },
        errors: {},
        schema: {
            email: Joi.string().min(3).max(30).required().label("Email"),
            password: Joi.string().label("Password").required(),
        },
        checked: true,
    };

    validateProperty = ({ name, value }) => {
        const Obj = { [name]: value };
        const rules = { [name]: this.state.schema[name] };
        // console.log(name,value,rules,Obj);
        const { error } = Joi.object(rules).validate(Obj);

        return error ? error.details[0].message : null;
    };

    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        // const errorMessage = this.validateProperty(input);
        // if(errorMessage){
        //     this.setState({errors:{[input.name]:errorMessage}});
        // }else this.setState({errors:{[input.name]:""}});
        data[input.name] = input.value;
        this.setState({ data });
        //console.log(this.state.errors);
    };

    handleSwitch = (event) => {
        // this.setState({checked: })
    };

    validate = () => {
        const errors = {};
        const { data } = this.state;
        const result = Joi.object(this.state.schema).validate(data, {
            abortEarly: false,
        });
        if (!result.error) return null;
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const errors = this.validate();
        this.setState({ errors: errors ? errors : {} });
        console.log(errors);
        if (errors) return;
        this.doSubmit();
    };

    handleSignup = () => {
        this.props.history.push("/signup");
    };

    doSubmit = async () => {
        try {
            const response = await login(
                this.state.data.email,
                this.state.data.password
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isShop", response.data.isShop ? "shop" : "");
            localStorage.setItem("userLogged", true);
            console.log(response);
            this.props.handleAuth(
                response.data.isShop ? "shopOwnerLogged" : "customerLogged"
            );
            this.props.history.push(
                response.data.isShop ? "/shopowner" : "/customer"
            );
        } catch (ex) {
            console.log(ex);
            if (ex.response.data.message) alert(ex.response.data.message);
            else {
                const errors = { ...ex.response.data };
                console.log("error", ex.response);
                this.setState({ errors });
            }
        }
        console.log("Submitted", this.state.data);
    };

    render() {
        console.log("props", this.props);
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleChange}
                            error={errors && errors.email}
                            helperText={errors && errors.email && errors.email}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            autoComplete="current-password"
                            error={errors && errors.password}
                            helperText={
                                errors && errors.password && errors.password
                            }
                        />
                        {/* <FormControlLabel
              control={
                <Switch
                  checked={true}
                  onChange={this.handleSwitch}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Primary"
            /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    onClick={this.handleSignup}
                                    variant="body2"
                                    style={{ cursor: "pointer" }}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withRouter(withStyles(useStyles)(SignIn));
