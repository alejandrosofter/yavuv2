import { Field } from 'formik'
import { TextField } from 'formik-mui';
export default function Input({campo,label,type,disabled}){
    return  <Field name={campo} fullWidth type={type}  disabled={disabled} variant="outlined" label={label} component={TextField} />

}