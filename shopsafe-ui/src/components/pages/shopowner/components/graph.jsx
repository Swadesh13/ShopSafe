import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
import { withStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";


const useStyles = (theme) => ({
    root: { margin: 5, height: "50%", width: "95%" },
});

class ApexLineChart extends Component {
    state = {
        series: [
            {
                name: "Customer Booked",
                data: [
                    84,
                    92,
                    85,
                    79,
                    96,
                    109,
                    100,
                    102,
                    86,
                    79,
                    93,
                    86,
                    70,
                    121,
                    89,
                    95,
                    84,
                ],
            },
            {
                name: "Turn Ups",
                data: [
                    78,
                    88,
                    85,
                    72,
                    90,
                    92,
                    95,
                    100,
                    81,
                    77,
                    82,
                    86,
                    70,
                    115,
                    82,
                    88,
                    83,
                ],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "area",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                type: "datetime",
                categories: [
                    "2018-09-14T",
                    "2018-09-15T",
                    "2018-09-16T",
                    "2018-09-17T",
                    "2018-09-18T",
                    "2018-09-19T",
                    "2018-09-20T",
                    "2018-09-21T",
                    "2018-09-22T",
                    "2018-09-23T",
                    "2018-09-24T",
                    "2018-09-25T",
                    "2018-09-26T",
                    "2018-09-27T",
                    "2018-09-28T",
                    "2018-09-29T",
                    "2018-09-30T",
                ],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
        },
    };
    render() {
        const { classes } = this.props;
        return (
            <Box
                m={3}
                p={1}
                borderRadius={5}
                boxShadow={5}
                style={{ width: "96%" }}
            >
                <Typography variant="h4" style={{ marginLeft: 5 }}>
                    {this.props.shopData.shopName}
                </Typography>
                <ApexCharts
                    className={classes.root}
                    options={this.state.options}
                    series={this.state.series}
                    type="area"
                    height={370}
                />
            </Box>
        );
    }
}

export default withStyles(useStyles)(ApexLineChart);
