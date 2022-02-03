import Modelo,{valoresIniciales} from "../../modelos/ModeloFormaPago"

import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"

import TitulosFormularios from "../forms/tituloFormularios"
import Form from "./_form"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/formaPagos/`
    
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={Modelo}  dataUsuario={dataUsuario} >
         
            <Form token={token} titulo="NUEVA" subTitulo="Forma Pagos" icono="fas fa-plus" />
       
      </NuevoGenerico>
      )

}