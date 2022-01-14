import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../../NuevoGenerico"

export default function NuevoABM({titulo,subTitulo,icono,modulo,token,coleccion,modelo,ComponenteForm,valoresIniciales}) {
    const router=useRouter();
    const urlAcepta=`/api/moduloABM?coleccion=${coleccion}`
    const urlModulos=`/api/modulos/` 
    
      
    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos)
    if(!dataModulos)return <CircularProgress />
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={modelo} >
         
                  <ComponenteForm titulo={titulo} subTitulo={subTitulo} icono={icono}/>
          
       
      </NuevoGenerico>
      )

}