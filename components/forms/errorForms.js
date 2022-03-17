import { Alert } from '@mui/material';
const getErrorObjecto=(err,k)=>{
    let mensaje=`Errores ${k}: `
    for(const key in err[k])mensaje+=`${err[k][key]} | `
    return mensaje
}
export default function ErrorsForm({errors}){
    let errores=""
    let i=1
    for (var key in errors) {
        const errorMsg=typeof errors[key] =="object"?getErrorObjecto(errors,key):errors[key]
        errores+=`${i}.- ${errorMsg} | `
        i++
      }
      if(errores==="") return <Alert severity="success">Datos correctos!</Alert>
    return(
<Alert severity="error">{errores}</Alert>
    )
}