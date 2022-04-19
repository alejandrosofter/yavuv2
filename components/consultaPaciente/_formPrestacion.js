import Grid from '@mui/material/Grid';
import Input from "../forms/input";
import SelectPrestacion from "@components/prestaciones/selectPrestacion";


export default function FormularioItemActividad({obraSocial,values}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={5}><SelectPrestacion idObraSocial={obraSocial}/></Grid>
            
            
          </Grid>
        
       
    )
}