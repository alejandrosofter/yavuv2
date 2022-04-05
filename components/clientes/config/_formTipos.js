import Grid from '@mui/material/Grid';
import Input from "../../forms/input";

import Select2 from '../../forms/select2Formik';
import Switch from '../../forms/switch';
export default function Form({dataModulo,modelo,clickAceptar,valoresIniciales}){
   
    return(
       
         <Grid container spacing={2}>
            <Grid item md={6}><Input campo='nombre' label="Nombre" /></Grid>
            <Grid item md={3}><Switch campo='esEmpresa' label="Es Empresa" /></Grid>
            <Grid item md={3}><Switch campo='default' label="Default" /></Grid>
          </Grid>
         
       
    )
}