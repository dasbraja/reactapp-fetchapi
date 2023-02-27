import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import {dateString1, Item, Item2, MenuProps, priorDays, today} from '../Utils';
import {server, defaultZurnDeveui, defaultZurnEventsChartType} from '../config'
import host from '../lib/hostName'
import {chartSeries, getChartOptions} from '../component/chart'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomDatePicker from "../component/DatePicker";



const ZurnEvents = () => {

    const [deveui, setDeveui] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [error, setError] = useState(null);
    const [datepickerfrom, setDatePickerFrom] = useState(priorDays());
    const [datepickerto, setDatePickerTo] = useState(today());

    const [devicetype, setDeviceType] = useState([]);
    const [restroomlocation, setRestroomLocation] = useState([]);
    const [store, setStore] = useState([]);
    const [devicemetaURI, setDeviceMetaURI] = React.useState('');

    const [deviceload, setDeviceLoad] = useState([]);

    const [openChart, setOpenChart] = React.useState(false);

    const [chartType, setChartType] = useState('');

    const [diffminutes, setDiffMinutes] = useState([]);
    const [numusestot, setNumUsesTot] = useState([]);
    const [date, setDate] = useState([]);
    const [eventime, setEventtime] = useState([]);
    const [TOTALUSAGEURI, setTotalUsageURI] = React.useState('');



    var uriActivationEvents = host + server + '/zurn/events?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDevices = host + server + '/common/devices?manufacturer=Zurn'

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChartClose = () => {
        setOpenChart(false);
    };

    const handleChartOpen = () => {
        setOpenChart(true);
    };

    const handleChange = (devEUIevent, value) => {
        setDeveui(value)

        uriActivationEvents = uriActivationEvents + '&deveui='+value;
        uriDevices = uriDevices + '&deveui=' + value;
        if(value.length >0) {
            getActivationEvents(uriActivationEvents);
            getDeviceMeta(uriDevices)
        }
    };

    const handleChartChange = (chartTypeEvent, key) => {
        setChartType(chartTypeEvent.target.value)
        uriActivationEvents = uriActivationEvents + '&deveui='+deveui;
    };

    const handleDatePickerFromChange = ( value) => {
        setDatePickerFrom(dateString1(value))
        uriActivationEvents = host + server + '/zurn/events?eventdate_from='+dateString1(value) +'&eventdate_to='+datepickerto+'&deveui='+deveui

        getActivationEvents(uriActivationEvents)
    }

    const handleDatePickerToChange = ( value) => {
        setDatePickerTo(dateString1(value))
        uriActivationEvents = host + server + '/zurn/events?eventdate_from='+datepickerfrom +'&eventdate_to='+dateString1(value)+'&deveui='+deveui

        getActivationEvents(uriActivationEvents)
    }


    const getActivationEvents = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setNumUsesTot(data?.map((item) => parseInt(item.num_uses_tot)));
            setDiffMinutes(data?.map((item) => parseInt(item.diff_minutes)));
            setEventtime(data?.map((item) => item.utime));
            setTotalUsageURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getDevice = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDeviceLoad(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getDeviceMeta = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDeviceType(data?.map((item) => item.devicetype))
            setRestroomLocation(data?.map((item) => item.location))
            setStore(data?.map((item) => item.store))
            setDeviceMetaURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setDeveui(defaultZurnDeveui)
        setChartType(defaultZurnEventsChartType)
        const uriActivationEventsMount = uriActivationEvents + '&deveui=' + defaultZurnDeveui
        getActivationEvents(uriActivationEventsMount);

        const uriDevicesMount = uriDevices
        getDevice(uriDevicesMount)

        const uriDeviceMetaMount = uriDevices + '&deveui=' + defaultZurnDeveui
        getDeviceMeta(uriDeviceMetaMount)

    }, []);

    const seriesActivation = () => {
        if(chartType == 'usescount') {
           return  chartSeries("Activation Events",
                "ActivationEvents",
                numusestot
            )
        } else {
          return  chartSeries("Activation Events",
                "ActivationEvents",
                diffminutes
            )
        }

    }
    const optionsActivation = () => {

        if(chartType == 'usescount') {
          return   getChartOptions('line-chart-activation-alert',
                eventime,
                'Activation Events ( Uses Count )',
                'Uses Count'
            )
        } else {
          return   getChartOptions('line-chart-activation-alert',
                eventime,
                'Activation Events ( event lag < 360 min )',
                'Minutes lag < 360 '
            )
        }

    }


    return (

        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{ bgcolor: "green" }}>
            <Box gridColumn="span 12"> </Box>

            <Box gridColumn="span 3"></Box>

            <Box gridColumn="span 4">
                <Item>
                    <div>
                        <FormControl fullWidth>
                            <Autocomplete
                                id="device-autocomplete"
                                options={deviceload}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                getOptionLabel={(option) => (option.deveui)}
                                onInputChange={handleChange}
                                sx={{ width: 500 }}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {option.store} {option.location} {option.devicetype} - {option.deveui}
                                    </Box>
                                )}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label={deveui}
                                    />
                                }
                            />
                        </FormControl>
                    </div></Item>
            </Box>
            <Box gridColumn="span 3">
                <Item>
                    <h3 color={"#7CFC00"}>
                        {store[0]} {restroomlocation[0]} {devicetype[0]}:  Activation
                        <Item> ({datepickerfrom}  to   {datepickerto}) </Item>

                    </h3>
                </Item>
            </Box>

            <Box gridColumn="span 2"></Box>

            <Box gridColumn="span 3"> </Box>
            <Box gridColumn="span 2">
                <CustomDatePicker
                    label="Date From"
                    value={datepickerfrom}
                    handleDatePickerChange={handleDatePickerFromChange}
                />
            </Box>
            <Box gridColumn="span 2">
                <CustomDatePicker
                    label="Date To"
                    value={datepickerto}
                    handleDatePickerChange={handleDatePickerToChange}
                />
            </Box>
            <Box gridColumn="span 1">
                <Item>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="charttype-select-label">Chart Type</InputLabel>
                            <Select
                                labelId="charttype-select-label"
                                id="charttype-select"
                                open={openChart}
                                onClose={handleChartClose}
                                onOpen={handleChartOpen}
                                label="ChartType"
                                value={chartType}
                                onChange={handleChartChange}
                                MenuProps={MenuProps}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem key="minuteslag" value="minuteslag" >Minutes Lag</MenuItem>
                                <MenuItem key="usescount" value="usescount" >Uses Count</MenuItem>

                            </Select>
                        </FormControl>
                    </div></Item>
            </Box>
            <Box gridColumn="span 4"> </Box>

            <Box gridColumn="span 3"> </Box>
            <Box gridColumn="span 7">
                <Item>
                    <Chart
                        options={optionsActivation({chartType})}
                        series={seriesActivation({chartType})}
                        type="line"
                        width="100%"
                    />
                </Item>

            </Box>


            <Box gridColumn="span 12"> </Box>
        </Box>
    )
}

export default ZurnEvents;