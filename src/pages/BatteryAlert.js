import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import {dateString1, Item, Item2, MenuProps, priorDays, today} from '../Utils';
import {server, defaultDispenserDeveui} from '../config'
import host from '../lib/hostName'
import {
    chartSeries,
    getChartOptions,
    getChartOptionsMultiple
} from '../component/chart'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomDatePicker from "../component/DatePicker";


const BatteryAlert = () => {

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

    const [batteryreading, setBatteryReading] = useState([]);
    const [date, setDate] = useState([]);
    const [eventime, setEventtime] = useState([]);
    const [URI, setURI] = React.useState('');

    const [normalcount, setNormalCount] = useState([]);
    const [lowcount, setLowCount] = useState([]);
    const [shutdowncount, setShutdownCount] = useState([]);
    const [batteryalertdate, setBatteryAlertDate] = useState([]);
    const [BATTERYALERTURI, setBatteryAlertURI] = React.useState('');

    const [batterycardnormal, setBatteryCardNormal] = useState([]);
    const [batterycardlow, setBatteryCardLow] = useState([]);
    const [batterycardshutdown, setBatteryCardShutdown] = useState([]);
    const [batterycardURI, setBatteryCardURI] = React.useState('');


    var uriBatteryFuelGauge = host + server + '/gp/batteryfuelgaugehistory?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriBattreryAlert = host + server + '/gp/aggregate/daily/batteryalert?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriBatteryCard = host + server + '/gp/aggregate/batterycard?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDevices = host + server + '/common/devices?manufacturer=GeorgiaPacific'

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (devEUIevent, value) => {
        setDeveui(value)
        uriBatteryFuelGauge = uriBatteryFuelGauge + '&deveui='+value;
        uriBattreryAlert = uriBattreryAlert + '&deveui='+value;
        uriBatteryCard = uriBatteryCard + '&deveui='+value;
        uriDevices = uriDevices + '&deveui=' + value;
        if(value.length >0) {
            getFuelGaugeData(uriBatteryFuelGauge);
            getBatteryAlertData(uriBattreryAlert);
            getBatteryCard(uriBatteryCard);
            getDeviceMeta(uriDevices)
        }

    };

    const handleDatePickerFromChange = ( value) => {
        setDatePickerFrom(dateString1(value))
        uriBatteryFuelGauge = host + server + '/gp/batteryfuelgaugehistory?eventdate_from='+dateString1(value) +'&eventdate_to='+datepickerto+'&deveui='+deveui
        uriBattreryAlert = host + server + '/gp/aggregate/daily/batteryalert?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;
        uriBatteryCard = host + server + '/gp/aggregate/batterycard?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;

        getFuelGaugeData(uriBatteryFuelGauge)
        getBatteryAlertData(uriBattreryAlert)
        getBatteryCard(uriBatteryCard);
    }

    const handleDatePickerToChange = ( value) => {
        setDatePickerTo(dateString1(value))
        uriBatteryFuelGauge = host + server + '/gp/batteryfuelgaugehistory?eventdate_from='+datepickerfrom +'&eventdate_to='+dateString1(value)+'&deveui='+deveui
        uriBattreryAlert = host + server + '/gp/aggregate/daily/batteryalert?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;
        uriBatteryCard = host + server + '/gp/aggregate/batterycard?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;

        getFuelGaugeData(uriBatteryFuelGauge)
        getBatteryAlertData(uriBattreryAlert)
        getBatteryCard(uriBatteryCard);
    }


    const getFuelGaugeData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setBatteryReading(data?.map((item) => parseInt(item.battery_reading)));
            setDate(data?.map((item) => item.eventdate));
            setEventtime(data?.map((item) => item.eventtime));
            setURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getBatteryAlertData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setNormalCount(data?.map((item) => parseInt(item.normal_count)));
            setLowCount(data?.map((item) => parseInt(item.low_count)));
            setShutdownCount(data?.map((item) => parseInt(item.shutdown_count)));
            setBatteryAlertDate(data?.map((item) => item.eventdate));
            setBatteryAlertURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getBatteryCard = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setBatteryCardNormal(data?.map((item) => parseInt(item.normal_count)));
            setBatteryCardLow(data?.map((item) => parseInt(item.low_count)));
            setBatteryCardShutdown(data?.map((item) => parseInt(item.shutdown_count)));
            setBatteryCardURI(url)
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
            const uriBatteryFuelGaugeMount = uriBatteryFuelGauge + '&deveui=' + defaultDispenserDeveui
            setDeveui(defaultDispenserDeveui)
            getFuelGaugeData(uriBatteryFuelGaugeMount)
            const uriBatteryAlertMount = uriBattreryAlert + '&deveui=' + defaultDispenserDeveui
            getBatteryAlertData(uriBatteryAlertMount)
            const uriBatteryCardMount = uriBatteryCard + '&deveui=' + defaultDispenserDeveui
            getBatteryCard(uriBatteryCardMount)

            const uriDevicesMount = uriDevices
            getDevice(uriDevicesMount)

            const uriDeviceMetaMount = uriDevices + '&deveui=' + defaultDispenserDeveui
            getDeviceMeta(uriDeviceMetaMount)

    }, []);

    const seriesBatteryAlert = [ //data on the y-axis
        {

            name: 'Normal',
            label: 'Normal',
            data: normalcount
        },
        {
            name: 'Low',
            label: 'Low',
            data: lowcount
        },
        {
            name: 'Shutdown',
            label: 'Shutdown',
            data: shutdowncount
        }
    ];

    const optionsBatteryAlert = getChartOptionsMultiple('battery-alert-bar-chart',
        'bar',
        true,
        batteryalertdate,
        'Daily Battery Alert Summary',
        'Count',
        [ '#009966', '#FFBF00', '#1175A8', '#DBA800'],
        true
    );



    const seriesFuelGauge = chartSeries("Battery Remaining",
        "Battery Remaining",
        batteryreading
    )

    const optionsFuelGauge = getChartOptions('line-chart-fuel-gauge',
        eventime,
        'Dispenser Battery Fuel Gauge Trend',
        'Battery Remaining %'
    )



    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ bgcolor: "green" }} gap={2}>
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
                    <h3 color={"#7CFC00"}>{store[0]} {restroomlocation[0]} {devicetype[0]}: Battery Alert
                    </h3>
                    ({datepickerfrom}  to   {datepickerto})
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
            <Box gridColumn="span 2"> </Box>
            <Box gridColumn="span 2">
                <Item2>
                    <h3> {batterycardshutdown}</h3>
                    Shutdown
                </Item2>
            </Box>
            <Box gridColumn="span 1">
                <Item2>
                    <h3> {batterycardlow} </h3>
                    Low
                </Item2>
            </Box>

            <Box gridColumn="span 1">
                <Item2>
                    <h3> {batterycardnormal} </h3>
                    Normal
                </Item2>
            </Box>

            <Box gridColumn="span 4"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 5">
                <Item>
                    <Chart
                        options={optionsFuelGauge}
                        series={seriesFuelGauge}
                        type="line"
                        width="90%"
                    />
                </Item>

            </Box>

            <Box gridColumn="span 5">
                <Item><Chart
                    options={optionsBatteryAlert}
                    series={seriesBatteryAlert}
                    type="bar"
                    width="90%"
                /></Item>
            </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 6">
            </Box>
            <Box gridColumn="span 6">
            </Box>
        </Box>

    )
}

export default BatteryAlert;