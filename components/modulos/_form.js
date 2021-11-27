import { useRouter } from 'next/router'
import {  Formik, Form} from 'formik';
import { useState } from 'react';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab,Icon } from '@mui/material';
import Input from "../forms/input"
import ModeloModulos from '../../modelos/ModeloModulos';
import {valoresIniciales} from '../../modelos/ModeloModulos';

import _accionesModulos from './_acciones';

import Fetch from '../../helpers/Fetcher';
import useSWR,{mutate} from 'swr'
import CheckboxForm from '../forms/checkbox';
const fetcher = (url) => fetch(url).then((res) => res.json())
export default function _FormModulos({datos,modulo,esNuevo,mutateRegistro}) {

  const router=useRouter();
  const [load,setLoad]=useState();
  const [tabDatos, setTabDatos] = useState('datos');
  const [cantidadAcciones,setCantidadAcciones]=useState(0)

  const cambiaTab = (event, newValue) => {
    setTabDatos(newValue);
  };
  const getCantidadAcciones=(values)=>{
    if(values.acciones)return values.acciones.length
    return 0
  }
  const clickForm=async (values)=>{
    setLoad(true)
    const res=await Fetch(`/api/modulos/${values.id}`,"POST",values)
    mutate('/api/modulos')
    if(mutateRegistro)mutateRegistro()
    router.back({ shallow: true })
  }
  return (
<TabContext value={tabDatos}>
     
    <Formik
       initialValues={datos?datos:valoresIniciales(esNuevo)}
       validationSchema={ModeloModulos()}
       onSubmit={clickForm}
       validateOnChange={true}
        validateOnBlur={true}
       validateOnMount={true}
     >
        
         {({handleSubmit,values,errors,setFieldValue,validateForm})=> ( 
          
        <Form onSubmit={handleSubmit} >
           {setCantidadAcciones(getCantidadAcciones(values))}
            <TabList onChange={cambiaTab} key="accionesModulo" aria-label="Acciones Modulo">
                <Tab label="Datos" value="datos" />
                <Tab label={`Acciones (${cantidadAcciones})`} value="acciones" />
              </TabList>
            <TabPanel value="datos">
                <Grid sx={{pt:4}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {!esNuevo &&
                    <input  campo="id" type="hidden"/>
                    }
                    <Grid item xs={3}><Input label="Nombre " campo="nombre"/></Grid>
                    <Grid item xs={2}><Input label="Icono (awesome iconos)" campo="icono"/></Grid>
                    <Grid item  xs={1}><Icon sx={{mt:3}} fontSize="large" className={values.icono}/></Grid>
                    
                    <Grid item xs={4}><Input label="Label" campo="label"/></Grid>
                    <Grid item xs={6}><Input label="Detalle" campo="detalle"/></Grid>
                    <Grid item xs={1}><CheckboxForm label="Activo" campo="activo"/></Grid>
                    <Grid item xs={1}><CheckboxForm label="Es Base?" campo="esBase"/></Grid>
                    
                </Grid>
            </TabPanel>
            <TabPanel value="acciones">
              
            <Grid direction="row" spacing={2}>  
              <_accionesModulos newItem={{nombre:"",accion:""}} campo="acciones" data={values.acciones}/>
              
            </Grid>
            
            </TabPanel>
    
            <Grid sx={{my:3}} item xs={9}> 
           
            
                <LoadingButton loading={load} color="primary" variant="contained" fullWidth type="submit">
                    ACEPTAR
                </LoadingButton>
                
            </Grid>
            
        </Form>
         )}
    </Formik>
   </TabContext>
   
  )
}
