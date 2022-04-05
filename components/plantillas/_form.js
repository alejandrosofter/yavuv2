import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import RichEditor from "../forms/richEditorFormik"
export default function Form({mod,setFieldValue,values}){
    
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item md={4}><Input label="Nombre"  campo="nombre"/></Grid>
                        <Grid item md={2}><Input label="Identificador"  campo="identificador"/></Grid>
                        <Grid item md={12}><RichEditor label="Plantilla"  campo="dataPlantilla"/></Grid>
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}