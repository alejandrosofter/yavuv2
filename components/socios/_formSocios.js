import { CircularProgress, Grid, Stack, Tab } from "@mui/material"
import { useState } from "react"
import Input from "../forms/input"

import SelectSexoFormik from "../forms/SelectFormikSexo";
import SelectEstadoCivil from "../forms/selectEstadoCivil";
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import TitulosFormularios from "../forms/tituloFormularios";


export default function FormSocios({setFieldValue,tipoSocios,titulo,subTitulo,icono})
{
    
const cambiaTipoSocio=(valor)=>{

const seleccion=tipoSocios[tipoSocios.map(item=>item.id).indexOf(valor)]
setFieldValue("nroSocio",seleccion.proximoNro)

}
    return(
        <Stack>
             <TitulosFormularios titulo={titulo} subTitulo={subTitulo} icono={icono}/>
            <Grid sx={{pt:1,mb:2}} md={12} container rowSpacing={2} spacing={2}>
                <Grid item md={2}><SelectFormik callbackchange={cambiaTipoSocio} lista={tipoSocios} campoId="id" campoLabel={"nombre"} label="Tipo Socio " campo="tipoSocio"/></Grid>
                        
                        <Grid item md={1}><Input  label="Nro Socio" campo="nroSocio"/></Grid>
                        <Grid item md={2}><Input label="Nombre "  campo="nombre"/></Grid>
                        <Grid item md={2}><Input label="Apellido " campo="apellido"/></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["ALTA","BAJA","SUSPENDIDO"]}  label="ESTADO" campo="estado"/></Grid>
                        
                        <Grid item md={2}><SelectFecha label="Fecha Nacimiento " campo="fechaNacimiento"/></Grid>
                        <Grid item md={2}><Input label="D.N.I " campo="dni"/></Grid>
                        <Grid item md={3}><Input label="Domicilio " campo="domicilio"/></Grid>
                        <Grid item md={3}><Input label="Localidad" campo="localidad"/></Grid>
                        <Grid item md={2}><Input label="Telefono" campo="telefonoMobil"/></Grid>
                        <Grid item md={3}><Input label="Email" campo="email"/></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["Soltero/a","Casado/a","Otros"]}  label="Estado Civil" campo="estadoCivil" /></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["Femenino","Masculino"]}  label="Sexo" campo="sexo" /></Grid>
            </Grid>
        </Stack>
    )
} 