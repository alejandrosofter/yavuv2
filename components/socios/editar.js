import ModeloSocios,{valoresIniciales} from "../../modelos/ModeloSocios"

import { CircularProgress, Grid, MenuItem, Tab,Typography } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import FormSocios from "./_formSocios"
import EditarGenerico from "../EditarGenerico"
import TitulosFormularios from "../forms/tituloFormularios"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/socios/${router.query.idItem}`
    const urlModulos=`/api/modulos/` 
  
    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos)
    if(!dataModulos)return <CircularProgress />
      return (
      <EditarGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={ModeloSocios}  dataUsuario={dataUsuario} >
        <FormSocios titulo="Editar" subTitulo="Socio" icono="fas fa-pencil" tipoSocios={mod.config.itemsTipoSocios} />
    
       
      </EditarGenerico>
      )

}