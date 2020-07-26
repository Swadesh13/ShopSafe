import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";


const useStyles = (theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        width:'100%',
        justifyContent: "space-around",
        overflow: "hidden",
        marginTop:20,
        backgroundColor: theme.palette.background.paper,
    },
    // gridList: {
    //     width: 500,
    //     height: 450,
    // },
});

class Image extends Component {
    state = {};
    tileData = [
        {
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 2,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 1,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 1,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 1,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 1,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 1,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 2,
        },{
            img: "https://picsum.photos/" + Math.round(Math.random(0, 1) * 400 + 200),
            title: "Image",
            author: "author",
            cols: 3,
        },
    ];
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList
                    cellHeight={250}
                    //className={classes.gridList}
                    cols={3}
                >
                    {this.tileData.map((tile) => (
                        <GridListTile
                            key={tile.img}
                            cols={tile.cols || 1}
                        >
                            <img src={tile.img} alt={tile.title} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default withStyles(useStyles)(Image);
