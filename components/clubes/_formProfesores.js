import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import Input from "../forms/input"

import { TextField } from 'formik-mui';
import { Select } from 'formik-mui';
import MultiSelect from "../forms/multiSelect"
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import InputMask from "react-input-mask";
import _FormItem from "../forms/subColeccion/_formItem";
import ModeloClubes, { ModeloClubesActividades,ModeloClubesProfesores,valoresInicialesActividades,valoresInicialesProfesores } from "../../modelos/ModeloClubes";
export default function FormClubProfesores({token,urlAcepta,datos,callbackSuccess})
{
   
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
                <_FormItem datos={datos} callbackSuccess={callbackSuccess} urlAcepta={urlAcepta} 
                token={token} modelo={ModeloClubesProfesores()} valoresIniciales={valoresInicialesProfesores}>
                    <Grid spacing={2} container>
                        <Grid item md={6}><Input label="Nombre "  campo="nombre"/></Grid>
                       
                        <Grid item md={6}><Input label="Apellido" campo="apellido"/></Grid>
                    </Grid>
                </_FormItem>
                </Grid>
    )
} 