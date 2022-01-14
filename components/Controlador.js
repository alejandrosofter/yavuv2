import { Backdrop, CircularProgress, Typography } from '@mui/material';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Layout from './layout'
import UseModulo from "../hooks/useModulo"
import SwrComponente from '../helpers/swrComponente';
import { InitUser } from "../hooks/useUser";
import UseMod from "../hooks/useModulo"
import { ContextoMods } from '../context/modsContext';
import { ContextoUsuario } from '../context/userContext';
const cargarClick=(idMod)=>{
  fetch(`/api/mod/click/${idMod}`)
}
export default function Controlador({modulo,mod,tokenServer,pathComponente}){
  
  const router=useRouter()
  
  if(modulo)modulo=JSON.parse(modulo)
  if(mod)mod=JSON.parse(mod)
  
  const url=eval("`"+pathComponente+"`")

  cargarClick(router.query.id)
    const Componente = dynamic(
        () => import(`./${url}`),
        { loading: ({error,timedOut,isLoading}) => {
          if(isLoading)return "Cargando componente"
          
          if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
          if(timedOut)return <p>Tiempo de espera agotado</p> 
          
        }}
      )

    return(
      <ContextoUsuario tokenServer={tokenServer} >
        <ContextoMods mod_={mod} modulo_={modulo}>
          <SwrComponente token={tokenServer} >
              <Layout icono={modulo.icono} titulo={modulo.label} modulo={modulo} mod={mod}> 
                  <Componente token={tokenServer} modulo={modulo} mod={mod}/> 
              </Layout>
          </SwrComponente>
        </ContextoMods>
      </ContextoUsuario>
    )
   

}