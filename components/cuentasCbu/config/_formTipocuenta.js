import Grid from '@mui/material/Grid';
import Input from "../../forms/input";
import Switch from "../../forms/switch";

import SelectStatik from '../../forms/selectEstaticFormik';
export default function Form({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
    return(
       
         <Grid container spacing={2}>
  
            <Grid item md={6}><Input campo='nombre' label="Nombre" /></Grid>
          </Grid>
         
       
    )
}