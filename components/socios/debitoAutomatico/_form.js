import {  Grid } from "@mui/material"
import { useState ,useEffect } from "react"
import Input from "../../forms/input"
import SwitchFormik from "../../forms/switch"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"
import { useCollection,fuego } from '@nandorojo/swr-firestore'
import SelectFormik from "../../forms/select";
import Productos from "../../productos/selectProducto";
import { getItemArray } from "../../../helpers/arrays";
import SelectEstaticFormik from "../../forms/selectEstaticFormik";
import { useRouter } from "next/router";

const getItemsConceptos=(id,arr)=>{
    const item=getItemArray({data:arr,valor:id,campoId:"id"})
 
    if(item && item.config && item.config.itemsTipos)
        return(item.config.itemsTipos)
   return []
    
}
export default function FormDebitoAutomatico({values,setFieldValue,mod})
{
    const router=useRouter()
    const {data:modsDeuda}= useCollection(`mods`,
    { where:[
        ["generaDeuda","==",true],
        ["idUsuario","==",fuego.auth().currentUser.uid],
    ]})
     const {data:itemsCuentas}= useCollection(`cuentasEfectivo`,
    { where:[
        ["idUsuario","==",fuego.auth().currentUser.uid],
    ]})
    const {data:cbus}= useCollection(`cuentasCbu`,
    { where:[
        ["idUsuario","==",fuego.auth().currentUser.uid],
    ]})
    
    const [itemsConceptos,setItemsConceptos]=useState([])
    useEffect(()=>{
        setItemsConceptos(getItemsConceptos(values.modDeuda,modsDeuda))
        setFieldValue("modOrigen",router.query.id)
        // cambiaConcepto(values.concepto)
        
    },[modsDeuda,values.modDeuda])
    if(!modsDeuda)return "carga mods"


    
    const cambiaMod=id=>{
        
        setItemsConceptos(getItemsConceptos(id,modsDeuda))
    }
    const getDataObj=(obj,campo)=>{
        if(obj) return campo in obj?obj[campo]:""
        return ""
    }
    return(
        
                    <Grid container rowSpacing={2} spacing={2}>
                        
                        <Grid item sx={{flex:1}} md={7}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={4}><SelectEstaticFormik items={["ACTIVO","INACTIVO"]}  label="Estado" campo="estado"/></Grid>
                       
                       <Grid item md={4}><SelectFormik label="Cuenta Banco" lista={itemsCuentas} campoId="id" campoLabel="nombre" campo="idCuentaEfectivo"/></Grid>
                       <Grid item md={12}><Productos multiple={true}/></Grid>
                        <Grid item md={12}><SelectFormik label="Cuenta CBU" lista={cbus} campoId="id" campoLabel="titular" campo="idCuentaCbu"/></Grid>
                        <Grid item md={12}><Input label="Detalle" campo="detalle"/></Grid>
                       
                    </Grid>
           
    )
} 