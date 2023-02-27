import { Outlet } from "react-router-dom";
import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import useStyles from '../component/appbar'
import RESTROOM from '../images/restroom.png';
import Box from "@mui/material/Box";
import {Item} from '../Utils';

import Navbar from "../component/Navbar";


import {
    Toolbar,
    CssBaseline,
    Typography
} from "@material-ui/core";




const Layout = () => {
    const classes = useStyles();

    return (
        <>

            <MuiAppBar position="static"   sx={{ bgcolor: "green" }} >
                <CssBaseline />
                <Toolbar>
                <nav>
                    <div>

                        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ bgcolor: "green" }} gap={1}>
                            <Box gridColumn="span 1"> </Box>
                            <Box gridColumn="span 11">
                            <Typography variant="h5" align="center">
                                <img src={RESTROOM} alt="Restroom Logo" />
                                <Item ></Item>
                            </Typography>

                            </Box>
                        </Box>

                    </div>
                    <div className={classes.navlinks} width="100%">

                        <Navbar />
                    </div>

                </nav>
                </Toolbar>
            </MuiAppBar>


        <Outlet />

        </>



    )
};

export default Layout;


