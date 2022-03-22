
import {   Form} from 'formik';
import { useState } from 'react';
import {  TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab,Icon } from '@mui/material';
import Input from "../forms/input"
import Modelo,{valoresIniciales,valoresInicialesItems,ModeloItems} from '../../modelos/ModeloCompras';

import ItemsModulo from '../forms/itemsModulo';
import FormItem from './_formItem';
import { formatMoney } from '../../helpers/numbers';
import SelectFecha from '../forms/selectorFecha';
import SelectEstaticFormik from '../forms/selectEstaticFormik';
import Select2 from '../forms/select2Formik';
import { fuego, useCollection } from '@nandorojo/swr-firestore';

export default function FormCompras({values,setFieldValue}) {

  const [tabDatos, setTabDatos] = useState('datos');
  const {data:centrosCosto}=useCollection("centroCostos",{where:["idUsuario","==",fuego.auth().currentUser?.uid]})
  const {data:proveedores}=useCollection("proveedores",{where:["idUsuario","==",fuego.auth().currentUser?.uid]})

  const cambiaTab = (event, newValue) => {
    setTabDatos(newValue);
  }
  return (
<TabContext value={tabDatos}>
<Grid> 

            <TabList onChange={cambiaTab} >
                <Tab label="Datos" value="datos" />
                <Tab label={`Items (${values?.items?values.items.length:0})`} value="items" />
              </TabList>
            <TabPanel value="datos">
                <Grid sx={{pt:4}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    
                <Grid item md={2}><SelectFecha label="Fecha" campo="fecha"/></Grid>
                <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","CANCELADO"]}  label="Estado" campo="estado"/></Grid>
                <Grid item md={3}><Select2 campo='idCentroCosto' label="Centro de Costo" lista={centrosCosto} campoId="id" 
            campoLabel="nombreCentroCosto" /></Grid>
                <Grid item md={3}><Select2 campo='idEntidad' label="Proveedor" lista={proveedores} campoId="id" 
            campoLabel="razonSocial" /></Grid>
                <Grid item xs={12}><Input label="Detalle " campo="detalle"/></Grid>
                <Grid item xs={3}><Input label="$ Total " campo="importeTotal"/></Grid>
                    
                </Grid>
            </TabPanel>
            <TabPanel value="items">
            <Grid item xs={12}>
            <ItemsModulo
                   setFieldValue={setFieldValue} 
                   campo="items" data={values?.items} 
                   modelo={ModeloItems}
                   nombreModulo="ITEMS" 
                   fullWidth={true} maxWidth={"md"}
                   textoEditar={`Puedes cambiar los items:`}
                   textoAgregar={`Ingrese los datos del item`}
                   valoresIniciales={valoresInicialesItems} 
                   form={<FormItem />} 
                   dataModulo={[]} columnas={[
                        { field: 'cantidad',headerName: 'Cantidad', editable: false, width: 100,  },
                        
                        { field: 'detalle',headerName: 'Detalle', editable: false, width:380,  },
                        { field: 'importe',headerName: 'Importe', width: 80,  
                        renderCell: (params) => formatMoney(params.value)}
                        ]}
                         />
            </Grid>
            </TabPanel>
    

            
    </Grid>
   </TabContext>
   
  )
}
