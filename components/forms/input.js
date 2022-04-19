import { Field } from 'formik'
import { TextField } from 'formik-mui';
export default function Input({campo,label,type,disabled,multiline,rows}){
    return  <Field name={campo} fullWidth type={type} multiline={multiline} rows={rows} disabled={disabled} 
    variant="outlined" label={label} component={TextField} />

}