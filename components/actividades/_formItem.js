import Grid from '@mui/material/Grid';
import Input from "../forms/input";


import SelectFormik from "../forms/select";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";
import SelectEstaticFormik from '../forms/selectEstaticFormik';

export default function FormularioItemActividad({profesores,mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={3}><Input campo='nombreActividad' label="Nombre" /></Grid>
            <Grid item md={3}><Input campo='importe' label="Importe" /></Grid>
            <Grid item md={2}><SelectEstaticFormik items={["ACTIVA","RECESO","SUSPENDIDA"]}  label="ESTADO" campo="estado"/></Grid>
            <Grid item md={3}><SelectFormik campo='profesor' label="Profesor" lista={profesores} campoId="id" 
            campoLabel={item=>`${item.apellido} ${item.nombre}`} /></Grid>
            <Grid item md={3}><SelectFormik campo='concepto' label="Concepto" lista={mod.config.itemsTipos} campoId="id" 
            campoLabel={item=>`${item.detalle}`} /></Grid>
            <Grid item md={8}><Input campo='detalle' label="Detalle de la Actividad" /></Grid>
            
          </Grid>
        
       
    )
}