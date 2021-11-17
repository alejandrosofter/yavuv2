import { Field } from 'formik'
import { TextField } from 'formik-mui';
export default function Input({campo,label,type}){
    return  <Field name={campo} fullWidth type={type}  variant="outlined" label={label} component={TextField} />

}