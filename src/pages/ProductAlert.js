import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import {dateString1, Item, Item2, MenuProps, priorDays, today} from '../Utils';
import {server, defaultDispenserDeveui, defaultZurnEventsChartType, defaultProductAlertChartType} from '../config'
import host from '../lib/hostName'
import {
    chartSeries,
    getChartOptions,
    getChartOptionsMultiple
} from '../component/chart'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomDatePicker from "../component/DatePicker";


const ProductAlert = () => {

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


    const [remaining, setRemaining] = useState([]);
    const [roll, setRoll] = useState('');
    const [date, setDate] = useState([]);
    const [eventime, setEventtime] = useState([]);
    const [URI, setURI] = React.useState('');



    const [roll0resolvedcount, setRoll0ResolvedCount] = useState([]);
    const [roll1resolvedcount, setRoll1ResolvedCount] = useState([]);
    const [roll0sentcount, setRoll0SentCount] = useState([]);
    const [roll1sentcount, setRoll1SentCount] = useState([]);
    const [roll0alertcount, setRoll0AlertCount] = useState([]);
    const [roll1alertcount, setRoll1AlertCount] = useState([]);
    const [productalertdate, setProductAlertDate] = useState([]);
    const [PRODUCTALERTURI, setProductAlertURI] = React.useState('');

    const [productcardresolved, setProductCardResolved] = useState([]);
    const [productcardsent, setProductCardSent] = useState([]);
    const [productcardURI, setDProductCardURI] = React.useState('');


    var uriFuelGauge = host + server + '/gp/productfuelgaugehistory?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriProductAlert = host + server + '/gp/aggregate/daily/productalert?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDevices = host + server + '/common/devices?manufacturer=GeorgiaPacific'

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

    const handleChartChange = (event, key) => {
        setRoll(event.target.value)
        uriFuelGauge = host + server + '/gp/productfuelgaugehistory?eventdate_from='+datepickerfrom +'&eventdate_to='+datepickerto+'&deveui='+deveui+'&roll='+event.target.value;
        getFuelGaugeData(uriFuelGauge);
        uriProductAlert = host + server + '/gp/aggregate/daily/productalert?eventdate_from='+datepickerfrom +'&eventdate_to='+datepickerto+ '&deveui='+deveui+'&roll='+event.target.value;
        getProductAlertData(uriProductAlert);
        uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto+'&deveui='+deveui+'&roll='+event.target.value;
        getProductCard(uriProductCard);
    };

    const handleChange = (devEUIevent, value) => {
        setDeveui(value)
        uriFuelGauge = host + server + '/gp/productfuelgaugehistory?eventdate_from='+datepickerfrom +'&eventdate_to='+datepickerto+'&deveui='+value+'&roll='+roll;
        uriProductAlert = host + server + '/gp/aggregate/daily/productalert?eventdate_from='+datepickerfrom +'&eventdate_to='+datepickerto+ '&deveui='+value+'&roll='+roll;
        uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto+'&deveui='+value+'&roll='+roll;

        uriDevices = uriDevices + '&deveui=' + value;
        if(value.length >0) {
            getFuelGaugeData(uriFuelGauge);
            getProductAlertData(uriProductAlert);
            getProductCard(uriProductCard);
            getDeviceMeta(uriDevices)
        }
    };
    const handleDatePickerFromChange = ( value) => {
        setDatePickerFrom(dateString1(value))
        uriFuelGauge = host + server + '/gp/productfuelgaugehistory?eventdate_from='+dateString1(value) +'&eventdate_to='+datepickerto+'&deveui='+deveui+'&roll='+roll;
        uriProductAlert = host + server + '/gp/aggregate/daily/productalert?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui+'&roll='+roll;
        uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+dateString1(value)+'&eventdate_to='+datepickerto+'&deveui='+deveui+'&roll='+roll;

        getFuelGaugeData(uriFuelGauge)
        getProductAlertData(uriProductAlert)
        getProductCard(uriProductCard);
    }

    const handleDatePickerToChange = ( value) => {
        setDatePickerTo(dateString1(value))
        uriFuelGauge = host + server + '/gp/productfuelgaugehistory?eventdate_from='+datepickerfrom +'&eventdate_to='+dateString1(value)+'&deveui='+deveui+'&roll='+roll
        uriProductAlert = host + server + '/gp/aggregate/daily/productalert?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui+'&roll='+roll;
        uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+datepickerfrom+'&eventdate_to='+dateString1(value)+'&deveui='+deveui+'&roll='+roll;

        getFuelGaugeData(uriFuelGauge)
        getProductAlertData(uriProductAlert)
        getProductCard(uriProductCard);
    }


    const getFuelGaugeData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setRemaining(data?.map((item) => parseInt(item.remaining)));
            setDate(data?.map((item) => item.eventdate));
            setEventtime(data?.map((item) => item.eventtime));
            setURI(url)
        } catch (error) {
            console.log(error);
        }
    };


    const getProductAlertData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setRoll0ResolvedCount(data?.map((item) => parseInt(item.roll0_resolved_count)));
            setRoll1ResolvedCount(data?.map((item) => parseInt(item.roll1_resolved_count)));
            setRoll0SentCount(data?.map((item) => parseInt(item.roll0_sent_count)));
            setRoll1SentCount(data?.map((item) => parseInt(item.roll1_sent_count)));
            setRoll0AlertCount(data?.map((item) => parseInt(item.roll0_alert_count)));
            setRoll1AlertCount(data?.map((item) => parseInt(item.roll1_alert_count)));
            setProductAlertDate(data?.map((item) => item.eventdate));
            setProductAlertURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getProductCard = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setProductCardResolved(data?.map((item) => parseInt(item.alert_resolved_count)));
            setProductCardSent(data?.map((item) => parseInt(item.alert_sent_count)));
            setDProductCardURI(url)
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
            const uriFuelGaugeMount = uriFuelGauge + '&deveui=' + defaultDispenserDeveui
            setDeveui(defaultDispenserDeveui)
            setChartType(defaultProductAlertChartType)
            getFuelGaugeData(uriFuelGaugeMount)
            const uriProductAlertMount = uriProductAlert + '&deveui=' + defaultDispenserDeveui
            getProductAlertData(uriProductAlertMount)
            const uriProductCardMount = uriProductCard + '&deveui=' + defaultDispenserDeveui
            getProductCard(uriProductCardMount)

            const uriDevicesMount = uriDevices
            getDevice(uriDevicesMount)

            const uriDeviceMetaMount = uriDevices + '&deveui=' + defaultDispenserDeveui
            getDeviceMeta(uriDeviceMetaMount)

    }, []);


    const seriesProductAlert = [ //data on the y-axis
        {

            name: 'Resolved: Bottom Roll',
            label: 'Resolved: Bottom Roll',
            data: roll0resolvedcount
        },
        {
            name: 'Active: Bottom Roll',
            label: 'Active: Bottom Roll ',
            data: roll0sentcount
        },
        {
            name: 'Resolved: Top Roll',
            label: 'Resolved: Top Roll',
            data: roll1resolvedcount
        },
        {
            name: 'Active: Top Roll',
            label: 'Active: Top Roll',
            data: roll1sentcount
        }
    ];

    const optionsProductAlert = getChartOptionsMultiple('product-alert-stackedbar-chart',
        'bar',
        true,
        productalertdate,
        'Daily Product Alert Summary',
        'Count',
        [ '#009966', '#FFBF00', '#1175A8', '#DBA800'],
        false
    );

    const seriesFuelGauge = chartSeries("Remaining",
        "Remaining",
        remaining
    )

    const optionsFuelGauge = getChartOptions('line-chart-fuel-gauge',
        eventime,
        'Dispenser Product Fuel Gauge Trend',
        'Remaining %'
    )



    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ bgcolor: "green" }} gap={2}>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12">
            </Box>
            <Box gridColumn="span 1"> </Box>
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
            <Box gridColumn="span 1">
                <Item>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="charttype-select-label">Roll</InputLabel>
                            <Select
                                labelId="charttype-select-label"
                                id="charttype-select"
                                open={openChart}
                                onClose={handleChartClose}
                                onOpen={handleChartOpen}
                                label="Roll"
                                value={roll}
                                onChange={handleChartChange}
                                MenuProps={MenuProps}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Both Rolls</em>
                                </MenuItem>
                                <MenuItem key="1" value="1" > Top Roll </MenuItem>
                                <MenuItem key="0" value="0" > Bottom Roll </MenuItem>

                            </Select>
                        </FormControl>
                    </div></Item>
            </Box>
            <Box gridColumn="span 1">
            </Box>

            <Box gridColumn="span 4">
                <Item>
                <h3 color={"#7CFC00"}>
                    {store[0]} {restroomlocation[0]} {devicetype[0]}: Product Alert
                </h3>
                    ({datepickerfrom}  to   {datepickerto})
            </Item>
            </Box>

            <Box gridColumn="span 1"></Box>
            <Box gridColumn="span 1">
            </Box>
            <Box gridColumn="span 2">
                <CustomDatePicker
                    label="Date From"
                    value={datepickerfrom}
                    handleDatePickerChange={handleDatePickerFromChange}
                />
            </Box>
            <Box gridColumn="span 2">
                <CustomDatePicker
                    label="Date From"
                    value={datepickerto}
                    handleDatePickerChange={handleDatePickerToChange}
                />
            </Box>
            <Box gridColumn="span 2">
            </Box>
            <Box gridColumn="span 2">
                <Item2>
                    <h3> {productcardsent}</h3>
                    Active
                </Item2>
            </Box>
            <Box gridColumn="span 2">
                <Item2>
                    <h3> {productcardresolved} </h3>
                    Resolved
                </Item2>
            </Box>
            <Box gridColumn="span 1">
            </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 5">
                <Item>
                    <Chart
                        options={optionsFuelGauge}
                        series={seriesFuelGauge}
                        type="line"
                        width="100%"
                    />
                </Item>

            </Box>

            <Box gridColumn="span 5">
                <Item>
                    <Chart
                    options={optionsProductAlert}
                    series={seriesProductAlert}
                    type="bar"
                    width="100%"
                />
                </Item>
            </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 12">
            </Box>

        </Box>

    )
}

export default ProductAlert;