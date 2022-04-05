import Grid from '@mui/material/Grid';
import Input from "../forms/input";


import SelectFormik from "../forms/select";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";
import SelectEstaticFormik from '../forms/selectEstaticFormik';

export default function FormDisparador({mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={3}><Input campo='nombre' label="Nombre" /></Grid>
            <Grid item md={3}><Input campo='canal' label="Canal" /></Grid>
            <Grid item md={12}><Input campo='condicion' label="Condicion" /></Grid>
            <Grid item md={3}><Input campo='accionSemana' label="Semana" /></Grid>
            <Grid item md={3}><Input campo='accionHora' label="Hora" /></Grid>
            <Grid item md={3}><Input campo='accionMinuto' label="Minuto" /></Grid>
            <Grid item md={3}><Input campo='cantidad' label="Cantidad Mins" /></Grid>
            
            
          </Grid>
        
       
    )
}