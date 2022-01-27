import Modelo,{valoresIniciales} from "../../modelos/ModeloGeneracionDeuda"

import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"

import TitulosFormularios from "../forms/tituloFormularios"
import FormGeneracionDeudas from "./_form"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/generacionDeudas/`
    
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={Modelo}  dataUsuario={dataUsuario} >
         
            <FormGeneracionDeudas token={token} titulo="NUEVA" subTitulo="Generacion de deuda" icono="fas fa-plus" />
       
      </NuevoGenerico>
      )

}