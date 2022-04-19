import Grid from '@mui/material/Grid';
import Input from "../forms/input";

export default function FormItem({profesores,mod}){

    return(
   
         <Grid container spacing={2}>

<Grid item md={5}><Input campo='nombre' label="Nombre" /></Grid>
<Grid item md={5}><Input campo='identificador' label="Identificador" /></Grid>
            <Grid item md={12}><Input campo='selector' label="Selector" /></Grid>
            
            
          </Grid>
        
       
    )
}