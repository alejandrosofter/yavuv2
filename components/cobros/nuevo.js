
import Stack from '@mui/material/Stack';
import { Grid,Typography } from "@mui/material";

import TitulosFormularios from '../forms/tituloFormularios';
import SeleccionSocios from "./seleccionSocio"

import { useState } from 'react';
import Fetch from '../../helpers/Fetcher';
import SeleccionDeuda from "./seleccionDeuda"
import { getStringField } from '../../helpers/Strings';
import NuevoGenerico from '../NuevoGenerico';
import Form from "./_form"
import Modelo,{valoresIniciales}  from "../../modelos/ModeloCobros"
export default function Modulo({modulo,mod,token}) {
const [socioSeleccion,setSocioSeleccion]=useState({})

const cambiaSocio=async (socio)=>{
const socioDb=await Fetch(`/api/socios/${socio.id}`,null,null,token)
setSocioSeleccion(socioDb)
}
const agregaDeuda=deuda=>{

}
const urlAcepta=`/api/cobros/`
      return (
        <NuevoGenerico token={token} urlAcepta={urlAcepta} 
        valoresIniciales={valoresIniciales} modulo={modulo} 
        modelo={Modelo}  >
            <Form token={token} titulo="NUEVO" subTitulo="Cobro" icono="fas fa-plus" />

        </NuevoGenerico>
      )

}