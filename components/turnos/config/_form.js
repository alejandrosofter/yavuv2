import Grid from '@mui/material/Grid';
import Input from "../../forms/input";
import { useState} from "react"


export default function FormItemConfigActividades({values}){

    return(
      
         <Grid container spacing={2}>

     
                <Grid item md={8}><Input campo='nombre' label="Nombre" /></Grid>
            
                <Grid item md={2}><Input campo='duracion' label="Duración" /></Grid>
        
          </Grid>
       
    )
}