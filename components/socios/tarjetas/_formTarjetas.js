import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../../forms/input"
import SelectEstaticFormik from "../../forms/selectEstaticFormik";


import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"

export default function FormTarjetasSocio({})
{
    
    
    return(
        <Grid  md={12} sx={{ml:1}} container rowSpacing={2} spacing={2}>
              
                    <Grid spacing={2} container>
                        <Grid item md={6}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={8}><Input label="Detalle "  campo="detalle"/></Grid>
                        <Grid item md={8}><SelectEstaticFormik label="Tipo" campo="tipo" items={["CARNET","PULSERA"]}/></Grid>
                        <Grid item md={8}><Input label="Identificador "  campo="identificador"/></Grid>
                    </Grid>
                </Grid>
    )
} 