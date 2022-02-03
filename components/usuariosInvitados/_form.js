import {  TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab } from "@mui/material"
import Input from "../forms/input"
import SwitchFormik from "../forms/switch"
import { useState } from "react";
import Modelo,{valoresIniciales,ModeloMods,valoresInicialesItems} from "../../modelos/ModeloUsuariosInvitados"
import useSWR from 'swr';
import ItemsModulo from '../forms/itemsModulo';
import Select from "../forms/select"
import Form from "./_formItems"

import Titulo from "../forms/tituloFormularios"
export default function _formUsuarioInvitado({values,setFieldValue,titulo,subTitulo,icono}){
      
    return(
                <Grid container>
                    <Titulo titulo={titulo} subTitulo={subTitulo} icono={icono}/>
                        <Grid item md={12}><Input label="Email "  campo="email"/></Grid>
                        <Grid item md={3}><SwitchFormik label="Activo " campo="activo"/></Grid>
                        <Grid item md={12}>
                        <ItemsModulo
                            setFieldValue={setFieldValue} 
                            campo="mods" data={values.mods} 
                            modelo={ModeloMods}
                            textoEditar={`Puedes cambiar las propiedades del registro:`}
                            textoAgregar={`Ingrese los datos del registro`}
                            nombreModulo="Mods" 
                            fullWidth={true} maxWidth={"md"}
                            valoresIniciales={valoresIniciales()} 
                            form={<Form />} 
                            columnas={[
                              { field: 'label_idMod',headerName: 'Modulo', editable: true, width: 280,  },
                              { field: 'habilitado',headerName: 'Habilitado', width: 120,  
                              valueFormatter: ({ value }) => value?"SI":"NO",
                          },
                              
                              ]}
                                />
                         
                          </Grid>
                </Grid>   
             
    )
}