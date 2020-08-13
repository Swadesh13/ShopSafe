import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('https://storage.googleapis.com/shopsafe-ju/eQ-banner.png')`,
        height: "600px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em",
        },
    },
    blogsContainer: {
        paddingTop: theme.spacing(3),
    },
    promo: {
        backgroundColor: "#fff5ec",
        marginBottom: 20,
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3),
    },
    card: {
        maxWidth: "100%",
        elevation: 0,
    },
    media: {
        height: 350,
        [theme.breakpoints.down("sm")]: {
            height: 100,
        },
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between",
    },
    cardContent: {
        alignItems: "center",
    },
    author: {
        display: "flex",
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.hero}>{/* <Box>Lala Boi</Box> */}</Box>
            <Container maxWidth="xl" className={classes.blogsContainer}>
                <Box className={classes.promo}>
                    <Typography variant="h4" align="left">
                        Tired of Standing in Long Queue?
                    </Typography>
                    <Typography gutterbottom variant="h4" align="right">
                        Afraid of getting infected?
                    </Typography>
                    <Typography variant="h4" className={classes.blogTitle}>
                        It's time to say Bye-Bye !!
                    </Typography>
                    <Typography variant="h5" className={classes.blogTitle}>
                        With eQ, have the oppurtunity to manage your position in
                        an online Queue and save your time.
                    </Typography>
                </Box>
                <Typography variant="h4" className={classes.blogTitle}>
                    Book your Slot in Four Easy steps:
                </Typography>
                <Grid container spacing={4} style={{ marginBottom: 20 }}>
                    <Grid item xs={6} sm={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image="https://storage.googleapis.com/shopsafe-ju/1.jpeg"
                                title="Contemplative Reptile"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h5" component="h2">
                                    Set Location
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image="https://storage.googleapis.com/shopsafe-ju/2.jpeg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Select Shop
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image="https://storage.googleapis.com/shopsafe-ju/3.jpeg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Choose Slot
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image="https://storage.googleapis.com/shopsafe-ju/4.jpeg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <b>BOOK</b>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row-reverse"
                    className={classes.promo}
                    justify="space-between"
                >
                    <Grid item xs={12} sm={6}>
                        <img
                            src="https://storage.googleapis.com/shopsafe-ju/new-normal.jpg"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        container
                        direction="column"
                        justify="center"
                        spacing={5}
                    >
                        <Grid item>
                            <Typography variant="h2" component="h2">
                                Shopping cum Social Distancing
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="h6">
                                Our online-queueing algorithm is aimed at
                                reducing overcrowding at shops and thus helps
                                practise social distancing efficiently.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    className={classes.promo}
                    justify="space-between"
                >
                    <Grid item xs={12} sm={6}>
                        <img
                            src="https://storage.googleapis.com/shopsafe-ju/manage-booking.jpg"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        container
                        direction="column"
                        justify="center"
                        spacing={5}
                    >
                        <Grid item>
                            <Typography variant="h2" component="h2">
                                Manage your position in real-time
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="h6">
                                Our simple UI provides a seamless experience
                                towards booking slots and managing them in
                                real-time. It's just as if you are standing in a
                                real queue.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Home;
