import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Box, Typography } from "@material-ui/core";
import ApexCharts from "react-apexcharts";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { getShopDetailsAuthorized } from '../../../../services/userService';



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

class SimpleStatCard extends Component {
    state = {
        shopData: this.props.shopData,
        CustomerServedToday: this.props.data.filter(c => c.status == 2).length,
        UpcomingCustomer:this.props.data.filter(c => c.status == 1).length,
    };


    render() {
        const { shopData } = this.state;
        return (
            <Box m={3} borderRadius={5} p={2} boxShadow={5}>
                <Grid item container direction="row" spacing={2}>
                    <Grid item container direction="row" xs={12} spacing={5}>
                        <Grid item xs={8}>
                            <Typography variant="h5" color="textSecondary">
                                Customer Served Today
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {this.state.CustomerServedToday}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={12} spacing={5}>
                        <Grid item xs={8}>
                            <Typography variant="h5" color="textSecondary">
                                Upcoming customer
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {this.state.UpcomingCustomer}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={12}>
                        {/* <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                align="center"
                            >
                                Working Hour
                            </Typography>
                        </Grid> */}
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                                style={{
                                    paddingLeft: 10,
                                    margin: "auto",
                                }}
                            >
                                <FiberManualRecordIcon
                                    style={{
                                        color: "green",
                                        fontSize: 24,
                                        marginRight: 5,
                                    }}
                                />
                                {timeString(
                                    shopData.openingHour,
                                    shopData.openingMinute
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                                style={{
                                    paddingLeft: 10,
                                    margin: "auto",
                                }}
                            >
                                <FiberManualRecordIcon
                                    style={{
                                        color: "red",
                                        fontSize: 24,
                                        marginLeft: 10,
                                    }}
                                />
                                {timeString(
                                    shopData.closingHour,
                                    shopData.closingMinute
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default (SimpleStatCard);

export class TodayChart extends Component {
           state = {
               series: [
                   {
                       name: "Morning",
                       data: [
                           this.props.data.filter((c) => c.arrivalHour < 12)
                               .length,
                       ],
                   },
                   {
                       name: "Afternoon",
                       data: [
                           this.props.data.filter((c) => c.arrivalHour >= 12 && c.arrivalHour <18)
                               .length,
                       ],
                   },
                   {
                       name: "Evening",
                       data: [
                           this.props.data.filter((c) => c.arrivalHour >= 18)
                               .length,
                       ],
                   },
               ],
               options: {
                   chart: {
                       type: "bar",
                       height: 180,
                   },
                   plotOptions: {
                       bar: {
                           horizontal: false,
                           columnWidth: "55%",
                           //endingShape: "rounded",
                       },
                   },
                   dataLabels: {
                       enabled: false,
                   },
                   stroke: {
                       show: true,
                       width: 2,
                       colors: ["transparent"],
                   },
                   xaxis: {
                       categories: ["Today"],
                   },
                   yaxis: {
                       title: {
                           text: "Number of Customer",
                       },
                   },
                   fill: {
                       opacity: 1,
                   },
               },
           };
           render() {
               return (
                   <Box m={3} borderRadius={5} p={5} boxShadow={5}>
                       <Grid container direction="row" spacing={2}>
                           <Grid item xs={12}>
                               <Typography variant="h5" color="textSecondary">
                                   Current Statistics
                               </Typography>
                           </Grid>
                           <Grid
                               item
                               container
                               direction="row"
                               xs={12}
                               spacing={3}
                               justify="center"
                           >
                               <Grid item xs={4}>
                                   <Typography variant="subtitle1">
                                       Morning{" "}
                                       {
                                           this.props.data.filter(
                                               (c) => c.arrivalHour < 12
                                           ).length
                                       }
                                   </Typography>
                               </Grid>
                               <Grid item xs={4}>
                                   <Typography variant="subtitle1">
                                       Afternoon{" "}
                                       {
                                           this.props.data.filter(
                                               (c) =>
                                                   c.arrivalHour >= 12 &&
                                                   c.arrivalHour < 18
                                           ).length
                                       }
                                   </Typography>
                               </Grid>
                               <Grid item xs={4}>
                                   <Typography variant="subtitle1">
                                       Evening{" "}
                                       {
                                           this.props.data.filter(
                                               (c) => c.arrivalHour >= 18
                                           ).length
                                       }
                                   </Typography>
                               </Grid>
                           </Grid>
                           <Grid item xs={12}>
                               <ApexCharts
                                   options={this.state.options}
                                   series={this.state.series}
                                   type="bar"
                                   height={200}
                               />
                           </Grid>
                       </Grid>
                   </Box>
               );
           }
       }
