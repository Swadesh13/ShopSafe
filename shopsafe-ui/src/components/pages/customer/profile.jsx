import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    largeAvatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: "auto",
    },
});
class MyProfile extends Component {
    state = {};
    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <div style={{ padding: 10 }}>
                        <Avatar
                            src={this.props.userData.imageUrl}
                            className={classes.largeAvatar}
                        />
                        <br />
                        <Typography variant="h5" component="h2" align="center">
                            {this.props.userData.userName}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(MyProfile);
