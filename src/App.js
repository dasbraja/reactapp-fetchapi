import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import React, {Component} from "react";
import ProductSummary from "./pages/ProductSummary";
import ZurnAnalytics from "./pages/Zurn";
import MasterData from "./pages/MasterData";
import {MuiThemeProvider,  createTheme} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ProductAlert from "./pages/ProductAlert";
import BatteryAlert from "./pages/BatteryAlert";
import ZurnEvents from "./pages/ZurnEvents";
import PowerUp from "./pages/DispenserPowerup";
import CoverEvent from "./pages/CoverEvents";




const themeLight = createTheme({
    palette: {
        background: {
            default: "green"
        }
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={themeLight}>
                <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/restroom" element={<Layout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="masterdata" element={<MasterData />} />
                        <Route path="productusage" element={<ProductSummary />} />
                        <Route path="productalert" element={<ProductAlert />} />
                        <Route path="batteryalert" element={<BatteryAlert />} />
                        <Route path="activationsummary" element={<ZurnAnalytics />} />
                        <Route path="activationevents" element={<ZurnEvents />} />
                        <Route path="powerup" element={<PowerUp />} />
                        <Route path="coverevent" element={<CoverEvent />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </MuiThemeProvider>
        )
    };
}

export default App;