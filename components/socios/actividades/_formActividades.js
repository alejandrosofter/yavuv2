import {  Grid } from "@mui/material"
import { useState ,useEffect } from "react"
import Input from "../../forms/input"
import SwitchFormik from "../../forms/switch"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"

import useSWR from "swr";
import SelectFormik from "../../forms/select";
import SelectEstadoFormik from "../../forms/SelectEstadoFormik";
import { getIndexItemArray } from "../../../helpers/arrays";
export default function FormActividadesSocio({values})
{
    useEffect(() => {
        console.log("values.idSubActividad:",values.idSubActividad)
        if(values.idActividad)setValorSubActividades(values.idActividad)
    },[])
    const [subActividades,setSubActividades]=useState([])
    const { data:actividades } = useSWR(`/api/actividades/`)
    const cambiaActividad=valor=>{
        setValorSubActividades(valor)
       
    }
    const setValorSubActividades=valor=>{
        const item=getIndexItemArray({data:actividades,valor:valor,campoId:"id"})
        console.log(actividades,item)
        if(item&&item.subActividades)setSubActividades(item.subActividades)
        else setSubActividades([])
    }
    
    if(!actividades)return "Cargando Acts..."
    return(
        
                    <Grid  md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item sx={{flex:1}} md={7}><SelectFecha label="Fecha " campo="fechaInicio"/></Grid>
                        <Grid item md={5}><SelectEstadoFormik estados={["ACTIVO","INACTIVO"]}/></Grid>
                        <Grid item md={5}><SelectFormik callbackchange={cambiaActividad} label="Actividad" lista={actividades} campoLabel="nombreActividad" campoId="id" campo="idActividad"/></Grid>
                        <Grid item md={7}><SelectFormik label="Sub-Actividad" lista={subActividades} campoLabel="nombreActividad" campoId="id" campo="idSubActividad"/></Grid>
                        
                        <Grid item md={12}><Input label="Detalle "  campo="detalle"/></Grid>
                       
                    </Grid>
           
    )
} 