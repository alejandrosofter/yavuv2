import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../../forms/input"

import Select from "../../forms/select"


import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"

export default function FormDocumentosSocio({mod})
{
    return(
        <Grid  md={12} sx={{ml:1}} container rowSpacing={2} spacing={2}>
               
                    <Grid spacing={2} container>
                        <Grid item md={8}><Select label="Tipo" lista={mod.config.tiposDocumentacion} campoId="id" campoLabel="nombreTipoDocumentacion"  campo="tipo"/></Grid>
                        <Grid item md={6}><SelectFecha label="Fecha Vto" campo="fechaVto"/></Grid>
                    </Grid>
                </Grid>
    )
} 