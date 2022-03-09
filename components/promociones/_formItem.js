import Grid from '@mui/material/Grid';
import Input from "../forms/input";

import {useEffect, useState} from "react"
import SelectFormik from "../forms/select";
import { getItemArray }  from '../../helpers/arrays';
const getItemsConceptos=(id,arr)=>{
    const item=getItemArray({data:arr,valor:id,campoId:"id"})
 
    if(item && item.config && item.config.itemsTipos)
        return(item.config.itemsTipos)
   return []
    
}
export default function FormularioItemPromocion({modsDeuda,values}){
  
    
    const [itemsConceptos,setItemsConceptos]=useState()
    const [conceptoSeleccion,setConceptoSeleccion]=useState()
    useEffect(()=>{
        setItemsConceptos(getItemsConceptos(values.modDeuda,modsDeuda))
        // cambiaConcepto(values.concepto)
        
    },[modsDeuda,values.modDeuda])
    
    const cambiaMod=id=>{
        setItemsConceptos(getItemsConceptos(id,modsDeuda))
    }
    const cambiaConcepto=id=>{
        const itemMod=getItemArray({data:modsDeuda,valor:values.modDeuda,campoId:"id"})
        const itemConcepto=getItemArray({data:itemMod.config.itemsTipos,valor:id,campoId:"id"})
        
        if(itemConcepto){
            setConceptoSeleccion(itemConcepto)
            
      
            
        }
    }
    return(
   
         <Grid container spacing={2}>
            <Grid item md={3}><SelectFormik callbackchange={cambiaMod} label="Modulo Genera Deuda" lista={modsDeuda} campoId="id" campoLabel="nombre" campo="modDeuda"/></Grid>
            <Grid item md={5}><SelectFormik callbackchange={cambiaConcepto} label="Concepto" lista={itemsConceptos} campoId="id" campoLabel="detalle" campo="concepto"/></Grid>
            <Grid item md={3}><Input campo='importe' label="Aplica Importe..." /></Grid>  
            <Grid item md={3}><Input campo='porcentaje' label="Aplica %..." /></Grid>  
            <Grid item md={12}><Input campo='detalle' label="Detalle" /></Grid>
           
          
          </Grid>
        
       
    )
}