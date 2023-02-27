import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import {dateString1, Item, Item2, MenuProps, priorDays, today} from '../Utils';
import {server, defaultDispenserDeveui} from '../config'
import host from '../lib/hostName'
import {
    chartSeries,
    getChartOptions
} from '../component/chart'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomDatePicker from "../component/DatePicker";


const CoverEvent = () => {

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

    const [eventlag, setEventLag] = useState([]);
    const [date, setDate] = useState([]);
    const [eventime, setEventtime] = useState([]);
    const [URI, setURI] = React.useState('');



    const [covereventcardcount, setCoverEventCardCount] = useState([]);
    const [covereventcardlag, setCoverEventCardLag] = useState([]);
    const [CoverEventCardURI, setCoverEventCardURI] = React.useState('');


    var uriCoverEventLag = host + server + '/gp/covereventlag?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriCoverEventCard = host + server + '/gp/aggregate/covereventlag?eventdate_from='+datepickerfrom+'&eventdate_to='+datepickerto
    var uriDevices = host + server + '/common/devices?manufacturer=GeorgiaPacific'

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (devEUIevent, value) => {
        setDeveui(value)
        uriCoverEventLag = uriCoverEventLag + '&deveui='+value;
        uriCoverEventCard = uriCoverEventCard + '&deveui='+value;
        uriDevices = uriDevices + '&deveui=' + value;
        if(value.length >0) {
            getCoverEventLagData(uriCoverEventLag);
            getCoverEventCard(uriCoverEventCard);
            getDeviceMeta(uriDevices)
        }

    };

    const handleDatePickerFromChange = ( value) => {
        setDatePickerFrom(dateString1(value))
        uriCoverEventLag = host + server + '/gp/covereventlag?eventdate_from='+dateString1(value) +'&eventdate_to='+datepickerto+'&deveui='+deveui
        uriCoverEventCard = host + server + '/gp/aggregate/covereventlag?eventdate_from='+dateString1(value)  +'&eventdate_to='+datepickerto+ '&deveui='+deveui;

        getCoverEventLagData(uriCoverEventLag)
        getCoverEventCard(uriCoverEventCard)
    }

    const handleDatePickerToChange = ( value) => {
        setDatePickerTo(dateString1(value))
        uriCoverEventLag = host + server + '/gp/covereventlag?eventdate_from='+datepickerfrom +'&eventdate_to='+dateString1(value)+'&deveui='+deveui
        uriCoverEventCard = host + server + '/gp/aggregate/covereventlag?eventdate_from='+datepickerfrom  +'&eventdate_to='+dateString1(value)+ '&deveui='+deveui;

        getCoverEventLagData(uriCoverEventLag)
        getCoverEventCard(uriCoverEventCard)
    }


    const getCoverEventLagData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setEventLag(data?.map((item) => parseInt(item.second_diff)));
            setEventtime(data?.map((item) => item.eventtime));
            setURI(url)
        } catch (error) {
            console.log(error);
        }
    };

    const getCoverEventCard = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setCoverEventCardCount(data?.map((item) => parseInt(item.count)));
            setCoverEventCardLag(data?.map((item) => parseInt(item.avg_second_diff)));
            setCoverEventCardURI(url)
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
            const uriCoverEventLagMount = uriCoverEventLag + '&deveui=' + defaultDispenserDeveui
            setDeveui(defaultDispenserDeveui)
            getCoverEventLagData(uriCoverEventLagMount)
            const uriCoverEventCardMount = uriCoverEventCard + '&deveui=' + defaultDispenserDeveui
            getCoverEventCard(uriCoverEventCardMount)

            const uriDevicesMount = uriDevices
            getDevice(uriDevicesMount)

            const uriDeviceMetaMount = uriDevices + '&deveui=' + defaultDispenserDeveui
            getDeviceMeta(uriDeviceMetaMount)

    }, []);


    const seriesCoverEventLag = chartSeries("Seconds Lag",
        "Seconds Lag",
        eventlag
    )

    const optionsCoverEventLag = getChartOptions('line-chart-cover-event',
        eventime,
        'Dispenser Cover Open Trend',
        'Seconds Lag'
    )



    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ bgcolor: "green" }} gap={2}>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 2"> </Box>
            <Box gridColumn="span 4">
                <Item>
                    <h3 color={"#7CFC00"}>{store[0]} {restroomlocation[0]} {devicetype[0]}: Cover Event
                    </h3>
                    ({datepickerfrom}  to   {datepickerto})
                </Item>
            </Box>
            <Box gridColumn="span 2">
                <Item2>
                    <h3> {covereventcardcount}</h3>
                    Count
                </Item2>
            </Box>
            <Box gridColumn="span 2">
                <Item2>
                    <h3> {covereventcardlag} </h3>
                    Avg. Open Time
                </Item2>
            </Box>
            <Box gridColumn="span 2"> </Box>
            <Box gridColumn="span 2"> </Box>

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

            <Box gridColumn="span 2"></Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 3"> </Box>
            <Box gridColumn="span 5">
                <Item>
                    <Chart
                        options={optionsCoverEventLag}
                        series={seriesCoverEventLag}
                        type="line"
                        width="100%"
                    />
                </Item>

            </Box>

            <Box gridColumn="span 4">
            </Box>

            <Box gridColumn="span 6">
            </Box>
            <Box gridColumn="span 6">
            </Box>
        </Box>

    )
}

export default CoverEvent;