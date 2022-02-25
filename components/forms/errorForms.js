import { Alert } from '@mui/material';
export default function ErrorsForm({errors}){
    let errores=""
    let i=1
    for (var key in errors) {
        errores+=`${i}.- ${errors[key]} | `
        i++
      }
      if(errores==="") return <Alert severity="success">Datos correctos!</Alert>
    return(
<Alert severity="error">{errores}</Alert>
    )
}