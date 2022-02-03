import EditarGenerico from "../EditarGenerico"
import ModeloPlanes, { valoresIniciales } from "../../modelos/ModeloPlanes"
import _FormGenerico from "../_formGenerico"
import _formPlanes from "./_form"
import { Field } from "formik"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import Input from "../forms/input"
import { Select } from 'formik-mui';
import MultiSelect from "../forms/multiSelect"
import { useRouter } from "next/router"
import useSWR from "swr"
import ListaTransferencia from "../forms/listaTransferencia"
import _formUsuarioInvitado from "./_form"
import ModeloUsuariosInvitados from "../../modelos/ModeloUsuariosInvitados"

export default function Modulo({modulo,token}) {
    const router=useRouter();
    
    
    const urlAcepta=`/api/${modulo.nombre}/${router.query.idItem}`
      return (
      <EditarGenerico token={token} urlAcepta={urlAcepta} modulo={modulo} valoresIniciales={valoresIniciales} 
      modelo={ModeloUsuariosInvitados}  >
         
        
               <_formUsuarioInvitado titulo="Editar" subTitulo="Invitado" modelo={ModeloUsuariosInvitados} />
       
      </EditarGenerico>
      )

}