import React, { Component } from "react";
import { Box, Divider, GridListTile } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";


const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
});


class FilterCard extends Component {
    state = {
        filter: {
            openClose: { showAll: true, isOpen: false },
            // distanceRating: {
            //     //distance: { selected: true, ascOrder: true },
            //     //rating: { selected: false, ascOrder: true },
            // },
            items: [],
            slotTypes: { Morning: true, Afternoon: true, Evening: true },
            customerRatings:{"4":false,"3":false},
        },
    };

    formData = {
        itemList: ["gas", "gasf", "gsaf", "gafdsag", "sgasdf"],
        slotType: ["Morning", "Afternoon", "Evening"],
        customerRating:["4","3"],

    };

    handleCheck = (event) => {
        let filter = { ...this.state.filter };
        filter.openClose[event.target.name] = event.target.checked;
        this.setState({ filter });
        console.log(event.target.checked, this.state.filter);
        this.props.updateFilter(this.state.filter);
    };

    handleDR = (name) => {
        let filter = { ...this.state.filter };
        if (filter.distanceRating[name])
            filter.distanceRating[name].ascOrder = !filter.distanceRating[name]
                .ascOrder;
        else
            filter.distanceRating = {
                [name]: { ascOrder: true },
            };
        this.setState({ filter });
        this.props.updateFilter(this.state.filter);
    };

    handleSelect = ({ target: { name, value } }) => {
        let filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({ filter });
        this.props.updateFilter(this.state.filter);
    };

    handleSlot = event => {
        let filter = { ...this.state.filter };
        filter.slotTypes[event.target.name] = event.target.checked;
        this.setState({ filter });
        this.props.updateFilter(this.state.filter);
    }
    
    handleRating = event => {
        let filter = { ...this.state.filter };
        filter.customerRatings[event.target.name] = event.target.checked;
        this.setState({ filter });
        this.props.updateFilter(this.state.filter);
    }

    render() {
        const {
            openClose,
            distanceRating: dr,
            slotTypes,
            customerRatings,
        } = this.state.filter;
        const { handleCheck, handleDR, handleSlot, handleRating } = this;
        const { items, slotType, customerRating } = this.formData;
        const { classes, theme } = this.props;
        return (
            <Box
                boxShadow={5}
                style={{
                    backgroundColor: "white",
                    width: "100%",
                    marginTop: 5,
                }}
                borderRadius={5}
            >
                <Grid
                    item
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    style={{
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justify="flex-start"
                        xs={12}
                    >
                        <Typography variant="h5">
                            <b>Filters</b>
                        </Typography>
                    </Grid>
                    <Box p={1} style={{ width: "100%", paddingLeft: 15 }}>
                        <Grid item container xs={12}>
                            <Grid
                                item
                                container
                                xs={12}
                                md={12}
                                direction="column"
                                justify="center"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={openClose.showAll}
                                            onChange={handleCheck}
                                            name="showAll"
                                        />
                                    }
                                    label="Show All"
                                />
                                <Typography variant="body2">
                                    Check this box to show closed shops too
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box p={1} style={{ width: "90%", paddingLeft: 15 }}>
                        <Typography variant="h6">Items Available</Typography>
                        <MultipleSelect
                            selectedItems={this.state.filter.items}
                            handleChange={this.handleSelect}
                            classes={classes}
                            name="items"
                            label="Type of Items Available"
                            theme={theme}
                            items={[
                                "Meat & Fish",
                                "Grocery",
                                "Condiments(Spices)",
                                "Grains and Bread",
                                "Dairy & Eggs",
                                "Oil & Fat",
                                "Tinned & Dried Produce",
                                "Electronics",
                            ]}
                        />
                    </Box>
                    <Box p={1} style={{ width: "90%", paddingLeft: 15 }}>
                        <Typography variant="h6">Slot Type</Typography>
                        <Grid item container direction="column">
                            {slotType.map((label) => (
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={slotTypes[label]}
                                                onChange={handleSlot}
                                                name={label}
                                            />
                                        }
                                        label={label}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box p={1} style={{ width: "90%", paddingLeft: 15 }}>
                        <Typography variant="h6">Customer Rating</Typography>
                        <Grid item container direction="column">
                            {customerRating.map((label) => (
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customerRatings[label]}
                                                onChange={handleRating}
                                                name={label}
                                            />
                                        }
                                        label={`${label} ★ & above`}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* <Grid
                        item
                        container
                        direction="row"
                        justify="flex-start"
                        xs={12}
                    >
                        <Typography variant="h5">
                            <b>Sort By</b>
                        </Typography>
                    </Grid>
                    <Box m={1} p={1} style={{ width: "100%" }}>
                        <Grid item container xs={12}>
                            <Grid
                                item
                                container
                                xs={6}
                                direction="row"
                                justify="center"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDR("distance")}
                            >
                                <Typography
                                    variant="button"
                                    display="block"
                                    gutterBottom
                                    align="center"
                                >
                                    Distance
                                </Typography>
                                {dr.distance ? (
                                    dr.distance.ascOrder ? (
                                        <ArrowDropUpIcon />
                                    ) : (
                                        <ArrowDropDownIcon />
                                    )
                                ) : null}
                            </Grid>
                            <Grid
                                item
                                container
                                direction="row"
                                xs={6}
                                justify="center"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDR("rating")}
                            >
                                <Typography
                                    variant="button"
                                    display="block"
                                    gutterBottom
                                    align="center"
                                >
                                    Rating
                                </Typography>
                                {dr.rating ? (
                                    dr.rating.ascOrder ? (
                                        <ArrowDropUpIcon />
                                    ) : (
                                        <ArrowDropDownIcon />
                                    )
                                ) : null}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box m={1} p={1} style={{ width: "100%" }}>
                        <Grid item container xs={12}></Grid>
                    </Box> */}
                </Grid>
            </Box>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(FilterCard);


class MultipleSelect extends Component {
    state = {
        items: this.props.items,
    };

    getStyles = (item, selectedItems, theme) => {
        return {
            fontWeight:
                selectedItems.indexOf(item) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    };

    MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    render() {
        const {
            selectedItems,
            handleChange,
            classes,
            theme,
            name,
            label,
        } = this.props;

        return (
            <FormControl className={classes.formControl} variant="filled">
                <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    name={name}
                    value={selectedItems}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    color="primary"
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                    MenuProps={this.MenuProps}
                >
                    {this.props.items.map((item, i) => (
                        <MenuItem
                            key={item}
                            value={item}
                            style={this.getStyles(item, selectedItems, theme)}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}