import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import React, {useState} from "react";
import {Item2} from "../Utils";

const CustomDatePicker = ({label, value, handleDatePickerChange}) => {
    const [error, setError] = useState(null);

   return (
       <Item2>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DesktopDatePicker
               label={label}
               inputFormat="YYYY-MM-DD"
               value={value}
               onKeyPress={(e) => {
                   e.preventDefault();
               }}
               size="small"
               onKeyDown={(e) => {
                   if (e.code !== "Backspace") {
                       e.preventDefault();
                   }
               }}
               onError={(reason) => {
                   setError("Entered error with reason:" + reason);
               }}
               onChange={handleDatePickerChange}
               renderInput={(params) => <TextField {...params} />}
           />
       </LocalizationProvider>
       </Item2>
       );

};

export default CustomDatePicker;