import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { useTheme } from "@emotion/react";
import { CircularProgress,FormControl,InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Loader from "../loader";


const SelectFormik = ({label,campo,lista,campoLabel,campoId,callbackchange}) => {

  return (
<FormControl fullWidth>
  <InputLabel id={`label_${campo}`}>{`${label}`}</InputLabel>
  <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
  <Field label={label} name={campo} id={campo} >
    {(props) =>{
        const handleChange = (event,p) => {
        
          props.form.setFieldValue(campo,event.target.value);
          props.form.setFieldValue(`label_${campo}`,p.props.children);
          if(callbackchange)callbackchange(event.target.value)
        };
    return( 
    <Select
    labelId={`label_${campo}`}
    id={`${campo}`}
    value={props.field.value}
    label={`${label}`}
    onChange={handleChange}>

      {lista && Array.isArray(lista) && lista.map(item=>{
        const lab=(typeof campoLabel=="string")?item[campoLabel]:campoLabel(item)
        return(<MenuItem key={`item_${item[campoId]}`} value={item[campoId]}>{`${lab}`}</MenuItem>)
      }
          
      )}
    
  </Select>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default SelectFormik;
