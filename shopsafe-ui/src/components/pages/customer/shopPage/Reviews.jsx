import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import Button from "@material-ui/core/Button";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getReviews } from '../../../../services/dataServices';


class Review extends Component {
    state = {
        data: [],
        sortType: "Newest First",
        isLoading:false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const { data } = await getReviews(this.props.id);
            this.setState({ data });
        } catch (ex) {
            console.log(ex.response);
        }
        this.setState({ isLoading: false });
    }

    sorting = [
        "Newest First",
        "Oldest First",
        "Highest Rated",
        "Lowest Rated"
    ];

    handleChange = event => {
        this.setState({ sortType: event.target.value });
    }

    render() {
        return (
            <Grid container direction="row" spacing={5} lg sm md xs>
                {this.state.isLoading ? (
                    <Grid item container direction="row" justify="center" style={{marginTop:10}}>
                        <CircularProgress />
                    </Grid>
                ) : (
                    <React.Fragment>
                        <FormControl
                            variant="standard"
                            style={{ marginLeft: 30, marginTop: 20 }}
                            //className={classes.formControl}
                        >
                            <InputLabel id="demo-simple-select-filled-label">
                                Sort By
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={this.state.sortType}
                                onChange={this.handleChange}
                            >
                                {this.sorting.map((value, i) => (
                                    <MenuItem key={i} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {this.state.data.map((val) => (
                            <React.Fragment>
                                <ReviewCard key={val.ratingId} data={val} />
                                <Divider />
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                )}
            </Grid>
        );
    }
}

export default Review;



const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: "Very Dissatisfied",
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: "Dissatisfied",
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: "Neutral",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: "Satisfied",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: "Very Satisfied",
    },
};
function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};


class ReviewCard extends Component {
    state = {
        data: {},
        liked: false,
    };

    handleLike = () => {
        this.setState({ liked: !this.state.liked });
    };

    date = str => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        let d = new Date(str);
        return d.toLocaleDateString("en-US", options);
    }

    // createdAt: "2020-07-20T13:15:35.544Z";
    // customerId: "iS3rFzmTr6MPbySvMjaiBlR8MDO2";
    // customerName: "Sk Shahnawaz";
    // imageUrl: "https://picsum.photos/200";
    // rating: 5;
    // ratingId: "zKb44YHvLhhfBlnYnwER";
    // review: "okay delivery";

    render() {
        const {
            customerName:name,
            review,
            rating,
            imageUrl,
            createdAt,
            customerId,
            ratingId,
        } = this.props.data;
        return (

            <Grid
                container
                item
                direction="column"
                lg={12}
                sm={12}
                md={12}
                xl={12}
            >
                <Box borderRadius={5} style={{ padding: 8, width: "100%" }}>
                    <Grid
                        container
                        item
                        direction="row"
                        lg={12}
                        sm={12}
                        md={12}
                        xl={12}
                        spacing={5}
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            justify="flex-start"
                            lg={8}
                            xl={8}
                            spacing={2}
                            sm={8}
                        >
                            <Grid item xs={2}>
                                <Avatar
                                    src={imageUrl}
                                    style={{ margin: 5 }}
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                xs={12}
                                lg={8}
                                xl={8}
                            >
                                <Typography component="h2" variant="h5">
                                    {name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    {this.date(createdAt)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            lg={4}
                            xl={4}
                            sm={4}
                            justify="flex-end"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item>
                                <Rating
                                    name="ratings"
                                    defaultValue={rating}
                                    readOnly
                                    style={{ paddingTop: 4, color: "#ff065c" }}
                                    getLabelText={(value) =>
                                        customIcons[value].label
                                    }
                                    IconContainerComponent={IconContainer}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    <b>{rating}</b>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography
                            variant="subtitle1"
                            paragraph
                            style={{ marginTop: 20 }}
                        >
                            {review}
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                            style={{ marginBottom: 10 }}
                        >
                            <Grid item>
                                <Box
                                    borderRadius={15}
                                    style={{
                                        backgroundImage: `url(${"https://picsum.photos/200/150"})`,
                                        width: "200px",
                                        height: "150px",
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Box
                                    borderRadius={15}
                                    style={{
                                        backgroundImage: `url(${"https://picsum.photos/201/150"})`,
                                        width: "200px",
                                        height: "150px",
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Button
                            color="secondary"
                            onClick={this.handleLike}
                            startIcon={
                                this.state.liked ? (
                                    <ThumbUpAltIcon />
                                ) : (
                                    <ThumbUpAltOutlinedIcon />
                                )
                            }
                        >
                            like
                        </Button>
                        <Typography variant="caption">
                            {Math.round(Math.random(0, 1) * 500)} Likes
                        </Typography>
                    </Grid>
                </Box>
                <Divider style={{ width: "90%", margin: "auto" }} />
            </Grid>
        );
    }
}
