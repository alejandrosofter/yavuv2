import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial"
export default function Form({mod,setFieldValue,values}){
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item md={2}><Input label="Nombre"  campo="nombre"/></Grid>
                        <Grid item md={2}><Input label="Apellido"  campo="apellido"/></Grid>
                        <Grid item md={2}><Input label="D.N.I"  campo="dni"/></Grid>
                        <Grid item md={2}><Input label="Teléfono"  campo="telefono"/></Grid>
                        <Grid item md={4}><Input label="Email"  campo="email"/></Grid>
                        <Grid item md={4}><SelectObraSocial/></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["ACTIVO","INACTIVO"]}  
                        label="Estado" campo="estado" /></Grid>
                        <Grid item md={12}><Input label="Detalle"  campo="detalle"/></Grid>
                        
                       
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}