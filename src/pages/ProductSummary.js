import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import Box from '@mui/material/Box';
import {dateString1, Item, Item2, MenuProps, priorDays, today} from '../Utils';
import {server, defaultDispenserDeveui} from '../config'
import host from '../lib/hostName'
import {
    chartSeries,
    getChartOptions,
    getChartOptionsMultiple
} from '../component/chart'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import CustomDatePicker from "../component/DatePicker";


const ProductSummary = () => {

    const [deveui, setDeveui] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [error, setError] = useState(null);
    const [datepickerfrom, setDatePickerFrom] = useState(priorDays());
    const [datepickerto, setDatePickerTo] = useState(today());

    const [devicetype, setDeviceType] = useState([]);
    const [restroomlocation, setRestroomLocation] = useState([]);
    const [store, setStore] = useState([]);
    const [devicemetaURI, setDeviceMetaURI] = React.useState('');


    const [productusage, setProductUsage] = useState([]);
    const [roll0productusage, setRoll0ProductUsage] = useState([]);
    const [roll1productusage, setRoll1ProductUsage] = useState([]);

    const [deviceload, setDeviceLoad] = useState([]);

    const [PRODUCTUSAGEURI, setProductUsageURI] = React.useState('');
    const [productusagedate, setProductUsageDate] = useState([]);

    const [dispense, setDispense] = useState([]);
    const [DISPENSEURI, setDispenseURI] = React.useState('');
    const [dispensedate, setDispenseDate] = useState([]);

    const [productcardrusage, setProductCardUsage] = useState([]);
    const [productcardrdispense, setProductCardDispense] = useState([]);
    const [productcardURI, setDProductCardURI] = React.useState('');


    var uriProductUsage = host + server + '/gp/aggregate/daily/productusage?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDispense = host + server + '/gp/aggregate/daily/dispense?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDevices = host + server + '/common/devices?manufacturer=GeorgiaPacific'

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (devEUIevent, value) => {
        setDeveui(value)

        uriProductUsage = uriProductUsage + '&deveui='+value;
        uriDispense = uriDispense + '&deveui='+value;
        uriProductCard = uriProductCard + '&deveui='+value;
        uriDevices = uriDevices + '&deveui=' + value;
        if(value.length >0) {
            getDailyProductUsage(uriProductUsage);
            getDailyDispense(uriDispense);
            getProductCard(uriProductCard);
            getDeviceMeta(uriDevices)
        }

    };

    const handleDatePickerFromChange = ( value) => {
        setDatePickerFrom(dateString1(value))
        uriProductUsage = host + server + '/gp/aggregate/daily/productusage?eventdate_from='+dateString1(value) +'&eventdate_to='+datepickerto+'&deveui='+deveui
        uriDispense = host + server + '/gp/aggregate/daily/dispense?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;
        uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;

        getDailyProductUsage(uriProductUsage)
        getDailyDispense(uriDispense)
        getProductCard(uriProductCard);
    }

    const handleDatePickerToChange = ( value) => {
        setDatePickerTo(dateString1(value))
        uriProductUsage = host + server + '/gp/aggregate/daily/productusage?eventdate_from='+datepickerfrom +'&eventdate_to='+dateString1(value)+'&deveui='+deveui
        uriDispense = host + server + '/gp/aggregate/daily/dispense?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;
        uriProductCard = host + server + '/gp/aggregate/productcard?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;

        getDailyProductUsage(uriProductUsage)
        getDailyDispense(uriDispense)
        getProductCard(uriProductCard);
    }

    const getDailyProductUsage = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setProductUsage(data?.map((item) => parseFloat(item.product_usage)));
            setRoll0ProductUsage(data?.map((item) => parseFloat(item.roll0_product_usage)));
            setRoll1ProductUsage(data?.map((item) => parseFloat(item.roll1_product_usage)));
            setProductUsageDate(data?.map((item) => item.eventdate));
            setProductUsageURI(url)

        } catch (error) {
            console.log(error);
        }
    };

    const getDailyDispense = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDispense(data?.map((item) => parseInt(item.dispense_count)));
            setDispenseDate(data?.map((item) => item.eventdate));
            setDispenseURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getProductCard = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setProductCardUsage(data?.map((item) => parseFloat(item.product_usage)));
            setProductCardDispense(data?.map((item) => parseInt(item.dispense_count)));
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
            setDeveui(defaultDispenserDeveui)
            const uriProductUsageMount = uriProductUsage + '&deveui=' + defaultDispenserDeveui
            getDailyProductUsage(uriProductUsageMount)
            const uriDispenseMount = uriDispense + '&deveui=' + defaultDispenserDeveui
            getDailyDispense(uriDispenseMount)
            const uriProductCardMount = uriProductCard + '&deveui=' + defaultDispenserDeveui
            getProductCard(uriProductCardMount)

            const uriDevicesMount = uriDevices
            getDevice(uriDevicesMount)

            const uriDeviceMetaMount = uriDevices + '&deveui=' + defaultDispenserDeveui
            getDeviceMeta(uriDeviceMetaMount)

    }, []);

    const seriesDispense = chartSeries("Dispense",
        "Dispense",
        dispense
    )
    const optionsDispense = getChartOptions('line-chart-dispense',
        dispensedate,
        'Daily Dispense Summary',
        'Dispense Count'
    )

    const seriesProductUsage = [ //data on the y-axis
        {

            name: 'Product Usage',
            label: 'ProductUsage',
            data: productusage
        },
        {
            name: 'Bottom Roll Usage',
            label: 'Roll0ProductUsage',
            data: roll0productusage
        },
        {
            name: 'Top Roll Usage',
            label: 'Roll1ProductUsage',
            data: roll1productusage
        }
    ];

    const optionsProductUsage = getChartOptionsMultiple('product-usage-line-chart',
        'line',
        false,
        productusagedate,
        'Daily Product Usage Summary',
        'Consumption',
        [ '#009966', '#FFBF00', '#1175A8', '#DBA800'],
        false
    );

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
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 4">
                <Item>
                    <h3 color={"#7CFC00"}>
                        {store[0]} {restroomlocation[0]} {devicetype[0]} : Product Summary
                    </h3>
                    ({datepickerfrom}  to   {datepickerto})
                </Item>

            </Box>
            <Box gridColumn="span 2"> </Box>
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
                    label="Date To"
                    value={datepickerto}
                    handleDatePickerChange={handleDatePickerToChange}
                />
            </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 2">
                <Item2>
                    <h3> {productcardrusage} </h3>
                        Product Usage
                </Item2>
            </Box>

            <Box gridColumn="span 2">
                <Item2>
                    <h3>  {productcardrdispense} </h3>
                        Dispense
                </Item2>
            </Box>
            <Box gridColumn="span 1"></Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 5">
                <Item>
                    <Chart
                        options={optionsProductUsage}
                        series={seriesProductUsage}
                        type="line"
                        width="90%"
                    />
                </Item>

            </Box>
            <Box gridColumn="span 5">
                <Item>
                    <Chart
                        options={optionsDispense}
                        series={seriesDispense}
                        type="line"
                        width="90%"
                    />
                </Item>
            </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 12"></Box>

        </Box>

    )
}

export default ProductSummary;
