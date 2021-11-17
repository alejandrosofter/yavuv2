import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { useTheme } from "@emotion/react";
import { CircularProgress,FormControl,InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Loader from "../loader";


const SelectFormik = ({label,campo,lista,campoLabel,campoId}) => {
console.log(lista)
  return (
<FormControl fullWidth>
  <InputLabel id={`label_${campo}`}>{`${label}`}</InputLabel>
  <Field label={label} name={campo} id={campo} >
    {(props) =>{
        const handleChange = (event) => {
            props.form.setFieldValue(campo,event.target.value);
        };
    return( 
    <Select
    labelId={`label_${campo}`}
    id={`${campo}`}
    value={props.field.value}
    label={`${label}`}
    onChange={handleChange}>

      {lista && lista.map(item=>
          <MenuItem key={`item_${item[campoId]}`} value={item[campoId]}>{`${item[campoLabel]}`}</MenuItem>
      )}
    
  </Select>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default SelectFormik;
