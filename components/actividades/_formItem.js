import Grid from '@mui/material/Grid';
import Input from "../forms/input";


import SelectFormik from "../forms/select";
import SelectProducto from '../productos/selectProducto';
import SelectEstaticFormik from '../forms/selectEstaticFormik';


export default function FormularioItemActividad({profesores,mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={5}><Input campo='nombreActividad' label="Nombre" /></Grid>
            <Grid item md={3}><Input campo='importe' label="Importe" /></Grid>
            <Grid item md={2}><SelectEstaticFormik items={["ACTIVA","RECESO","SUSPENDIDA"]}  label="ESTADO" campo="estado"/></Grid>
            <Grid item md={3}><SelectFormik campo='profesor' label="Profesor" lista={profesores} campoId="id" 
            campoLabel={item=>`${item.apellido} ${item.nombre}`} /></Grid>
             <Grid item md={3}><SelectProducto /></Grid>
            
          </Grid>
        
       
    )
}