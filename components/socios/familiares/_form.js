import {  Grid } from "@mui/material"
import { useState ,useEffect, useLayoutEffect } from "react"
import Input from "../../forms/input"
import SwitchFormik from "../../forms/switch"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"
import BuscadorSociosInput from "../_buscador";

export default function FormPromocionesSocio({values,setFieldValue})
{
    const [socioSeleccion,setSocioSeleccion]=useState()
    useEffect(()=>{
        console.log(socioSeleccion)
        if(socioSeleccion) {
            setFieldValue("socio",socioSeleccion.id)
            setFieldValue("label_socio",`${socioSeleccion.apellido} ${socioSeleccion.nombre}`)
        }
    },[socioSeleccion,setFieldValue])
    return(
        
                    <Grid  md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item sx={{flex:1}} md={4}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={7}><Input label="Relacion"  campo="relacion"/></Grid>
                        <Grid item md={6}><BuscadorSociosInput setSocioSeleccion={setSocioSeleccion}  /></Grid>
                        <Grid item md={6}><Input label="Socio"  campo="label_socio"/></Grid>
                        
                       
                    </Grid>
           
    )
} 