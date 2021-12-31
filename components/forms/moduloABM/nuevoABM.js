import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"
import dynamic from 'next/dynamic'
export default function NuevoABM({modulo,token,coleccion,pathForm,modelo,valoresIniciales}) {
    const router=useRouter();
    const urlAcepta=`/api/moduloABM?coleccion=${coleccion}`
    const urlModulos=`/api/modulos/` 
    const ComponenteForm = dynamic(
        () => import(`../../../${pathForm}`),
        { loading: ({error,timedOut,isLoading}) => {
          if(isLoading)return "cargando..."
          if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
          if(timedOut)return <p>Tiempo de espera agotado</p> 
          
        }}
      )
    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos)
    if(!dataModulos)return <CircularProgress />
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={modelo} esNuevo={true}  >
         
        
                <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                    <ComponenteForm />
                </Grid>
          
       
      </NuevoGenerico>
      )

}
Modulo.auth = true