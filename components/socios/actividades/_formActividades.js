import {  Grid } from "@mui/material"
import { useState ,useEffect } from "react"
import Input from "../../forms/input"
import SwitchFormik from "../../forms/switch"
import SelectProducto from "@components/productos/selectProducto"
import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"
import { useCollection,fuego } from '@nandorojo/swr-firestore'
import SelectFormik from "../../forms/select";
import { getItemArray } from "../../../helpers/arrays";
import SelectEstaticFormik from "../../forms/selectEstaticFormik";
export default function FormActividadesSocio({values,registro,setFieldValue})
{
    useEffect(() => {
    
        if(values.idActividad)setValorSubActividades(values.idActividad)
    },[values.idActividad,setValorSubActividades,actividades])
    const { data:actividades } = useCollection(`actividades`)

    const [subActividades,setSubActividades]=useState([])
    const [periodos,setPeriodos]=useState([])
    
    const cambiaActividad=valor=>{
        setFieldValue("idSubActividad",null)
        setFieldValue("label_idSubActividad","")
        setValorSubActividades(valor)
       
    }
    const setValorSubActividades=valor=>{
        
        if(actividades){
            const item=getItemArray({data:actividades,valor:valor,campoId:"id"})
      
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
        
                    <Grid container rowSpacing={2} spacing={2}>
                        
                        <Grid item sx={{flex:1}} md={7}><SelectFecha label="Fecha " campo="fechaInicio"/></Grid>
                        <Grid item md={4}><SelectEstaticFormik items={["ACTIVO","INACTIVO"]}  label="Estado" campo="estado"/></Grid>
                        <Grid item md={5}><SelectFormik callbackchange={cambiaActividad} label="Actividad" lista={actividades} campoLabel="nombreActividad" campoId="id" campo="idActividad"/></Grid>
                        <Grid item md={7}><SelectFormik label="Sub-Actividad" lista={subActividades} campoLabel="nombreActividad" campoId="id" campo="idSubActividad"/></Grid>
                        <Grid item md={5}><SelectFormik label="Periodo" lista={periodos} campoLabel="nombrePeriodo" campoId="id" campo="idPeriodo"/></Grid>
                        <Grid item md={7}><SwitchFormik label="Es por Débito automático" campo={`esPorDebitoAutomatico`}/></Grid>
                        <Grid item md={9}><SelectProducto label="Obligacion Mensual"/></Grid>
                        <Grid item md={3}><Input campo="porcentualObligacion" label="% Obligación"/></Grid>
                        
                    </Grid>
           
    )
} 