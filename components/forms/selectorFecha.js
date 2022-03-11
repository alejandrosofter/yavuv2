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
const SelectFecha = ({label,campo}) => {
    const [value, setValue] = useState();

  return (
<FormControl fullWidth>

  <Field label={label} name={campo} id={campo} >
    {(props) =>{
       
        const handleChange = (newValue) => {
          
          const nuevoValor={seconds:newValue.getTime()/1000,nanoseconds:0}
        
            setValue(newValue.getTime()/1000);
            props.form.setFieldValue(campo,nuevoValor);
          };
    return( 
        <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DesktopDatePicker
           label={label}
           inputVariant="outlined"
           inputFormat="dd/MM/yyyy"
           value={(props.form.values[campo])?new Date(props.form.values[campo].seconds * 1000):""}
           onChange={handleChange}
           KeyboardButtonProps={{
             "aria-label": "change date"
           }}
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
