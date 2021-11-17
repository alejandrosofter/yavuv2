import EditarGenerico from "../EditarGenerico"
import ModeloUsuarios from "../../modelos/ModeloUsuarios"
import _FormGenerico from "../_formGenerico"

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
import SelectFormik from "../forms/select"
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Modulo({modulo,dataUsuario}) {
    const router=useRouter();
    const urlAcepta=`/api/usuarios/${router.query.idItem}`
    const urlPlanes=`/api/planes/` 

    const { data:dataPlanes, mutate,isValidating } = useSWR(urlPlanes, fetcher)
    if(!dataPlanes)return <CircularProgress />
      return (
      <EditarGenerico urlAcepta={urlAcepta} modulo={modulo} modelo={ModeloUsuarios} dataUsuario={dataUsuario} >
         
        
                <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                
                    <Grid item md={7}><Input label="Email "  campo="email"/></Grid>
                    <Grid item md={3}><Input label="Imagen " campo="image"/></Grid>
                    <Grid item md={4}><Input label="Nombre " campo="name"/></Grid>
                    <Grid item md={5}>
                    <SelectFormik label="Plan" campoId={"id"} campoLabel={"nombre"} lista={dataPlanes} campo="plan"/>
                  

                    
                    </Grid>
                        
                </Grid>
          
       
      </EditarGenerico>
      )

}
Modulo.auth = true