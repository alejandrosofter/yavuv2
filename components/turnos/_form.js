import { Button, Grid,Icon,Stack } from "@mui/material";
import Input from "../forms/input"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectPacientes from "../pacientes/selectPaciente"
import SelectConsultorio from "@components/consultorios/selectConsultorio"

import SelectTipoTurno from "./selectTipoTurno"

import { useEffect, useState } from "react";
import SelectTurno from "./selectTurno"

import SelectorFecha from "@components/forms/selectorFecha";

export default function Form({mod,setFieldValue,values}){
    
    const [tipoTurno,setTipoTurno]=useState()
    const [consultorio,setConsultorio]=useState()
    const cambiaTipo=(value,item)=>{
      
        setTipoTurno(item)
        // setHorariosDisponibles(values.fecha,item)
    }
    const cambiaConsultorio=(value,item)=>{
    
        setConsultorio(item)
        // setHorariosDisponibles(values.fecha,tipoTurno)
    }
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={2}><SelectorFecha  label="Fecha Ingreso" campo="fecha"/></Grid>
                        <Grid item md={2}><SelectConsultorio callbackchange={cambiaConsultorio} /></Grid>
                        <Grid item md={2}><SelectTipoTurno callbackchange={cambiaTipo} mod={mod} /></Grid>
                        
                        <Grid item md={2}><SelectTurno consultorio={consultorio} tipoTurno={tipoTurno}  label="Turno" campo="fechaTurno"/></Grid>
                     
                        <Grid item md={3}><SelectPacientes /></Grid>
                        <Grid item md={2}><Input label="Duracion"  campo="duracion"/></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","ASISTE","NO ASISTE"]}  label="Estado" campo="estado" /></Grid>
                        <Grid item md={8}><Input label="Detalle"  campo="detalle"/></Grid>
                        
                       
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}