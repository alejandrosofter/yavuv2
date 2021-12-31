import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../forms/input"
import SwitchFormik from "../forms/switch"

import SelectFecha from "../forms/selectorFecha";
import _FormItem from "../forms/subColeccion/_formItem"
import { ModeloActividades,valoresInicialesActividades } from "../../modelos/ModeloSocios"
export default function FormActividadesSocio({token,datos,urlAcepta,registro,callbackSuccess})
{
    
    
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
                <_FormItem registro={registro} datos={datos} callbackSuccess={callbackSuccess} urlAcepta={urlAcepta} 
                token={token} modelo={ModeloActividades()} valoresIniciales={valoresInicialesActividades}>
                    <Grid spacing={2} container>
                        
                        <Grid item md={5}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={4}><SwitchFormik label="Esta de Baja "  campo="estaBaja"/></Grid>
                        <Grid item md={4}><SwitchFormik label="Tiene Vto "  campo="tieneVto"/></Grid>
                        <Grid item md={6}><SwitchFormik label="Importe Especial "  campo="tieneImporteEspecial"/></Grid>
                      
                        
                    </Grid>
                </_FormItem>
                </Grid>
    )
} 