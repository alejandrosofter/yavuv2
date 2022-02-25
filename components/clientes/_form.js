import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"

export default function FormClientes({mod,setFieldValue,values}){

    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={4}><Input label="Apellido"  campo="apellido"/></Grid>
                        <Grid item md={3}><Input label="Nombre"  campo="nombre"/></Grid>
                    </Grid>
                        
            </Stack>                  
        </Grid>
    )
}