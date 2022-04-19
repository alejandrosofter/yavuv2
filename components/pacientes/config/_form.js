import Grid from '@mui/material/Grid';
import Input from "@components/forms/input";

import SelectBootWeb from "@components/bootsWeb/selectBootWeb"
export default function Form({setFieldValue}){
   const cambia=(valor,data)=>{
       const params=data?data.entradas.map(item=>`${item.nombre}=`).join("\n"):""
       setFieldValue("parametros",params)
       
   }
    return(
       
         <Grid container spacing={2}>
            <Grid item md={6}><SelectBootWeb callbackchange={cambia} /></Grid>
            <Grid item md={6}><Input multiline={true} rows={10} campo="parametros" label="Parametros" /></Grid>
          </Grid>
         
       
    )
}