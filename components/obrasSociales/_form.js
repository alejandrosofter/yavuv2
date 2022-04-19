import DataGridFormikItems from "@components/forms/dataGridFormik";
import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import {ModeloAcciones} from "@modelos/ModeloPacientes"
import FormAccionesWeb from "./_formAccionesWeb"
export default function Form({mod,setFieldValue,values}){
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item md={4}><Input label="Nombre"  campo="nombre"/></Grid>
                        <Grid item md={2}><Input label="Usuario WEB"  campo="usuarioWeb"/></Grid>
                        <Grid item md={2}><Input label="Clave Web"  campo="claveWeb"/></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["ACTIVA","INACTIVA"]}  label="Estado" campo="estado" /></Grid>
                        <Grid item md={12}><Input label="Detalle"  campo="detalle"/></Grid>
                        <Grid item md={12}>
                        <DataGridFormikItems label="Acciones Web" Modelo={ModeloAcciones} 
                                FormularioItem={FormAccionesWeb}  campo="entradas" columns={[
                                    { field: 'label_bootWeb',headerName: 'Boot Web', editable: false, width: 120,  },
                                    ]}/>
                        </Grid>
                       
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}