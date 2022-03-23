import Grid from '@mui/material/Grid';
import Input from "../forms/input";


export default function FormItem({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
    return(
       
         <Grid container spacing={2}>
            <Grid item md={1}><Input campo='cantidad' label="Cant" /></Grid>
            <Grid item md={8}><Input campo='detalle' label="Detalle" /></Grid>
           
            <Grid item md={2}><Input campo='importe' label="Importe" /></Grid>
            
          </Grid>
       
    )
}