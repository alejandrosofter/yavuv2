import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material"

import Input from "../forms/input"
import {useEffect, useState} from "react"
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import TitulosFormularios from "../forms/tituloFormularios";
import useSWR from 'swr';
import { getIndexItemArray } from "../../helpers/arrays";

const getItemsConceptos=(idMod,arr)=>{
    const item=getIndexItemArray({data:arr,valor:idMod,campoId:"idMod"})
    if(item && item.mod.config && item.mod.config.itemsTipos)
        return(item.mod.config.itemsTipos)
   return []
    
}
export default function FormCobranzaGrupal({setFieldValue,values,titulo,subTitulo,icono})
{
    const {data:modsDeuda}= useSWR(`/api/mod/getModGeneraDeuda`)
    const [itemsConceptos,setItemsConceptos]=useState()
    const [conceptoSeleccion,setConceptoSeleccion]=useState()
    useEffect(()=>{
        setItemsConceptos(getItemsConceptos(values.modDeuda,modsDeuda))
        // cambiaConcepto(values.concepto)
        
    },[modsDeuda,values.modDeuda])
    if(!modsDeuda)return "carga mods"

    

    
    const cambiaMod=id=>{
        setItemsConceptos(getItemsConceptos(id,modsDeuda))
    }
    const cambiaConcepto=id=>{
        const itemMod=getIndexItemArray({data:modsDeuda,valor:values.modDeuda,campoId:"idMod"})
        const itemConcepto=getIndexItemArray({data:itemMod.mod.config.itemsTipos,valor:id,campoId:"id"})
        
        if(itemConcepto){
            setConceptoSeleccion(itemConcepto)
            
            setFieldValue("conjunto",'aplicaDeudaConjunto' in itemConcepto?itemConcepto.aplicaDeudaConjunto:"")
            setFieldValue("calculoImporte",'calculoImporte' in itemConcepto?itemConcepto.calculoImporte:"")
            setFieldValue("fnDetalleConcepto",'fnDetalleConcepto' in itemConcepto?itemConcepto.fnDetalleConcepto:"")
            
        }
        
      
    }
    return(
        <Stack>
             <TitulosFormularios titulo={titulo} subTitulo={subTitulo} icono={icono}/>
            <Grid sx={{pt:1,mb:2}} md={12} container rowSpacing={2} spacing={2}>
           
                        <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","GENERADO"]}  label="ESTADO" campo="estado"/></Grid>
                        <Grid item md={2}><SelectFecha label="Fecha" campo="fecha"/></Grid>
                        <Grid item md={2}><SelectFecha label="Fecha Vto" campo="fechaVto"/></Grid>
                        <Grid item md={3}><SelectFormik callbackchange={cambiaMod} label="Modulo Genera Deuda" lista={modsDeuda} campoId="idMod" campoLabel="nombre" campo="modDeuda"/></Grid>
                        <Grid item md={5}><SelectFormik callbackchange={cambiaConcepto} label="Concepto" lista={itemsConceptos} campoId="id" campoLabel="detalle" campo="concepto"/></Grid>
                        <Grid item md={6}><Input label="Detalle Agregado (opcional)" campo="detalle"/></Grid>
                        <Grid item md={6}><Input label="Conjunto de Datos" campo="conjunto"/></Grid>
                        <Grid item md={12}><Input label="Calculo Importe" campo="calculoImporte"/></Grid>
                        <Grid item md={12}><Input label="Fn Detalle extra" campo="fnDetalleExtra"/></Grid>
                       
            </Grid>
        </Stack>
    )
} 