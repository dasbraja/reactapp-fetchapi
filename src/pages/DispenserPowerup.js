import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import {Item, MenuProps, priorDays, today} from '../Utils';
import {server, defaultDispenserDeveui, day_from} from '../config'
import host from '../lib/hostName'
import {
    chartSeries,
    getChartOptions
} from '../component/chart'


const PowerUp = () => {

    const [deveui, setDeveui] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [deviceload, setDeviceLoad] = useState([]);

    const [eventhour, setEventHour] = useState([]);
    const [eventdate, setEventDate] = useState([]);
    const [eventime, setEventtime] = useState([]);
    const [URI, setURI] = React.useState('');



    var uriDispenserPowerup = host + server + '/gp/dispenserpowerup?eventdate_from='+priorDays()
    var uriDevices = host + server + '/common/devices?manufacturer=GeorgiaPacific'

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (devEUIevent, key) => {
        setDeveui(devEUIevent.target.value)
        uriDispenserPowerup = uriDispenserPowerup + '&deveui='+devEUIevent.target.value;
        getDispenserPowerupData(uriDispenserPowerup);
    };

    const getDispenserPowerupData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setEventHour(data?.map((item) => parseInt(item.eventhour)));
            setEventDate(data?.map((item) => item.eventdate));
            setEventtime(data?.map((item) => item.eventtime));
            setURI(url)
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

    useEffect(() => {
            const uriDispenserPowerupMount = uriDispenserPowerup + '&deveui=' + defaultDispenserDeveui
            setDeveui(defaultDispenserDeveui)
            getDispenserPowerupData(uriDispenserPowerupMount)

            const uriDevicesMount = uriDevices
            getDevice(uriDevicesMount)

    }, []);



    const seriesDispnserPowerUp = chartSeries("Powerup Event Hour",
        "Powerup Event Hour",
        eventhour
    )

    const optionsDispnserPowerUp  = getChartOptions('line-chart-fuel-gauge',
        eventime,
        'Dispenser Power up Trend',
        'Power Up Hour'
    )



    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ bgcolor: "green" }} gap={2}>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 3"> </Box>

            <Box gridColumn="span 4">
                <Item>
                    <div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">DevEUI</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select1"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            label="DevEUI"
                            value={deveui}
                            onChange={handleChange}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {deviceload.map( item => (
                                <MenuItem key={item.deveui} value={item.deveui}>
                                    {item.store} {item.location}   {item.devicetype} - {item.deveui}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div></Item>
            </Box>
            <Box gridColumn="span 2">
                <Item>
                    <h3> Last {day_from} days: </h3>
                    <Item>({priorDays()}  to   {today()})</Item>
                </Item>
            </Box>
            <Box gridColumn="span 2">
            </Box>




            <Box gridColumn="span 1"></Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 3"> </Box>
            <Box gridColumn="span 6">
                <Item>
                    <Chart
                        options={optionsDispnserPowerUp}
                        series={seriesDispnserPowerUp}
                        type="bar"
                        width="95%"
                    />
                </Item>

            </Box>

            <Box gridColumn="span 2">
            </Box>
            <Box gridColumn="span 1"> </Box>
            <Box gridColumn="span 6">
            </Box>
            <Box gridColumn="span 6">
            </Box>
        </Box>

    )
}

export default PowerUp;