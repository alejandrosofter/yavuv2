import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"


import { useRouter } from "next/router"
import useSWR from "swr"
import NuevoGenerico from "../NuevoGenerico"
import ModeloUsuariosInvitados,{valoresIniciales} from "../../modelos/ModeloUsuariosInvitados"

import _formUsuarioInvitado from "./_form"

export default function Modulo({modulo,token}) {
    const router=useRouter();
    
    const urlAcepta=`/api/${modulo.nombre}/${router.query.idItem}`
      return (
      <NuevoGenerico  token={token} urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} modelo={ModeloUsuariosInvitados} >
         <_formUsuarioInvitado token={token} titulo="Nuevo" subTitulo="Invitado"  modelo={ModeloUsuariosInvitados} />
      </NuevoGenerico>
      )

}
