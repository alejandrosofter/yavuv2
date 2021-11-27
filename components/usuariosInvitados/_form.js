import {  TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab } from "@mui/material"
import Input from "../forms/input"
import SwitchFormik from "../forms/switch"
import { Select } from 'formik-mui';
import MultiSelect from "../forms/multiSelect"
import { useState } from "react";
import PruebaGrid from './_pruebaGrid';
import _itemsUSuariosInvitados from './_items';
export default function _formUsuarioInvitado({values,modelo}){
    const [tabDatos, setTabDatos] = useState('datos');
    const cambiaTab = (event, newValue) => {
        setTabDatos(newValue);
      };
      
    return(
        <TabContext value={tabDatos}>
         
              <TabList onChange={cambiaTab} key="formUsuariosInvitados">
                <Tab label="Datos" value="datos" />
                <Tab label={`Mods (${values.mods.length})`} value="mods" />
              </TabList>
              <TabPanel value="datos">
                    <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                        <Grid item md={12}><Input label="Email "  campo="email"/></Grid>
                        <Grid item md={3}><SwitchFormik label="Activo " campo="activo"/></Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="mods">
                    <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                        <_itemsUSuariosInvitados modelo={modelo} campo="mods" data={values.mods} />
                    </Grid>
                </TabPanel>
        
                
                
                  
          
        </TabContext>
    )
}