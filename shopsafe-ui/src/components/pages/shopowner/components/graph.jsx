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
                data: [],
            },
            {
                name: "Turn Ups",
                data: [],
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
                type: "string",
                categories: [],
            },

            // xaxis: {
            //     type: "datetime",
            //     categories: [],
            // },
            // tooltip: {
            //     x: {
            //         format: "DD/MM/YYYY HH:mm",
            //     },
            // },
        },
    };

    getOptions = () => {
        let options = { ...this.state.options };
        const { data } = this.props;
        let categories = [];
        let d = new Date();

        for (
            let x = this.props.shopData.openingHour;
            x <= this.props.shopData.closingHour;
            x++
        ) {
            d.setHours(x);
            d.setMinutes(0);
            categories.push(
                d.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                })
            );
        }
        options.xaxis.categories = categories;
        return options;
    };

    getSeries = () => {
        const { data } = this.props;

        let bookedData = [];
        let turnUpsData = [];
        for (
            let x = this.props.shopData.openingHour;
            x <= this.props.shopData.closingHour;
            x++
        ) {
            let count1 = 0,
                count2 = 0;
            for (const row of this.props.data) {
                if (row.arrivalHour == x) count1++;
                if (row.arrivalHour == x && row.status == 2) count2++;
            }
            bookedData.push(count1);
            turnUpsData.push(count2);
        }

        let series = [...this.state.series];
        let options = { ...this.state.options };
        series[0].data = bookedData;
        series[1].data = turnUpsData;
        return series;
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
                    options={this.getOptions()}
                    series={this.getSeries()}
                    type="area"
                    height={370}
                />
            </Box>
        );
    }
}

export default withStyles(useStyles)(ApexLineChart);
