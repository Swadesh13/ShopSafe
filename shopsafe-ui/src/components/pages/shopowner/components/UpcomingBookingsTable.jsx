import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box,Grid, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { getShopBookings } from "../../../../services/dataServices";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";



function timeString(h, m = 0) {
    let d = new Date();
    d.setHours(h);
    d.setMinutes(m);
    return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
}

class UpcomingBookingsTable extends Component {
    state = {
        isLoading: false,
        errorMessage: "",
        bookingsData: this.props.data,
    };

    

    filteredList = () => {
        const d = new Date();
        return this.state.bookingsData.filter(c => {
            let ct = new Date(c.createdAt);
            ct.setHours(c.arrivalHour); ct.setMinutes(c.arrivalMinute);
            return (d.getTime() < ct.getTime() && c.status==1);
        });
    };

    render() {
        // const { data } = this.state;
        const data = this.filteredList();
        return (
            <Box m={3} borderRadius={5} boxShadow={5}>
                {/*  */}
                <Grid container direction="row">
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        style={{ margin: 10 }}
                    >
                        Upcoming Bookings
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table
                            style={{
                                width: "100%",
                                margin: "auto",
                            }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ fontSize: 20 }}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ fontSize: 20 }}
                                    >
                                        Items
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ fontSize: 20 }}
                                    >
                                        Slot
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            {i + 1}
                                            {/* <Avatar src={row.imgUrl} /> */}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 17 }}
                                        >
                                            {row.customerName}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 17 }}
                                        >
                                            {row.purchaseItems}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ fontSize: 17 }}
                                        >{`${timeString(
                                            row.arrivalHour,
                                            row.arrivalMinute
                                        )} - ${timeString(
                                            row.deliveryHour,
                                            row.deliveryMinute
                                        )}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Box>
        );
    }
}

export default UpcomingBookingsTable;
