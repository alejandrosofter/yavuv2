import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { Box} from "@mui/material"
import { useTheme } from "@emotion/react";
import { FormControl,InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Loader from "../loader";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {getFechaFormik} from "../../helpers/dates"
import { DateTimePicker } from "@mui/lab";

const SelectFecha = ({label,campo,callbackChange}) => {
  
  return (
<FormControl fullWidth>

  <Field label={label} name={campo} id={campo} >
    {(props) =>{
        
        const handleChange = (newValue) => {
            const nuevoValor={seconds:newValue.getTime()/1000,nanoseconds:0}
            props.form.setFieldValue(campo,nuevoValor);
         if(callbackChange)callbackChange(newValue)
          };
    return( 
        <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DateTimePicker
           label={label}
           inputVariant="outlined"
           inputFormat="dd/MM/yyyy hh:mm"
           value={getFechaFormik(props.form.values?.[campo])}
           onChange={handleChange}
           
           renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default SelectFecha;
