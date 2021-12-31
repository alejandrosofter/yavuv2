import useSWR from "swr"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Input from "../forms/input"
import FormSubitemColeccion from "../forms/editarSubitemColeccion";
import { useState } from "react";
import { useRouter } from "next/router";
export default function ConfigSocio({modulo,token,dataUsuario,idUsuario,auth,dataCuenta}){
    const router=useRouter();
    const url=`/api/mod/${router.query.id}`
    const urlAcepta=`/api/mod/abmItem?subColeccion=config`
    const subItem="config"

    const { data:datos, mutate,isValidating } = useSWR(url)
     const callbackSuccess=e=>{
        console.log("clik acep")
     }
     const valoresIniciales=()=>{
         return {nombre:"",tipo:""}
     }
     const getDatosSubItem=()=>{
         if(datos[subItem])return datos[subItem]
         return {}
     }
    if(!datos)return `Cargando ${url}... `
     
    return(
        <Stack>
<Typography variant="h4" component="div" gutterBottom>
       CONFIGURAR MOD
      </Typography>
      registro,callbackSuccess,token,datos,urlAcepta,valoresIniciales,modelo,mutateIndex,esNuevo,mutateRegistro,children
<FormSubitemColeccion registro={datos} datos={getDatosSubItem()} urlAcepta={urlAcepta} callbackSuccess={callbackSuccess} 
token={token} modulo={modulo} valoresIniciales={valoresIniciales} dataUsuario={dataUsuario} 
auth={auth} idUsuario={idUsuario} dataCuenta={dataCuenta} >
    <Grid container spacing={2} md={12}>
        <Grid item md={4}><Input label="Nombre "  campo="nombreModulo"/></Grid>
        <Grid item md={2}><Input label="Edad Adherente"  campo="edadAdherente"/></Grid>
    </Grid>
</FormSubitemColeccion>
        </Stack>
    )
}