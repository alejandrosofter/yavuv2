import Grid from '@mui/material/Grid';
import Input from "../forms/input";


import SelectFormik from "../forms/select";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";
import SelectEstaticFormik from '../forms/selectEstaticFormik';

export default function FormularioItemCobro({mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={3}><Input campo='detalle' label="Detalle" /></Grid>
            <Grid item md={3}><Input campo='importe' label="Importe" /></Grid>
            <Grid item md={3}><Input campo='importeBonificacion' label="$ Bonif." /></Grid>
            
            
          </Grid>
        
       
    )
}