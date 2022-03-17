import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { useTheme } from "@emotion/react";
import { CircularProgress,FormControl,InputLabel, MenuItem, OutlinedInput } from "@mui/material";
import Loader from "../loader";
import Select2 from 'react-select'
import {getItemArray} from "../../helpers/arrays"
const SelectFormik = ({label,campo,lista,campoLabel,campoId,callbackchange,extraData,multiple}) => {
    if(!lista)return "cargando"
const datos=lista.map(item=>{  return {label:item[campoLabel],value:item[campoId]} })
  return (
<FormControl fullWidth>
  
  <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
  <Field label={label} name={campo} id={campo} >
    {(props) =>{
        const handleChange = (item) => {
          const registro=getItemArray({data:lista,valor:item?.value,campoId:"id"})
         
          props.form.setFieldValue(campo,item)
          props.form.setFieldValue(`label_${campo}`,item?.label)
          if(extraData)extraData.forEach(field=> {
            console.log(`${campo}_${field}`)
            props.form.setFieldValue(`${campo}_${field}`,registro?.[field])
          })
         
          
          if(callbackchange)callbackchange(item,registro)
        }
    return( 
    <Select2
    menuPortalTarget={document.body}
    menuPosition={'fixed'} 
    styles={ {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }}
    id={`${campo}`}
    defaultValue={props.form.values[campo]}
    label={`${label}`}
    isClearable={true}
    isMulti={multiple}
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
