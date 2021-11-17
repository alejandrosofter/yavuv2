import { Checkbox } from 'formik-mui';
import Switch from '@mui/material/Switch';

import { Field } from 'formik'
import { useState } from 'react';
import { FormControlLabel } from '@mui/material';


const CustomInputComponent = ({
        field, // { name, value, onChange, onBlur }
        form: {  errors,setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...props
      }) => {

    

        return (
                <div>
                 <Switch
              name={field.name}
              value={true}
              checked={field.value === true}
              onChange={(event, checked) => {
                setFieldValue(field.name, checked ? true : false);
              }}
            />
                 
                </div>
              );
      }
export default function CheckboxForm({campo,label}){
    
        return (
                <Field name={campo} label={label}>
 {({ field, form, meta }) => (
          <FormControlLabel size="small"
          control={
                <Switch
                name={field.name}
                value={true}
                checked={field.value === true}
                onChange={(event, checked) => {
                    form.setFieldValue(field.name, checked ? true : false);
                }}
              />
          }
          label={label}
        />
    
 )}
 </Field>
             )
        
}