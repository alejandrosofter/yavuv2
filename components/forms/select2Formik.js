import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { useTheme } from "@emotion/react";
import { CircularProgress,FormControl,InputLabel, MenuItem, OutlinedInput } from "@mui/material";
import Loader from "../loader";
import Select2 from 'react-select'

const SelectFormik = ({label,campo,lista,campoLabel,campoId,callbackchange}) => {
    if(!lista)return "cargando"
const datos=lista.map(item=>{
    return {label:item[campoLabel],value:item[campoId]}
})
  return (
<FormControl fullWidth>
  
  <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
  <Field label={label} name={campo} id={campo} >
    {(props) =>{

        const handleChange = (item) => {
          props.form.setFieldValue(campo,item?.value);
          props.form.setFieldValue(`label_${campo}`,item?.label);
          if(callbackchange)callbackchange(valor)
        }
    return( 
    <Select2
    id={`${campo}`}
    defaultValue={{value:props.form.values[campo],label:props.form.values[`label_${campo}`]}}
    label={`${label}`}
    isClearable={true}
    options={datos}
    placeholder={label}
    onChange={handleChange}/>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default SelectFormik;
