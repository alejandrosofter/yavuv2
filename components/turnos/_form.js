import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectPacientes from "../pacientes/selectPaciente"
import SelectConsultorio from "@components/consultorios/selectConsultorio"
import FechaTime from "@components/forms/fechaTimeFormik"
import SelectTipoTurno from "./selectTipoTurno"
import {getItemArray} from "@helpers/arrays"
export default function Form({mod,setFieldValue,values}){
    const cambiaTipo=(item)=>{
        const tipo=getItemArray({data:mod.config?.tipoTurnos,valor:item})
        if(tipo)setFieldValue("duracion",tipo.duracion)
    }
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item md={2}><FechaTime label="Fecha"  campo="fecha"/></Grid>
                        <Grid item md={2}><SelectTipoTurno callbackchange={cambiaTipo} mod={mod} /></Grid>
                        <Grid item md={1}><Input label="Dura mins."  campo="duracion"/></Grid>
                        
                        <Grid item md={2}><SelectConsultorio /></Grid>
                        <Grid item md={3}><SelectPacientes /></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","ASISTE","NO ASISTE"]}  label="Estado" campo="estado" /></Grid>
                        <Grid item md={12}><Input label="Detalle"  campo="detalle"/></Grid>
                        
                       
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}