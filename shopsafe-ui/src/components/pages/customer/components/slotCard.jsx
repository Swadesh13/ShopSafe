import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { Divider } from "@material-ui/core";
import EditBookings from "./editBookings";
import { getShopDetails } from "../../../../services/dataServices";

var QRCode = require("qrcode.react");

const useStyles = (theme) => ({
    activeRoot: {
        width: 250,
        //inWidth: 200,
        //background: "#80ffd4",
        color: "black",
        "&:hover": {
            background: "#efefef",
        },
    },
    expiredRoot: {
        maxWidth: 250,
        background: "#ffff80",
        color: "black",
        "&:hover": {
            background: "#ffe066",
        },
    },
    media: {
        height: 150,
        width: 150,
        display: "flex",
        flexWrap: "wrap",
        margin: "auto",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
    margin: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1),
    },
});

class SlotCard extends Component {
    state = {
        expanded: false,
        data: this.props.data,
        shopData: {},
        open: false,
        isLoading: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const { data } = await getShopDetails(this.props.data.shopId);
            this.setState({ shopData: data[0] });
        } catch (ex) {
            alert("An error Occured. Check Internet or Re signin");
            console.log(ex);
        }
        this.setState({ isLoading: false });
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    isEditable = () => {
        return (
            this.props.isExpired ||
            this.state.isLoading
        );
    }

    handleEdit = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { expanded, data, open, isLoading, shopData } = this.state;
        const { handleClose, handleEdit } = this;
        console.log("shopdata", shopData);
        return (
            <Card
                className={classes.activeRoot}
                onMouseOver={this.handleExpandClick}
                onMouseOut={this.handleExpandClick}
            >
                {isLoading ? (
                    "waiting for network.."
                ) : (
                    <CardHeader title={shopData.shopName} />
                )}
                <Grid justify="center">
                    <QRCode
                        value={data.customerId}
                        style={{ margin: "auto" }}
                        className={classes.media}
                    />
                </Grid>

                <CardContent>
                    <Typography
                        variant="body2"
                        justify="center"
                        align="center"
                        color="textSecondary"
                        component="p"
                    >
                        {`${data.arrivalTimeIST} ->${data.deliveryTimeIST}`}
                        <br />
                        Booking ID: {data.bookingId}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        disabled={this.isEditable()}
                        variant="outlined"
                        className={classes.margin}
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="outlined"
                        className={classes.margin}
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                    <EditBookings data={this.state.shopData} bookingDetails={data} open={open} handleClose={handleClose} />
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.chips}>
                        <Typography variant="h6" gutterBottom>
                            Order summary
                        </Typography>
                        <hr />
                        <br />
                        <br />
                        {data.purchaseItems.split(",").map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                color="primary"
                                className={classes.chip}
                            />
                        ))}
                    </CardContent>
                </Collapse>
                <Divider />
            </Card>
        );
    }
}

export default withStyles(useStyles)(SlotCard);
