import Grid from '@mui/material/Grid';
import Input from "../forms/input";


import SwitchFormik from "../forms/switch";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";

export default function FormItem({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
    return(
       
         <Grid container spacing={2}>
            <Grid item md={6}><Input campo='cantidad' label="Cant" /></Grid>
            <Grid item md={6}><Input campo='detalle' label="Detalle" /></Grid>
           
            <Grid item md={3}><Input campo='importe' label="Importe" /></Grid>
            
          </Grid>
       
    )
}