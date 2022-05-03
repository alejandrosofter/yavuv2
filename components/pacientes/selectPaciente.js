import DialogContenido from '@components/forms/dialogContenido';
import { getModUsuario } from '@helpers/db';
import { Button, Grid, Icon, Tooltip } from '@mui/material';
import { useCollection,fuego } from '@nandorojo/swr-firestore';
import { useState } from 'react';
import Select2 from "../forms/select2Formik"
import NuevoPaciente from "./nuevo"
export default function Modulo({label,campo,callbackchange}){
    const mod=getModUsuario("pacientes")
    const {data:pacientes}=useCollection("pacientes",{listen:true,where:["idUsuario","==",fuego.auth().currentUser.uid]})
    const [openAdd,setOpenAdd]=useState(false)
    const add=()=>{
        setOpenAdd(true)
    }
    const onLoadPaciente=()=>{
        setOpenAdd(false)
    }
    if(!pacientes) return ""
    return(
        <Grid container>
            <Grid item xs={10}><Select2 callbackchange={callbackchange} campo={campo?campo:"paciente"} 
        label="Paciente"
         lista={pacientes} campoId="id" 
            campoLabel={(item)=>`${item.nombre} ${item.apellido} ${item.dni}`}  /></Grid>
           <Grid item xs={1}> <Button onClick={add}><Tooltip title="Agregar Paciente"><Icon className="fas fa-plus"/></Tooltip></Button></Grid>
        <DialogContenido maxWidth="lg" titulo="AGREGAR PACIENTE" open={openAdd} setOpen={setOpenAdd}>
            <NuevoPaciente mod={mod} callbackSuccess={onLoadPaciente}/>
        </DialogContenido>
        </Grid>
    )
}