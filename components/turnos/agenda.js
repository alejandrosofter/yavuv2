import Modelo,{valoresIniciales} from "../../modelos/ModeloTurnos"
import Calendario from "@components/forms/calendar"
import { useCollection,fuego } from "@nandorojo/swr-firestore"
import SelectConsultorios from "@components/consultorios/selectSimple"
import { useEffect, useState } from "react"
import { Stack, Grid } from "@mui/material"
import Dialog from "@components/forms/dialogContenido"
import EditarTurno from "./editar"
import NuevoTurno from "./nuevo"
export default function Modulo({mod,callbackSuccess}) {
  const [showEdit,setShowEdit]=useState(false)
  
  const [showNew,setShowNew]=useState(false)
  const [preDataTurno,setPreDataTurno]=useState()
  const [turnoSeleccion,setTurnoSeleccion]=useState()
  const [consultorio,setConsultorio]=useState(localStorage.getItem("consultorio")?localStorage.getItem("consultorio"):"")
    const {data}=useCollection("turnos",{listen:true,where:[
      ["idUsuario","==",fuego.auth().currentUser.uid],
      ["consultorio","==",consultorio]
    ]})
    const cambiaTurno=(turno)=>{
      setTurnoSeleccion(turno)
      setShowEdit(true)
    }
    const selectSlot=(slotInfo)=>{
      setPreDataTurno({fecha:slotInfo.start,consultorio:consultorio})
     
      setShowNew(true)
    }
    const colores=(estado)=>{
      const estadosColores={
        "PENDIENTE":"#878787",
        "ASISTE":"#28a745",
        "NO ASISTE":"#dc3545"
      }
      return estadosColores[estado]
    }
    const styleProps=props=>{
      const backgroundColor = colores(props.estado)
  return { style: { backgroundColor } }
    }
    useEffect(()=>{
      localStorage.setItem("consultorio",consultorio)
    },[consultorio])
    const turnosCalendario=data?data.map(item=>(
      {...item,
        title:`${item.label_paciente} - ${item.detalle}`, 
        start:new Date(item.fechaTurno.seconds * 1000),
        end: new Date(new Date(item.fechaTurno.seconds * 1000).setMinutes(new Date(item.fechaTurno.seconds * 1000).getMinutes() + Number(item.duracion) ))
      
      })):[]

      return (
      <Grid spacing={2} container>
        <Grid item md={3}><SelectConsultorios valorInicial={consultorio} callbackchange={(item)=>setConsultorio(item)} />  </Grid>
        <Grid item md={12}> <Calendario styleProps={styleProps} onSelectSlot={selectSlot} onSelectEvent={cambiaTurno} eventos={turnosCalendario}/> </Grid>
        <Dialog fullWidth={true} maxWidth="xl" title="Editar" open={showEdit} setOpen={setShowEdit}> 
          <EditarTurno idItem={turnoSeleccion?.id} mod={mod} callbackSuccess={()=>setShowEdit(false)} />
        </Dialog>
        <Dialog fullWidth={true} maxWidth="xl" title="Nuevo" open={showNew} setOpen={setShowNew}> 
          <NuevoTurno preData={preDataTurno}  mod={mod} callbackSuccess={()=>setShowNew(false)} />
        </Dialog>
      </Grid>
      )

}