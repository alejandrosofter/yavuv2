import Grid from '@mui/material/Grid';
import Input from "../forms/input";


import SelectFormik from "../forms/select";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";
import SelectEstaticFormik from '../forms/selectEstaticFormik';

export default function FormularioPeriodo({mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={3}><Input campo='nombrePeriodo' label="Nombre" /></Grid>
            <Grid item md={2}><SelectEstaticFormik items={["ACTIVA","RECESO","SUSPENDIDA","FINALIZADA"]}  label="ESTADO" campo="estado"/></Grid>
       
            
          </Grid>
        
       
    )
}