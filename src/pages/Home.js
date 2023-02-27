import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { Item, priorDays, today} from '../Utils';
import {server, day_from} from '../config'
import {
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import host from '../lib/hostName'
import {getChartOptionsMultiple} from "../component/chart";


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}



const Home = () => {

    const getRowSpacing = React.useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);


    const [activeDevice, setActiveDevice] = useState([])
    const [reportedDevice, setReportedDevice] = useState([])
    const [activeAlertDevice, setActiveAlertDevice] = useState()

    const [devicetypeAggregateTable, setDevicetypeAggregateTable] = useState([])
    const [devicetypeAggregate, setDevicetypeAggregate] = useState([])
    const [activeDevicesAggregate, setActiveDevicesAggregate] = useState([])

    const [soapDispenserCount, setSoapDispenserCount] = useState([])
    const [paperTowelDispenserCount, setPaperTowelDispenserCount] = useState([])
    const [toiletPaperDispenserCount, setToiletPaperDispenserCount] = useState([])
    const [flushValveCount, setFlushValveCount] = useState([])
    const [faucetCount, setFaucetCount] = useState([])
    const [messageType, setMessageType] = useState([])




    var uriActiveReportedDevice = host + server + '/common/aggregate/all?eventdate_from='+priorDays()
    var uriDevicieTypeActiveReported = host + server + '/common/aggregate/devicetype?eventdate_from='+priorDays()
    var uriMessageTypeeActiveReported = host + server + '/common/aggregate/messagetype?eventdate_from='+priorDays()

    const columnsActiveReportedDevices = [
        {
            field: 'devicetype',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Device Type',
            width: 200
        },
        {
            field: 'active_device_count',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Active Devices',
            width: 200,
            fontSize: "bold"
        },
        {
            field: 'reported_device_count',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Reported Devices',
            width: 200
        },
        {
            field: 'active_alert_device_count',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Active Alerted Devices',
            width: 200
        },
    ];

    const chartSeriesFive = [ //data on the y-axis
        {

            name: 'Soap Dispenser',
            label: 'Soap Dispenser',
            data: soapDispenserCount
        },
        {
            name: 'Toilet Paper Dispenser',
            label: 'Toilet Paper Dispenser',
            data: toiletPaperDispenserCount
        },
        {
            name: 'Paper Towel Dispenser',
            label: 'Paper Towel Dispenser',
            data: paperTowelDispenserCount
        },
        {
            name: 'Flush Valve',
            label: 'Flush Valve',
            data: flushValveCount
        },
        {
            name: 'Faucet',
            label: 'Faucet',
            data: faucetCount
        }
    ];
    const optionsMessagType = getChartOptionsMultiple('stackedbar-chart',
        'bar',
        true,
        messageType,
        'Device Type Status',
        'Count',
        [ '#009966', '#F6BE00','#1DB52B','#1175A8','#DBA800'],
        false
        );



    const getAggregateMessageType = async (url) => {
        try {

            const response = await fetch(url);
            const data = await response.json();

            setSoapDispenserCount(data?.map((item) => parseInt(item.soap_dispenser_count)));
            setPaperTowelDispenserCount(data?.map((item) => parseInt(item.papertowel_dispenser_count)));
            setToiletPaperDispenserCount(data?.map((item) => parseInt(item.toiletpaper_dispenser_count)));
            setFlushValveCount(data?.map((item) => parseInt(item.flushvalve_count)));
            setFaucetCount(data?.map((item) => parseInt(item.faucet_count)));
            setMessageType(data?.map((item) => item.message_type));

        } catch (error) {
            console.log(error);
        }
    };
    const getAggregateDeviceType = async (url) => {
        try {

            const response = await fetch(url);
            const data = await response.json();
            setDevicetypeAggregateTable(data)
            //const total = data.reduce((partialSum, a) => parseInt(partialSum)+ parseInt(a), 0);

            setDevicetypeAggregate(data?.map((item) => item.devicetype))
            setActiveDevicesAggregate(data?.map((item) => parseInt(item.active_device_count)))

        } catch (error) {
            console.log(error);
        }
    };
    const getAggregate = async (url) => {
        try {

            const response = await fetch(url);
            const data = await response.json();
            setActiveDevice(data?.map((item) => parseInt(item.active_device_count)));
            setReportedDevice(data?.map((item) => parseInt(item.reported_device_count)));
            setActiveAlertDevice(data?.map((item) => parseInt(item.active_alert_device_count)));

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAggregate(uriActiveReportedDevice);
        getAggregateDeviceType(uriDevicieTypeActiveReported)
        getAggregateMessageType(uriMessageTypeeActiveReported)

    }, []);




    return (

        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  sx={{ bgcolor: "green" }} gap={2}  >
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 2"> </Box>
            <Box gridColumn="span 2">
                <Item>
                    <h3> Last  {day_from} days:  </h3>
                <Item>{priorDays()} to {today()}</Item>
                </Item>
            </Box>

            <Box gridColumn="span 2">
                <Item>
                    <h3>
                    Active Devices:  {activeDevice}
                    </h3>
                <Item>Device reported in last 3 days</Item>
                </Item>
            </Box>
            <Box gridColumn="span 2">
                <Item>
                    <h3> Reported Devices:  {reportedDevice} </h3>
                    <Item>Device reported in last {day_from} days</Item>
                </Item></Box>
            <Box gridColumn="span 2">
                <Item>
                    <h3> Active Alert Devices:  {activeAlertDevice} </h3>
                    <Item>Active Product Low or Empty Alert </Item>
                </Item>
            </Box>

            <Box gridColumn="span 3">

            </Box>

            <Box gridColumn="span 6">
                <Item>
                    <Chart
                        options={optionsMessagType}
                        series={chartSeriesFive}
                        type="bar"
                        width="100%"
                    />
                </Item>
            </Box>

            <Box gridColumn="span 3">
            </Box>
        </Box>


    )
}

export default Home;