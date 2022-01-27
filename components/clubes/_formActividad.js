import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../forms/input"

import { Switch, TextField } from 'formik-mui';
import { Select } from 'formik-mui';
import MultiSelect from "../forms/multiSelect"
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import InputMask from "react-input-mask";
import _FormItem from "../forms/subColeccion/_formItem";
import ModeloClubes, { ModeloClubesActividades,valoresInicialesActividades } from "../../modelos/ModeloClubes";
import SelectFormik from "../forms/select";
import Fetch from "../../helpers/Fetcher"
export default function FormClubActividad({token,datos,urlAcepta,callbackSuccess})
{
    const muestraProfesor=(item)=>{
        return `${item.nombre} ${item.apellido} `
    }
    const [profesores,setProfesores]=useState([])
   useEffect(() => {
       const fn=async ()=>{
        return await Fetch("/api/clubes/getProfesores","GET",null,token);
       }
    const profes=fn()
    setProfesores(profes)
   },[token])
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
                <_FormItem datos={datos} callbackSuccess={callbackSuccess} urlAcepta={urlAcepta} 
                token={token} modelo={ModeloClubesActividades()} valoresIniciales={valoresInicialesActividades}>
                    <Grid spacing={2} container>
                        <Grid item md={8}><Input label="Nombre "  campo="nombre"/></Grid>
                        <Grid item md={6}><SelectFecha label="Desde " campo="desdeFecha"/></Grid>
                        <Grid item md={5}><SelectFecha label="Hasta" campo="hastaFecha"/></Grid>
                       
                        <Grid item md={3}><Input label="Desde Edad " campo="desdeEdad"/></Grid>
                        <Grid item md={3}><Input label="Hasta Edad " campo="hastaEdad"/></Grid>
                        <Grid item md={4}><SwitchFormik label="Estado " campo="estado"/></Grid>
                        
                        <Grid item md={10}><SelectFormik label="Profesor" lista={profesores} 
                        campoLabel={muestraProfesor} campoId={"id"} campo="profesor"/></Grid>
                        
                        <Grid item md={12}><Input label="Detalle" campo="detalle"/></Grid>
                    </Grid>
                </_FormItem>
                </Grid>
    )
} 