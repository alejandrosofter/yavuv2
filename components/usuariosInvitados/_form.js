import {  TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab } from "@mui/material"
import Input from "../forms/input"
import SwitchFormik from "../forms/switch"
import { useState } from "react";

import useSWR from 'swr';
import ItemsModulo from '../forms/itemsModulo';
import Select from "../forms/select"
import _FormItemsUsuarios from "./_formItems"

export default function _formUsuarioInvitado({values,modelo,setFieldValue,auth}){
    const [tabDatos, setTabDatos] = useState('datos');
    const cambiaTab = (event, newValue) => {
        setTabDatos(newValue);
      };
      const fetcher = (url) => fetch(url).then((res) => res.json())
   
    const urlMods=`/api/mod/getMods/${auth.id}` 
        
    const { data:mods, mutate,isValidating } = useSWR(urlMods, fetcher)
    if(!mods)return <></>
   
    return(
        <TabContext value={tabDatos}>
         
              <TabList onChange={cambiaTab} key="formUsuariosInvitados">
                <Tab label="Datos" value="datos" />
                <Tab label={`Mods (${values.mods.length})`} value="mods" />
              </TabList>
              <TabPanel value="datos">
                   
                        <Grid item md={12}><Input label="Email "  campo="email"/></Grid>
                        <Grid item md={3}><SwitchFormik label="Activo " campo="activo"/></Grid>
                       
                 
                </TabPanel>
                <TabPanel value="mods">
                   <ItemsModulo 
                   setFieldValue={setFieldValue} 
                   campo="mods" data={values.mods} 
                   modelo={modelo().fields.mods.innerType}
                   nombreModulo="MODS" 
                   textoEditar={`Puedes cambiar los datos del modulo a este usuario. Solo funcionara una vez que reinicie la sesion.`}
                   textoAgregar={`Seleccione el Módulo que desea compartir con este usuario y qué información desea ofrecerle.`}
                   valoresIniciales={{idMod:"",habilitado:false}} 
                   form={<_FormItemsUsuarios />} 
                   dataModulo={mods} columnas={[
                        { field: 'label_idMod',headerName: 'Modulo', editable: true, width: 280,  },
                        { field: 'habilitado',headerName: 'Habilitado', width: 120,  
                        valueFormatter: ({ value }) => value?"SI":"NO",
                    },
                        
                        ]} 
                         />
                </TabPanel>
        
                
                  
          
        </TabContext>
    )
}