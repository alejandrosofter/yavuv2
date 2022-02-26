import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
import firebase from "firebase/app"

import FirestoreConfig from "../../config/_firestoreConfig";
import { useEffect, useState } from 'react';
import { Typography ,Stack,Button,CircularProgress} from '@mui/material';

export default function Modulo({mod}) {
  const [datos,setDatos]=useState()
  const [estadoCuenta,setEstadoCuenta]=useState()
  const [precio,setPrecio]=useState()
  const [loading,setLoading]=useState(false)
  const mercado="BTCUSDT"
useEffect(()=>{

buscarData()
},[])
const buscarData=async ()=>{
  setLoading(true)
  await buscarDatosApi(`/api/trading/`,setDatos)
  await buscarDatosApi(`/api/trading/estadoCuenta`,setEstadoCuenta)
  await buscarDatosApi(`/api/trading/precios`,setPrecio)
  setLoading(false)
}
const buscarDatosApi=async (url,fn)=>{
  const data=await fetch(url)
  const jsonData=await data.json()
  fn(jsonData)
}
const calculoPorcentajeStopResta=()=>{
const precioActual=Number(precio[mercado])
const precioEntrada=Number(estadoCuenta.entrada)
const diferencia= precioActual-precioEntrada
return ((diferencia*100)/precioActual).toFixed(2)
}
if(loading ) return  <CircularProgress />
if(!datos)return "Cargando..."
if(!estadoCuenta)return "Cargando..."
if(!precio)return "cargando precio"

      return(
        <Stack>
          <Typography sx={{fontSize:25,fontWeight: 'bold'}}>ESTADO DE CUENTA</Typography>
          <Stack direction="row" spacing={2}> 
            
              <Typography sx={{fontWeight: 'bold'}}>PRECIO ACTUAL:  $ </Typography>
              <Typography sx={{fontWeight: 'bold'}} >{precio[mercado]}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}> 
            
              <Typography sx={{fontWeight: 'bold'}}>GANANCIA: % </Typography>
              <Typography sx={{color: `${Number(datos.porcentaje)<0?"red":"green"}`}}>{datos.porcentaje}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}> 
              <Typography>SALDO: $ </Typography>
              <Typography sx={{color: `${Number(datos.saldo)<0?"red":"green"}`}}>{datos.saldo}</Typography>
          </Stack>
          <Typography sx={{fontSize:25,fontWeight: 'bold'}}>POSICION ACTUAL</Typography>
          <Stack direction="row" spacing={2}> 
              <Typography>ENTRADA: $ </Typography>
              <Typography>{estadoCuenta.entrada}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}> 
              <Typography>BENEFICIO: $ </Typography>
              <Typography sx={{color: `${parseFloat(estadoCuenta.beneficio)<0?"red":"green"}`}}>{parseFloat(estadoCuenta.beneficio).toFixed(2)}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}> 
              <Typography>MARGEN % </Typography>
              <Typography >{estadoCuenta.margen}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}> 
              <Typography>ESTADO OPERACION % </Typography>
              <Typography sx={{color: `${parseFloat(estadoCuenta.beneficio)<0?"red":"green"}`}}>{calculoPorcentajeStopResta()}</Typography>
          </Stack>
          <Button variant="outlined" onClick={buscarData}>Buscar Data</Button>
        </Stack>
      )

}
