
import { TextField } from "@mui/material";

export default function TextArea({formik,campo,label,filas,sx}){
    return(
        
        <TextField
          fullWidth
          id={campo}
          name={campo}
          label={label}
          multiline
          rows={filas?filas:3}
          value={formik.values[campo]}
          onChange={formik.handleChange}
          error={formik.touched[campo] && Boolean(formik.errors[campo])}
          helperText={formik.touched[campo] && formik.errors[campo]}
        />
    )
}
