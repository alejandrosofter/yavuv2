import CheckList from "./checkList"
import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { FormControl,Stack } from "@mui/material";

import {getItemArray} from "../../helpers/arrays"
const CheckListFormik = ({label,campo,lista,campoLabel,campoId,callbackchange,fnTransformItem}) => {
    if(!lista)return "cargando"
  return (
<FormControl fullWidth>
  
  <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
  <Field label={label} name={campo} id={campo} >
    {(props) =>{
   
        const handleChange = (items) => {
    
          props.form.setFieldValue(campo,items)
          if(callbackchange)callbackchange(items)
          
        }
    return( 
        <Stack>
            <CheckList items={lista} callbackcambia={handleChange} campoId={campoId} campoLabel={campoLabel}
            fnTransformItem={fnTransformItem}/> 
           
         </Stack>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default CheckListFormik;
