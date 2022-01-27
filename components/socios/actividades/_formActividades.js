import {  Grid } from "@mui/material"
import { useState ,useEffect } from "react"
import Input from "../../forms/input"
import SwitchFormik from "../../forms/switch"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"
import SelectStaticFormik from "../../forms/selectEstaticFormik"
import useSWR from "swr";
import SelectFormik from "../../forms/select";
import { getIndexItemArray } from "../../../helpers/arrays";
import SelectEstaticFormik from "../../forms/selectEstaticFormik";
export default function FormActividadesSocio({values,registro,setFieldValue})
{
    useEffect(() => {
    
        if(values.idActividad)setValorSubActividades(values.idActividad)
    },[values.idActividad,setValorSubActividades])
    const [subActividades,setSubActividades]=useState([])
    const [periodos,setPeriodos]=useState([])
    const { data:actividades } = useSWR(`/api/actividades`)
    const cambiaActividad=valor=>{
        setFieldValue("idSubActividad",null)
        setFieldValue("label_idSubActividad","")
        setValorSubActividades(valor)
       
    }
    const setValorSubActividades=valor=>{
        
        if(actividades){
            const item=getIndexItemArray({data:actividades.datos,valor:valor,campoId:"id"})
      
            if(item&&item.subActividades){
                setSubActividades(item.subActividades)
                setPeriodos(item.periodos)
            }
            else{
                setSubActividades([])
                setPeriodos([])
            }
        }
        
    }
    
    if(!actividades)return "Cargando Acts..."
  
    return(
        
                    <Grid  md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item sx={{flex:1}} md={7}><SelectFecha label="Fecha " campo="fechaInicio"/></Grid>
                        <Grid item md={4}><SelectEstaticFormik items={["ACTIVO","INACTIVO"]}  label="Estado" campo="estado"/></Grid>
                        <Grid item md={5}><SelectFormik callbackchange={cambiaActividad} label="Actividad" lista={actividades.datos} campoLabel="nombreActividad" campoId="id" campo="idActividad"/></Grid>
                        <Grid item md={7}><SelectFormik label="Sub-Actividad" lista={subActividades} campoLabel="nombreActividad" campoId="id" campo="idSubActividad"/></Grid>
                        <Grid item md={7}><SelectFormik label="Periodo" lista={periodos} campoLabel="nombrePeriodo" campoId="id" campo="idPeriodo"/></Grid>

                       
                    </Grid>
           
    )
} 