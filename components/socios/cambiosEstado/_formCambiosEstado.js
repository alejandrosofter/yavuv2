import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../../forms/input"
import SelectFormik from "../../forms/select";
import SelectStaticFormik from "../../forms/selectEstaticFormik"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"

export default function FormCambioEstadoSocio({mod,values})
{
    useEffect(()=>{
        cambiaEstado(values.estado)
    },[])
    const [itemsMotivos,setItemsMotivos]=useState(mod.config?.itemsMotivosEstados)
    const cambiaEstado=valor=>{
        setItemsMotivos(mod.config?.itemsMotivosEstados.filter(n=>n.estado===valor))
    }
    return(
        <Grid sx={{ml:2}} md={12} container rowSpacing={2} spacing={2}>
           
                    <Grid spacing={2} container>
                        <Grid item md={6}><SelectStaticFormik callbackchange={cambiaEstado} label="estado" campo="estado" items={["ALTA","BAJA","SUSPENDIDO"]}/></Grid>
                        <Grid item md={4}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={12}><SelectFormik lista={itemsMotivos} campoId="id" campoLabel={"detalle"} label="Motivo" campo={`motivo`}/></Grid>
                        
                        <Grid item md={12}><Input label="Detalle " campo="detalle"/></Grid>
                    </Grid>
                </Grid>
    )
} 