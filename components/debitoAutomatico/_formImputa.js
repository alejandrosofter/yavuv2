import Grid from '@mui/material/Grid';
import Input from "../forms/input";
import SelectFile from "../forms/fileAnyUploadFormik"

import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from '../forms/selectEstaticFormik';


export default function FormImputa({mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={2}><SelectFecha campo='fecha' label="Fecha" /></Grid>
            <Grid item md={3}><SelectFile folder={`debitoAutomatico/`} campo='archivo' label="Archivo" /></Grid>
            <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","PROCESADO"]}  label="ESTADO" campo="estado"/></Grid>
            
            
          </Grid>
        
       
    )
}