import { Button, Grid,Icon,Stack } from "@mui/material";
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
import DialogContenido from "@components/forms/dialogContenido";
import ListaSimple from "@components/forms/listaSimple";
import SelectFechaSimple from "@components/forms/selectorFechaSimple";
import SelectFecha from "@components/forms/fechaTimeFormik";
import SelectorFecha from "@components/forms/selectorFecha";
import {fuego} from "@nandorojo/swr-firestore"
export default function Form({mod,setFieldValue,values}){
    const [horarios,setHorarios]=useState([])
    const [tipoTurno,setTipoTurno]=useState()
    const [consultorio,setConsultorio]=useState()
    const [openTurnosDisponibles,setOpenTurnosDisponibles]=useState(false)
    
    const cambiaTipo=(value,item)=>{
      
        setTipoTurno(item)
        // setHorariosDisponibles(values.fecha,item)
    }
    const cambiaConsultorio=(value,item)=>{
    
        setConsultorio(item)
        // setHorariosDisponibles(values.fecha,tipoTurno)
    }
    const buscaTurno=()=>{
        setOpenTurnosDisponibles(true)
        setHorariosDisponibles(new Date(),tipoTurno) 
    }
    const cambiaFecha=(value)=>{
        setHorariosDisponibles(value,tipoTurno)
    }
    const clickItemHorario=(item)=>{
        setOpenTurnosDisponibles(false)
        setFieldValue("fechaTurno",item.value.toDate())//VIENE OBJ MOMENT
    }
    //esta funcion recibe una fecha y devuelve 2 fechas que son desde que comienza el dia hasta que termina
    const getFechaDesde=fecha=>{
        const fechaAux =new Date(fecha)
        fechaAux.setHours(0,0,0,0)
        return fechaAux
    }
    const getFechaHasta=fecha=>{
        const fechaAux =new Date(fecha)
        fechaAux.setHours(24,0,0,0)
        return fechaAux
    }
    const mezclaHorariosOcupados=(horariosDisponibles,turnosOcupados)=>{
        for(let i in horariosDisponibles){
            let horario=horariosDisponibles[i]
            for(let j in turnosOcupados){
                let turno=turnosOcupados[j]
                // console.log(new Date(turno.fechaTurno.seconds*1000),horario.value.toDate())
                if(turno.fechaTurno.seconds*1000===horario.value.toDate().getTime()){
                    horariosDisponibles[i].disabled=true
                    horariosDisponibles[i].turnoOcupado=turno
                }
            }
        }
        return horariosDisponibles
    }
        
    
    const setHorariosDisponibles=async (fecha,tipoTurno)=>{
        console.log(fecha)
        const fechaHasta=getFechaHasta(fecha)
        const fechaDesde=getFechaDesde(fecha)
        
        const refTurnosOcupados=await fuego.db.collection("turnos")
        .where( "idUsuario","==",fuego.auth().currentUser.uid)
        .where( "tipoTurno","==",tipoTurno.id)
        .where( "fechaTurno",">=",fechaDesde)
        .where( "fechaTurno","<",fechaHasta)
        .get()
        let arrTurnosOcupados=[]
        refTurnosOcupados.forEach(turno=>arrTurnosOcupados.push(turno.data()) )
       
        if(tipoTurno&&consultorio){
            fecha="seconds" in fecha?fecha.seconds*1000:fecha
           
            let horariosDisponibles=[]
            const momentRange = extendMoment(moment);
            const CADA_MINUTOS = tipoTurno.duracion;
            
            for(let i in consultorio.horarios){
                let horario=consultorio.horarios[i]
                // console.log(horario,tipoTurno)
                if(horario.tipoTurno===tipoTurno.id){
                    const desde=new Date(fecha)
                    const hasta=new Date(fecha) 
                    desde.setHours(horario.desde.split(":")[0],horario.desde.split(":")[1],0)
                    hasta.setHours(horario.hasta.split(":")[0],horario.hasta.split(":")[1],0)
                
                    const range = momentRange.range(desde,hasta);
                  
                    const lista=Array.from(range.by('minutes', { step: CADA_MINUTOS }))
                    .map(date=>({label:date.format('HH:mm'),value:date}))
                    
                    horariosDisponibles=horariosDisponibles.concat(lista)
                }
                
            }
            horariosDisponibles=mezclaHorariosOcupados(horariosDisponibles,arrTurnosOcupados)
            setHorarios(horariosDisponibles)
            
            
        }
        
  
    }
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={2}><SelectorFecha  label="Fecha Ingreso" campo="fecha"/></Grid>
                        <Grid item md={2}><SelectConsultorio callbackchange={cambiaConsultorio} /></Grid>
                        <Grid item md={2}><SelectTipoTurno callbackchange={cambiaTipo} mod={mod} /></Grid>
                        <Grid item md={1}><Button onClick={buscaTurno}><Icon className="fas fa-search"/> Turno</Button></Grid>
                        <Grid item md={2}><SelectFecha  label="Fecha Turno" campo="fechaTurno"/></Grid>
                     
                        <Grid item md={3}><SelectPacientes /></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","ASISTE","NO ASISTE"]}  label="Estado" campo="estado" /></Grid>
                        <Grid item md={10}><Input label="Detalle"  campo="detalle"/></Grid>
                        <DialogContenido fullWidth={true} maxWidth="sm" open={openTurnosDisponibles} setOpen={setOpenTurnosDisponibles} titulo="Turnos DISPONIBLES">
                            <Grid container>
                                <Grid item md={12}>
                                    <SelectFechaSimple callbackChange={cambiaFecha}/>
                                    <ListaSimple onClick={clickItemHorario} items={horarios} campoId="value" fnRender={item=>item.disabled?
                                    `${item.label} OCUPADO ${item.turnoOcupado.label_paciente}` :item.label} />
                                </Grid>
                            </Grid>
                        </DialogContenido>
                       
                        
                   </Grid>
                        
            </Stack>                  
        </Grid>
    )
}