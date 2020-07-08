import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";



const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});


class Shop extends Component {
    state = {  }

    handleClick = () => {
      this.props.history.push(`/bookings/${this.props.data.uid}`);
      console.log("Loved");
    }

    render() { 
        const {classes} = this.props;
        const {name,address,imgUrl,itemsAvailable,ratings,openingTime,closingTime} = this.props.data;

        return (
            <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {name[0]}
                    </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={name}
                subheader={`${openingTime}-${closingTime}`}
            />
            <CardMedia
                className={classes.media}
                image={imgUrl}
                title="Paella dish"
            />
            <CardContent>
                {itemsAvailable.map((label,index)=>
                    <Chip
                    key={index}
                    label={label}
                    style={{margin:2}}
                    clickable
                    color={index%2===0?"primary":"secondary"}
                    //deleteIcon={<DoneIcon />}
                    variant="outlined"
                />
                )}
                
                <Typography variant="body2" color="textSecondary" component="p">{address}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Rating name="half-rating-read" defaultValue={ratings} precision={0.5} readOnly />
                <IconButton aria-label="settings" edge="end" onClick={this.handleClick}>
                    <AddCircleRoundedIcon color="secondary" fontSize="large" />
                </IconButton>
            </CardActions>
            </Card>
        );
    }
}
 
export default withRouter(withStyles(useStyles)(Shop));