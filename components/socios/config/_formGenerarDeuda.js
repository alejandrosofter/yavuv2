import Grid from '@mui/material/Grid';
import Input from "../../forms/input";

import Select2 from '../../forms/select2Formik';
export default function FormCategoriaSocio({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
    return(
       
         <Grid container spacing={2}>
            <Grid item md={6}><Input campo='nombre' label="Nombre" /></Grid>
         
            <Grid item md={6}><Input campo='fnDeuda' label="Fn" /></Grid>
            <Grid item md={6}><Input campo='condicion' label="Condicion" /></Grid>
            <Grid item md={6}><Input campo='origenDeuda' label="Origen..." /></Grid>
            <Grid item md={6}><Input campo='destinoDeuda' label="Destino..." /></Grid>
            
          </Grid>
         
       
    )
}