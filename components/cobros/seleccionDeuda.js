import {Grid,Icon,Button,Stack} from '@mui/material/';
import Badge from '@mui/material/Badge';

import * as React from 'react';
import {useEffect,useState} from "react"

import { fuego } from '@nandorojo/swr-firestore'
import DialogContenido from '../forms/dialogContenido';
import CheckListFormik from '../forms/checkListFormik';
import {getFechaString} from "../../helpers/dates"
export default function Modulo({cliente,fnChange,abre}){
  const [deudaSocio,setDeudaSocio]=useState([])
  const [cantidadSeleccion,setCantidadSeleccion]=useState(0)
  const [open,setOpen]=useState(false)
  
  useEffect(()=>{
  
    if(cliente)buscarDeuda(cliente)
  },[cliente])
  useEffect(()=>{
    if(abre) setOpen(true)
  },[abre])
    const buscarDeuda=async (cliente)=>{
       
      const snapshot= await fuego.db.collection("socios").where("cliente","==",cliente.objectID).get() 
      snapshot.forEach(doc => {
        
          fuego.db.collection("socios_deudas").where("idSocio","==",doc.id).where("estado","==","PENDIENTE").get() 
          .then(refDeuda=>{
            let arr=[]
            refDeuda.forEach(docDeuda => {
              arr.push(docDeuda)
            })
            setDeudaSocio(arr)
          })
          
        })
  }

if(!deudaSocio)return "cargando deuda"
const cambiaItems=(items)=>{
  setCantidadSeleccion(items.length)
    if(fnChange)fnChange(items)
}

const fnLabel=(item)=>{
const bonif=Number(item.importeBonificacion?item.importeBonificacion:0)
const importe=((item.importe*item.cantidad)-bonif).toFixed(2)
const hijo=item.hijo?` (${item.hijo.apellido.toUpperCase()} ${item.hijo.nombre})`:''
  return `${getFechaString(item.fechaVto)} - ${item.label_idProducto} ${hijo} $${importe} `
}
    return(
       <Grid container>
         <Badge badgeContent={cantidadSeleccion} color="error"> <Button variant="outlined" color="secondary" onClick={()=>setOpen(true)}><Icon className="fas fa-user"/> Deuda</Button></Badge>
      <DialogContenido titulo="Deudas Cliente" open={open} setOpen={setOpen}>
     
        <CheckListFormik campo="seleccionItemsDeuda" callbackchange={cambiaItems}
        fnTransformItem={item=>({...item.data(),
          _id:item.id?item.id:new Date().getTime(), 
          id:item.id?item.id:new Date().getTime(),label:fnLabel(item.data())}
          )}
        lista={deudaSocio} campoLabel={fnLabel} campoId="id" />

      </DialogContenido>
       </Grid>
    )
}