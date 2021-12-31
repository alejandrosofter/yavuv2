import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import Input from "../forms/input"
import { TextField } from 'formik-mui';
import { Select } from 'formik-mui';
import MultiSelect from "../forms/multiSelect"
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import InputMask from "react-input-mask";

export default function FormSocios({})
{

    return(
        <Grid sx={{pt:3,mb:2}} md={12} container rowSpacing={2} spacing={2}>
                
                    <Grid item md={2}><Input label="Nombre "  campo="nombre"/></Grid>
                    <Grid item md={2}><Input label="Apellido " campo="apellido"/></Grid>
                    <Grid item md={2}><Input label="Tipo Socio " campo="tipoSocio"/></Grid>
                    <Grid item md={1}><Input label="Nro Socio" campo="nroSocio"/></Grid>
                    <Grid item md={2}><SwitchFormik label="Es Activo " campo="esActivo"/></Grid>
                    <Grid item md={2}><SelectFecha label="Fecha Nacimiento " campo="fechaNacimiento"/></Grid>
                    <Grid item md={2}><Input label="D.N.I " campo="dni"/></Grid>
                    <Grid item md={3}><Input label="Domicilio " campo="domicilio"/></Grid>
                    <Grid item md={3}><Input label="Localidad" campo="localidad"/></Grid>
                    <Grid item md={2}><Input label="Telefono" campo="telefonoMobil"/></Grid>
                    <Grid item md={3}><Input label="Email" campo="email"/></Grid>
                    <Grid item md={2}><Input label="Sexo" campo="sexo"/></Grid>
                    <Grid item md={2}><Input label="Estado Civil" campo="estadoCivil"/></Grid>
                </Grid>
    )
} 