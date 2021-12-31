import ModeloClubes,{valoresIniciales} from "../../modelos/ModeloClubes"

import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"
import FormClub from "./_form"

export default function NuevoClub({modulo,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/clubes/abm`
  
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={ModeloClubes}  dataUsuario={dataUsuario} >
         
        <FormClub />
       
      </NuevoGenerico>
      )

}