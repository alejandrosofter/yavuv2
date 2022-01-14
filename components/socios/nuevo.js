import ModeloSocios,{valoresIniciales} from "../../modelos/ModeloSocios"

import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"
import FormSocios from "./_formSocios"
import TitulosFormularios from "../forms/tituloFormularios"

export default function Modulo({modulo,mod,token,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/socios/${router.query.idItem}`
    const urlModulos=`/api/modulos/` 
    
    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos)
    if(!dataModulos)return <CircularProgress />
      return (
      <NuevoGenerico token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} 
      modelo={ModeloSocios}  dataUsuario={dataUsuario} >
         
            <FormSocios titulo="NUEVO" subTitulo="Socio" icono="fas fa-plus" tipoSocios={mod.config.itemsTipoSocios} />
       
      </NuevoGenerico>
      )

}