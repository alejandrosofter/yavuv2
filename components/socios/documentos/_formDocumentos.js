import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../../forms/input"

import Select from "../../forms/select"


import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"
import ImageFormik from "../../forms/imageFormik";
import { fuego } from '@nandorojo/swr-firestore'
export default function FormDocumentosSocio({mod})
{
    return(
        <Grid  container >
               <Grid item md={2} spacing={2}  ><ImageFormik  folder={`users/${fuego.auth().currentUser?.uid}/socios`} label="Imagen"  campo="imagen"/></Grid>
               <Grid item xs container sx={{ml:4}} md={8} spacing={2} >
                        <Grid item md={8}><Select label="Tipo" lista={mod.config.tiposDocumentacion} campoId="id" campoLabel="nombreTipoDocumentacion"  campo="tipo"/></Grid>
                        <Grid item md={6}><SelectFecha label="Fecha Vto" campo="fechaVto"/></Grid>
                       
                    </Grid>
                </Grid>
    )
} 