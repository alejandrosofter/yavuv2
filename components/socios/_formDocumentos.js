import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../forms/input"


import SelectFecha from "../forms/selectorFecha";
import _FormItem from "../forms/subColeccion/_formItem"
import { ModeloDocumentos,valoresInicialesDocumentacion } from "../../modelos/ModeloSocios"
export default function FormDocumentosSocio({token,datos,urlAcepta,registro,callbackSuccess})
{
    
    
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
                <_FormItem registro={registro} datos={datos} callbackSuccess={callbackSuccess} urlAcepta={urlAcepta} 
                token={token} modelo={ModeloDocumentos()} valoresIniciales={valoresInicialesDocumentacion}>
                    <Grid spacing={2} container>
                        <Grid item md={8}><Input label="Tipo "  campo="tipo"/></Grid>
                        <Grid item md={6}><SelectFecha label="Fecha Vto" campo="fechaVto"/></Grid>
                    </Grid>
                </_FormItem>
                </Grid>
    )
} 