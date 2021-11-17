import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { useSession } from 'next-auth/client';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Layout from './layout'
import Loader from "./loader"
const fetcher = (...args) => fetch(...args).then(res => res.json())
 
export default function Controlador({pathComponente}){
  const [session, loading] = useSession()
  
  const router = useRouter()
  const {data:modulo,mutate} = useSWR(`/api/modulos/${router.query.id}`,fetcher);
  const {data:dataUsuario} = useSWR(`/api/usuarios/modulo/${router.query.id}`,fetcher);
  if(!modulo)return <Loader texto="Cargando modulo"/>
  if(!dataUsuario)return <Loader texto="Cargando usuario"/>
  const url=eval("`"+pathComponente+"`")
  
    const Componente = dynamic(
        () => import(`./${url}`),
        { loading: ({error,timedOut,isLoading}) => {
          if(isLoading)return <Loader texto="Cargando componente"/>
          
          if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
          if(timedOut)return <p>Tiempo de espera agotado</p> 
          
        }}
      )
    if (session) {
    return(
      <Layout icono={modulo.icono} modulo={modulo} titulo={modulo.label} acciones={dataUsuario.acciones}>
        <Componente session={session} dataUsuario={dataUsuario} modulo={modulo}/>
        
        </Layout>
    )
    }else{
      return <Loader texto="Cargando sesion"/>
    }

}