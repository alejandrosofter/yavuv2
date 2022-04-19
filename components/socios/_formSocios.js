import { CircularProgress, Grid, Stack, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../forms/input"

import SwitchFormik from "../forms/switch";

import SelectAlgoliaFormik from "../forms/selectAlgoliaFormik";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import TitulosFormularios from "../forms/tituloFormularios";
import ImageFormik from "../forms/imageFormik";
import { fuego } from '@nandorojo/swr-firestore'
import {getFieldName} from "../../helpers/forms"
import DataInfoPhoto from "../forms/dataInfoPhoto" 
import { getModUsuario } from "../../helpers/db";
import { getItemArray } from "../../helpers/arrays";
import { getEdad } from "../../helpers/fechas"; 
import SelectProducto from "../productos/selectProducto"
import Tooltip from '@mui/material/Tooltip';
import BuscadorSociosInput from "../clientes/_buscador";
import SelectFormikAlgolia from "../forms/selectAlgoliaFormik";
export default function FormSocios({field,setFieldValue,values,mod})
{
    mod=mod.nombre==="socios"?mod:getModUsuario("socios")
    const tipoSocios=mod.config?.itemsTipoSocios?mod.config.itemsTipoSocios:[]
    const categoriaSocios=mod.config?.itemsCategoriaSocios?mod.config.itemsCategoriaSocios:[]
   
useEffect(()=>{

    const seleccion=tipoSocios[tipoSocios.map(item=>item.nombre).indexOf(values?.tipoSocio)]
    if(seleccion) setFieldValue(getFieldName(field,`tipoSocio`),seleccion.id)
},[setFieldValue,values])
const cambiaTipoSocio=(valor)=>{

const seleccion=tipoSocios[tipoSocios.map(item=>item.id).indexOf(valor)]
setFieldValue(getFieldName(field,`nroSocio`),seleccion.proximoNro)

}
const cambiaCliente=(cliente)=>{
    console.log(cliente)
}
const cambiaCategoria=(newValue)=>{
    console.log(newValue)
}
const cambiaFecha=(newValue)=>{
    // const item = getItemArray({data:categoriaSocios,valor:values.categoriaSocio,campoId:"id"})
    const edad=getEdad(newValue)
    const esActivo=values.esActivo
    setFieldValue(getFieldName(field,`edad`),edad)
    const c=getCategoriaCondicion(edad,values.esActivo)
    console.log(c,categoriaSocios)
    setFieldValue(getFieldName(field,`categoriaSocio`),c)

}
const getCategoriaCondicion=(edad,esActivo)=>{
    let categoria
    categoriaSocios.map(item=>{
        if(eval(item.condicion))categoria=item.id
    })
    return categoria
}
const agregarValoresImagen=(valores)=>{
    console.log(valores)
    valores.map(item=>{
        if(item!="")setFieldValue(getFieldName(field,item.campo),item.value)
    })
}
    return(
       
            <Grid sx={{pt:1,mb:2}} container rowSpacing={2} spacing={2}>
                <Grid item md={1} ><ImageFormik  folder={`users/${fuego.auth().currentUser?.uid}/socios`} 
                label="Foto "  campo={getFieldName(field,`foto`)}/></Grid>
                <Grid item xs container sx={{ml:1}} md={9} spacing={2} >
                    <Grid md={1} item> <DataInfoPhoto fnCambia={agregarValoresImagen} /></Grid>
                        <Grid item md={2}><SelectFormik callbackchange={cambiaTipoSocio} lista={tipoSocios} campoId="id" campoLabel={"nombre"} label="Tipo Socio " campo={getFieldName(field,`tipoSocio`)}/></Grid>

                        <Grid item md={2}><Input  label="Nro Socio" campo={getFieldName(field,`nroSocio`)}/></Grid>
                        <Grid item md={2}><SwitchFormik label="Es Activo?" campo={getFieldName(field,`esActivo`)}/></Grid>
                        <Tooltip title="Al tildar modo familiar no se genera deuda mensual en este socio! .. solo en el socio en el cual se agrego a este socio"><Grid item md={2}><SwitchFormik label="Modo Familiar" campo={getFieldName(field,`modoFamiliar`)}/></Grid></Tooltip>
                        <Grid item md={2}><SelectEstaticFormik items={["ALTA","BAJA","SUSPENDIDO"]}  label="ESTADO" campo={getFieldName(field,`estado`)}/></Grid>
                        
                        <Grid item md={4}><Input label="Nombre "  campo={getFieldName(field,`nombre`)} /></Grid>
                        <Grid item md={4}><Input label="Apellido " campo={getFieldName(field,`apellido`)} /></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["Femenino","Masculino"]}  label="Sexo" campo={getFieldName(field,`sexo`)} /></Grid>
                        <Grid item md={2}><SelectEstaticFormik items={["Soltero/a","Casado/a","Otros"]}  label="Estado Civil" campo={getFieldName(field,`estadoCivil`)} /></Grid>

                        <Grid item md={2}><SelectFecha callbackChange={cambiaFecha} label="Fecha Nacimiento " campo={getFieldName(field,`fechaNacimiento`)}/></Grid>
                        <Grid item md={1}><Input  label="Edad" campo={getFieldName(field,`edad`)}/></Grid>
                        <Grid item md={2}><SelectFormik callbackchange={cambiaCategoria} lista={categoriaSocios} campoId="id" campoLabel={"nombre"} label="Categoria Socio" campo={getFieldName(field,`categoriaSocio`)}/></Grid>
                        
                        <Grid item md={2}><Input label="D.N.I " campo={getFieldName(field,`dni`)}/></Grid>
                        <Grid item md={3}><Input label="Domicilio " campo={getFieldName(field,`domicilio`)}/></Grid>
                        <Grid item md={3}><Input label="Localidad" campo={getFieldName(field,`localidad`)}/></Grid>
                        <Grid item md={2}><Input label="Telefono" campo={getFieldName(field,`telefonoMobil`)}/></Grid>
                        <Grid item md={3}><Input label="Email" campo={getFieldName(field,`email`)}/></Grid>
                        <Grid item md={6}><SelectProducto label="Obligacion Mensual"/></Grid>
                        <Grid item md={3}><SwitchFormik label="Obligacion por Débito automático" campo={getFieldName(field,`esPorDebitoAutomatico`)}/></Grid>
                        <Grid item md={2}><SwitchFormik label="Es diferente cliente?" campo={getFieldName(field,`esDiferenteCliente`)}/></Grid>
                        <Grid item md={4}><SelectFormikAlgolia campo="cliente" label="Cliente" 
                        coleccionAlgolia="clientes" callbackchange={cambiaCliente}/></Grid>
                        
                       
                       
                </Grid>  
            </Grid>
 
    )
} 