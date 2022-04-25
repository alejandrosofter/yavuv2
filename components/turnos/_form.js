import { Grid,Stack } from "@mui/material";
import Input from "../forms/input"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectPacientes from "../pacientes/selectPaciente"
import SelectConsultorio from "@components/consultorios/selectConsultorio"
import FechaTime from "@components/forms/selectorFecha"
import Select from "@components/forms/select"
import SelectTipoTurno from "./selectTipoTurno"
import {getItemArray} from "@helpers/arrays"
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { useEffect, useState } from "react";

export default function Form({mod,setFieldValue,values}){
    const [horarios,setHorarios]=useState([])
    const [tipoTurno,setTipoTurno]=useState()
    const [consultorio,setConsultorio]=useState()
    // useEffect(()=>{
       
    //     setHorariosDisponibles(values.fecha,tipoTurno)
    // }
    // ,[tipoTurno])
    const cambiaTipo=(value,item)=>{
      
        setTipoTurno(item)
        setHorariosDisponibles(values.fecha,item)
    }
    const cambiaConsultorio=(value,item)=>{
    
        setConsultorio(item)
        setHorariosDisponibles(values.fecha,tipoTurno)
    }
    const setHorariosDisponibles=(fecha,tipoTurno)=>{
      
        if(tipoTurno&&consultorio){
            fecha="seconds" in fecha?fecha.seconds*1000:fecha
            console.log(fecha)
            let horariosDisponibles=[]
            const momentRange = extendMoment(moment);
            const CADA_MINUTOS = tipoTurno.duracion;
            
            for(let i in consultorio.horarios){
                let horario=consultorio.horarios[i]
                const desde=new Date(fecha)
                const hasta=new Date(fecha) 
                desde.setHours(horario.desde.split(":")[0],horario.desde.split(":")[1],0)
                hasta.setHours(horario.hasta.split(":")[0],horario.hasta.split(":")[1],0)
               
                const range = momentRange.range(desde,hasta);
                
                const lista=Array.from(range.by('minutes', { step: CADA_MINUTOS }))
                .map(date=>({label:date.format('HH:mm'),value:date.unix()}))
                
                horariosDisponibles=horariosDisponibles.concat(lista)
            }
            console.log(horariosDisponibles)
            setHorarios(horariosDisponibles)
            
            
        }
        
  
    }
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item md={2}><FechaTime label="Fecha"  campo="fecha"/></Grid>
                        <Grid item md={2}><SelectConsultorio callbackchange={cambiaConsultorio} /></Grid>
                        <Grid item md={2}><SelectTipoTurno callbackchange={cambiaTipo} mod={mod} /></Grid>
                        <Grid item md={2}><Select campoId="value" lista={horarios} campoLabel="label" campo="fechaTurno" label="Horario" /></Grid>
                        
                        
                        
                        <Grid item md={3}><SelectPacientes /></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","ASISTE","NO ASISTE"]}  label="Estado" campo="estado" /></Grid>
                        <Grid item md={12}><Input label="Detalle"  campo="detalle"/></Grid>
                        
                       
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}