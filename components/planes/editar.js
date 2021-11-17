import EditarGenerico from "../EditarGenerico"
import ModeloPlanes from "../../modelos/ModeloPlanes"
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
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Modulo({modulo,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/planes/${router.query.idItem}`
    const urlModulos=`/api/modulos/` 

    const { data:dataModulos, mutate,isValidating } = useSWR(urlModulos, fetcher)
    if(!dataModulos)return <CircularProgress />
      return (
      <EditarGenerico urlAcepta={urlAcepta} modulo={modulo} modelo={ModeloPlanes} dataUsuario={dataUsuario} >
         
        
                <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                
                    <Grid item md={7}><Input label="Nombre "  campo="nombre"/></Grid>
                    <Grid item md={3}><Input label="Icono " campo="icono"/></Grid>
                    <Grid item md={4}><Input label="Detalle " campo="detalle"/></Grid>
                    <Grid item md={7}>
                    <ListaTransferencia label="Modulos" campoId={"id"} campoLabel={"label"} items={dataModulos} campo="modulos"/>
                  

                    
                    </Grid>
                        
                </Grid>
          
       
      </EditarGenerico>
      )

}
Modulo.auth = true