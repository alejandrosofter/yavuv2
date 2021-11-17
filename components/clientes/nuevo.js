import EditarGenerico from "../EditarGenerico"
import ModeloClientes,{valoresIniciales} from "../../modelos/ModeloClientes"
import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState } from "react"
import Input from "../forms/input"
import MultiSelect from "../forms/multiSelect"
import { useRouter } from "next/router"
import useSWR from "swr"
import ListaTransferencia from "../forms/listaTransferencia"
import Loader from "../loader"
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Modulo({modulo,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/clientes/${router.query.idItem}`
    const urlModulos=`/api/modulos/` 

    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos, fetcher)
    if(!dataModulos)return <Loader texto="Cargando MODULO" />
      return (
      <EditarGenerico urlAcepta={urlAcepta} valoresIniciales={valoresIniciales} modulo={modulo} modelo={ModeloClientes} esNuevo={true} dataUsuario={dataUsuario} >
         
        
                <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                
                    <Grid item md={7}><Input label="Nombre "  campo="nombre"/></Grid>
                    <Grid item md={3}><Input label="Apellido " campo="apellido"/></Grid>
                    <Grid item md={4}><Input label="Razon Social " campo="razonSocial"/></Grid>
                    <Grid item md={4}><Input label="Cuit " campo="cuit"/></Grid>
                        
                </Grid>
          
       
      </EditarGenerico>
      )

}
Modulo.auth = true