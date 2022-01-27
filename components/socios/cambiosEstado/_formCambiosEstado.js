import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../../forms/input"
import SelectStaticFormik from "../../forms/selectEstaticFormik"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"

export default function FormCambioEstadoSocio({})
{
    
    
    return(
        <Grid sx={{ml:2}} md={12} container rowSpacing={2} spacing={2}>
           
                    <Grid spacing={2} container>
                        <Grid item md={8}><SelectStaticFormik label="estado" campo="estado" items={["ALTA","BAJA","SUSPENDIDO"]}/></Grid>
                        <Grid item md={6}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={12}><Input label="Detalle " campo="detalle"/></Grid>
                    </Grid>
                </Grid>
    )
} 