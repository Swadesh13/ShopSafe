import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import { Typography, Box, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


class GiveReview extends Component {
    state = { write: false, reviewText: "" };

    handleClick = () => {
        if (!localStorage.getItem("userLogged")) {
            alert("Please Sign in to review");
            window.location = "/signin";
        }
        else { 
            if (!this.state.write) this.setState({ write: !this.state.write });
            else this.handleSubmit();
            
        }
    };

    handleSubmit = () => {
        alert("Submitted");
        this.setState({ write: !this.state.write });
    } 

    handleChange = ({ currentTarget: input }) => {
        this.setState({ [input.name]: input.value });
    }

    render() {
        return (
            <Grid item>
                <Box
                    borderRadius={5}
                    boxShadow={3}
                    padding={2}
                    style={{ backgroundColor: "white",width:'100%' }}
                >
                    <Typography style={{ fontSize: 25, color: "#ff689c" }}>
                        <b>Rate your experience</b>
                    </Typography>
                    <Rating
                        name="ratings"
                        style={{ fontSize: 25, color: "#f10053" }}
                    />
                    <br />
                    {this.state.write && (
                        <TextField
                            id="outlined-multiline-static"
                            label="Write your review here"
                            multiline
                            value={this.state.reviewText}
                            name="reviewText"
                            rows={6}
                            fullWidth
                            onChange={this.handleChange}
                            defaultValue=""
                            variant="outlined"
                            style={{ marginBottom: 5,marginTop:15 }}

                        />
                    )}
                    <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={this.handleClick}
                        style={{ marginTop: 5 }}
                    >
                        {this.state.write ? "submit" : "Add a review"}
                    </Button>
                </Box>
            </Grid>
        );
    }
}

export default GiveReview;
