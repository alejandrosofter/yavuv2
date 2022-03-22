import Grid from '@mui/material/Grid';
import Input from "../../forms/input";
import Switch from "../../forms/switch";

import SelectStatik from '../../forms/selectEstaticFormik';
export default function FormCategoriaSocio({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
    return(
       
         <Grid container spacing={2}>
            <Grid item md={3}><SelectStatik items={["ALTA","BAJA","SUSPENDIDO"]} campo='estado' label="Estado" /></Grid>
         
            <Grid item md={6}><Input campo='detalle' label="Detalle" /></Grid>
            <Grid item md={2}><Switch campo='default' label="Default" /></Grid>
          </Grid>
         
       
    )
}