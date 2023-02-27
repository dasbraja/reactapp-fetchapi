import React, { useEffect, useState } from 'react';
import {Item, priorDays, today} from '../Utils';
import {server} from '../config'
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import host from '../lib/hostName'


const MasterData = () => {

    const [deviceEventTableData, setDeviceEventTableData] = useState([])
    const [deviceTableData, setDeviceTableData] = useState([])

    var uriDeviceEventType = host + server + '/common/deviceeventtype?eventdate_from='+priorDays()
    var uriDevices = host + server + '/common/devices'

    const columnsDeviceEvent = [
        {
            field: 'recordid',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Record ID',
            width: 100
        },
        {
            field: 'devicetype',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Device Type',
            width: 200
        },
        {
            field: 'deveui',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'DEVEUI',
            width: 200
        },
        {
            field: 'eventtype',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Event Type',
            width: 150
        },
    ];
    const columnsDevices = [
        {
            field: 'deveui',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'DEVEUI', width: 200
        },
        {
            field: 'devicetype',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Device Type',
            width: 200
        },
        {
            field: 'location',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Restroom Location',
            width: 150
        },
        {
            field: 'store',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Store',
            width: 150
        },
        {
            field: 'manufacturer',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Manufacturer',
            width: 150
        }


    ];

    const getDeviceEventType = async (url) => {
        try {

            const response = await fetch(url);
            const data = await response.json();
            setDeviceEventTableData(data)
        } catch (error) {
            console.log(error);
        }
    };
    const getDevices = async (url) => {
        try {

            const response = await fetch(url);
            const data = await response.json();
            setDeviceTableData(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDeviceEventType(uriDeviceEventType);
        getDevices(uriDevices);

    }, []);

    return (

        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  sx={{ bgcolor: "green" }} gap={2}  >
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 12"> </Box>
            <Box gridColumn="span 1"> </Box>

            <Box gridColumn="span 5"><Item> <h3> Device Event Type (  {priorDays()}  to   {today()} )</h3> </Item></Box>

            <Box gridColumn="span 5"> <Item> <h3> Device List</h3> </Item> </Box>
            <Box gridColumn="span 1"></Box>
            <Box gridColumn="span 1"></Box>
            <Box gridColumn="span 5">
                    <Item>
                    <div style={{ height: 525, width: '100%' }}>
                        <div style={{ display: 'flex', height: '100%', width: '100%'}}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid sx={{
                                    boxShadow: 2,
                                    border: 2,
                                    color: 'black',
                                    borderColor: 'primary.light',
                                    '& .MuiDataGrid-cell:hover': {
                                        color: 'primary.main',

                                    },
                                }} getRowId={row => parseInt(row.recordid)}
                                          rows={deviceEventTableData}
                                          columns={columnsDeviceEvent}
                                          headerHeight={80}
                                          pageSize={7}
                                          rowsPerPageOptions={[7]}
                                          disableSelectionOnClick
                                          experimentalFeatures={{ newEditingApi: true }}
                                          components={{
                                              Toolbar: GridToolbar,
                                          }}
                                />
                            </div>
                            <div> </div>


                        </div>
                    </div>
                        </Item>

            </Box>

            <Box gridColumn="span 5">
                <Item>
                <div style={{ height: 525, width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid sx={{
                                boxShadow: 2,
                                border: 2,
                                color: 'black',
                                borderColor: 'primary.light',
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                            }} getRowId={row => row.deveui}
                                      rows={deviceTableData}
                                      columns={columnsDevices}
                                      headerHeight={80}
                                      pageSize={7}
                                      rowsPerPageOptions={[7]}
                                      disableSelectionOnClick
                                      experimentalFeatures={{ newEditingApi: true }}
                                      components={{
                                          Toolbar: GridToolbar,
                                      }}
                            />
                        </div>
                        <div> </div>
                    </div>
                </div>
               </Item>
            </Box>
        </Box>


    )
}

export default MasterData;