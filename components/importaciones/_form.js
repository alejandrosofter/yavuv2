import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import Switch from "../forms/switch"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
export default function Form({mod,setFieldValue,values}){

    return(
      
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                         <Grid item md={2}><SelectFecha label="Fecha" campo="fecha"/></Grid>
                         <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","IMPORTADO"]}  label="Estado" campo="estado" /></Grid>
                        
                        <Grid item md={2}><Input label="Clave Primaria"  campo="clavePrimaria"/></Grid>
                        
                        <Grid item md={2}><Input label="Destino"  campo="destino"/></Grid>
                        <Grid item md={12}><Input label="Path Archivo (Storage)"  campo="pathFile"/></Grid>
                        <Grid item md={3}><Switch label="Tiene Post Procesa?"  campo="postProcesamiento"/></Grid>
                        <Grid item md={6}><Input label="Url Post Procesamiento"  campo="urlPostProcesamiento"/></Grid>
                        
                   </Grid>
    )
}