import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../forms/input"


import SelectFecha from "../forms/selectorFecha";
import _FormItem from "../forms/subColeccion/_formItem"
import { ModeloCambioEstado,valoresInicialesCambioEstado } from "../../modelos/ModeloSocios";
export default function FormCambioEstadoSocio({token,datos,urlAcepta,registro,callbackSuccess})
{
    
    
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
                <_FormItem registro={registro} datos={datos} callbackSuccess={callbackSuccess} urlAcepta={urlAcepta} 
                token={token} modelo={ModeloCambioEstado()} valoresIniciales={valoresInicialesCambioEstado}>
                    <Grid spacing={2} container>
                        <Grid item md={8}><Input label="Estado "  campo="estado"/></Grid>
                        <Grid item md={6}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                    </Grid>
                </_FormItem>
                </Grid>
    )
} 