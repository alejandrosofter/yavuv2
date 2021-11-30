import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { FormControl,FormControlLabel, Switch } from "@mui/material";
import { ColorPicker } from 'material-ui-color';

const setValoresIniciales=valor=>{

}
const ColorPickerFormik = ({label,campo}) => {
  return (
<FormControl fullWidth>
  
  <Field label={label} name={campo} id={campo} >
    {(props) =>{
        
        const handleChange = (color) => {
            console.log(color)
            props.form.setFieldValue(campo,color.value);
        };
      
    return( 
        <FormControlLabel control={<ColorPicker value={props.field.value}   onChange={handleChange}  />} label={`${label}`}/>

    )
    }}
    </Field>
</FormControl>
  )
      }

export default ColorPickerFormik;
