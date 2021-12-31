import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../forms/input"


import SelectFecha from "../forms/selectorFecha";
import _FormItem from "../forms/subColeccion/_formItem"
import { ModeloMovimientoCuenta,valoresInicialesMovimiento } from "../../modelos/ModeloSocios"
export default function FormMovimientoCuentaSocio({token,datos,urlAcepta,registro,callbackSuccess})
{
    
    
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
                <_FormItem registro={registro} datos={datos} callbackSuccess={callbackSuccess} urlAcepta={urlAcepta} 
                token={token} modelo={ModeloMovimientoCuenta()} valoresIniciales={valoresInicialesMovimiento}>
                    <Grid spacing={2} container>
                        <Grid item md={4}><Input label="Nro Recivo "  campo="nroRecivo"/></Grid>
                        <Grid item md={6}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        
                        <Grid item md={4}><Input label="$ Debita "  campo="importeDebita"/></Grid>
                        <Grid item md={4}><Input label="$ Acredita "  campo="importeAcredita"/></Grid>
                        <Grid item md={12}><Input label="Detalle "  campo="detalle"/></Grid>

                        
                    </Grid>
                </_FormItem>
                </Grid>
    )
} 