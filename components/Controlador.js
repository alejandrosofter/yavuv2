import { Backdrop, CircularProgress, Typography } from '@mui/material';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Layout from './layout'
import Loader from "./loader"
const fetcher = (...args) => fetch(...args).then(res => res.json())

const cargarClick=(idMod)=>{
  fetch(`/api/mod/click/${idMod}`)
}
export default function Controlador({pathComponente,auth}){
  const router = useRouter()
  
  const urlMod=`/api/mod/modulo/${router.query.id}`
 
  const {data:modulo,mutate} = useSWR(urlMod,fetcher);
  
  const {data:dataCuenta} = useSWR(`/api/cuentas/${auth.id}`,fetcher);
  if(!modulo)return <Loader texto="Cargando modulo"/>
  if(!dataCuenta)return <Loader texto="Cargando cuenta"/>
  const url=eval("`"+pathComponente+"`")
  cargarClick(router.query.id)
    const Componente = dynamic(
        () => import(`./${url}`),
        { loading: ({error,timedOut,isLoading}) => {
          if(isLoading)return <Loader texto="Cargando componente"/>
          
          if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
          if(timedOut)return <p>Tiempo de espera agotado</p> 
          
        }}
      )

    return(
      <Layout auth={auth} icono={modulo.icono} dataCuenta={dataCuenta} modulo={modulo} titulo={modulo.label} >
        <Componente auth={auth} dataCuenta={dataCuenta}  modulo={modulo}/>
        
        </Layout>
    )
   

}