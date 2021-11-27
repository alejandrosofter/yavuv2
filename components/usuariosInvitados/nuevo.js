import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"


import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"
import ModeloUsuariosInvitados,{valoresIniciales} from "../../modelos/ModeloUsuariosInvitados"

import _formUsuarioInvitado from "./_form"
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Modulo({modulo,dataUsuario}) {
    const router=useRouter();
    
    
    const urlModulos=`/api/modulos/` 
    
    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos, fetcher)
    if(!dataModulos)return <CircularProgress />
    const urlAcepta=`/api/${modulo.nombre}/${router.query.idItem}`
      return (
      <NuevoGenerico urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} modelo={ModeloUsuariosInvitados} esNuevo={true} dataUsuario={dataUsuario} >
         <_formUsuarioInvitado modelo={ModeloUsuariosInvitados} />
      </NuevoGenerico>
      )

}
