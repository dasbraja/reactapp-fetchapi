import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import {dateString1, Item, Item2, MenuProps, priorDays, today} from '../Utils';
import {server, defaultZurnDeveui} from '../config'
import host from '../lib/hostName'
import {chartSeries, getChartOptions} from '../component/chart'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomDatePicker from "../component/DatePicker";



const ZurnAnalytics = () => {

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

    const [totalusage, setTotalUsage] = useState([]);
    const [date, setDate] = useState([]);
    const [eventime, setEventtime] = useState([]);
    const [TOTALUSAGEURI, setTotalUsageURI] = React.useState('');

    const [activationcount, setActivationCount] = useState([]);
    const [ACTIIVATIONCOUNTURI, setActivationCountURI] = React.useState('');
    const [activationcountdate, setActivationCountDate] = useState([]);

    const [cardAlertCount, setCardAlertCount] = useState([]);
    const [cardAvgActivationCount, setCardAvgActivationCount] = useState([]);
    const [cardTotalActivationCount, setCardTotalActivationCount] = useState([]);
    const [CARDURI, setCardURI] = React.useState('');

    var uriActivationAlert = host + server + '/zurn/alertstatus?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDailyActivation = host + server + '/zurn/aggregate/daily/activation?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriActivationCard = host + server + '/zurn/aggregate/activation?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDevices = host + server + '/common/devices?manufacturer=Zurn'

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (devEUIevent, value) => {
        setDeveui(value)
        uriActivationAlert = uriActivationAlert + '&deveui='+value;
        uriDailyActivation = uriDailyActivation + '&deveui='+value;
        uriActivationCard = uriActivationCard + '&deveui='+value;

        uriDevices = uriDevices + '&deveui=' + value;
        if(value.length >0) {
            getActivationAlert(uriActivationAlert);
            getDailyActivation(uriDailyActivation);
            getActivationCard(uriActivationCard);
            getDeviceMeta(uriDevices)
        }
    };

    const handleDatePickerFromChange = ( value) => {
        setDatePickerFrom(dateString1(value))
        uriActivationAlert = host + server + '/zurn/alertstatus?eventdate_from='+dateString1(value) +'&eventdate_to='+datepickerto+'&deveui='+deveui
        uriDailyActivation = host + server + '/zurn/aggregate/daily/activation?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;
        uriActivationCard = host + server + '/zurn/aggregate/activation?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;

        getActivationAlert(uriActivationAlert)
        getDailyActivation(uriDailyActivation)
        getActivationCard(uriActivationCard);
    }

    const handleDatePickerToChange = ( value) => {
        setDatePickerTo(dateString1(value))
        uriActivationAlert = host + server + '/zurn/alertstatus?eventdate_from='+datepickerfrom +'&eventdate_to='+dateString1(value)+'&deveui='+deveui
        uriDailyActivation = host + server + '/zurn/aggregate/daily/activation?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;
        uriActivationCard = host + server + '/zurn/aggregate/activation?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;

        getActivationAlert(uriActivationAlert)
        getDailyActivation(uriDailyActivation)
        getActivationCard(uriActivationCard);
    }


    const getActivationCard = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setCardAlertCount(data?.map((item) => parseInt(item.alert_count)));
            setCardAvgActivationCount(data?.map((item) => parseInt(item.daily_avg_activation_count)));
            setCardTotalActivationCount(data?.map((item) => parseInt(item.tot_activation_count)));
        } catch (error) {
            console.log(error);
        }
    };

    const getActivationAlert = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setTotalUsage(data?.map((item) => parseInt(item.num_uses_tot)));
            setDate(data?.map((item) => item.eventdate));
            setEventtime(data?.map((item) => item.eventtime));
            setTotalUsageURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getDailyActivation = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setActivationCount(data?.map((item) => parseInt(item.activation_count)));
            setActivationCountDate(data?.map((item) => item.eventdate));
            setActivationCountURI(url)
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
        const uriActivationAlertMount = uriActivationAlert + '&deveui=' + defaultZurnDeveui
        getActivationAlert(uriActivationAlertMount);

        const uriDailyActivationMount = uriDailyActivation + '&deveui=' + defaultZurnDeveui
        getDailyActivation(uriDailyActivationMount)

        const uriActivationCardMount = uriActivationCard + '&deveui=' + defaultZurnDeveui
        getActivationCard(uriActivationCardMount)

        const uriDevicesMount = uriDevices
        getDevice(uriDevicesMount)

        const uriDeviceMetaMount = uriDevices + '&deveui=' + defaultZurnDeveui
        getDeviceMeta(uriDeviceMetaMount)

    }, []);

    const seriesActivation = chartSeries("Activation Alert",
        "ActivationAlert",
        totalusage
    )
    const optionsActivation = getChartOptions('line-chart-activation-alert',
        date,
        'Activation Alert Summary',
        'Total Usage Count'
    )

    const seriesDailyActivation = chartSeries("Daily Activation Count",
        "Daily Activation Count",
        activationcount
    )
    const optionsDailyActivation = getChartOptions('line-chart-activation-count',
        activationcountdate,
        'Daily Activation Count',
        'Activation Count'
    )


    return (

        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{ bgcolor: "green" }}>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>

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
            <Box gridColumn="span 2">
            </Box>
            <Box gridColumn="span 4">

                <Item>
                    <h3> {store[0]} {restroomlocation[0]} {devicetype[0]}: Activation </h3>
                    <Item> ({datepickerfrom}  to   {datepickerto}) </Item>
                </Item>
            </Box>



            <Box gridColumn="span 1"></Box>

            <Box gridColumn="span 1"> </Box>
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
            <Box gridColumn="span 1">
                <Item2>
                    <h3> {cardAlertCount}  </h3>
                    Alert
                </Item2>
            </Box>

            <Box gridColumn="span 2">
                <Item2>
                    <h3>   {cardAvgActivationCount} </h3>
                    Daily Weekday's Average
                </Item2>
            </Box>
            <Box gridColumn="span 1">
                <Item2>
                    <h3> {cardTotalActivationCount} </h3>
                    Count
                </Item2>
            </Box>
            <Box gridColumn="span 2"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 5">
                <Item>
                    <Chart
                        options={optionsActivation}
                        series={seriesActivation}
                        type="line"
                        width="90%"
                    />
                </Item>

            </Box>

            <Box gridColumn="span 5">
                <Item> <Chart
                    options={optionsDailyActivation}
                    series={seriesDailyActivation}
                    type="line"
                    width="90%"
                />
                </Item>
            </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
        </Box>
    )
}

export default ZurnAnalytics;