import { useRouter } from 'next/router'
import {  Formik, Form} from 'formik';
import { useState } from 'react';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab,Icon } from '@mui/material';
import Input from "../forms/input"
import ModeloModulos,{valoresInicialesItems} from '../../modelos/ModeloModulos';
import {valoresIniciales} from '../../modelos/ModeloModulos';
import { ColorInput, ColorPalette } from 'material-ui-color';
import Fetch from '../../helpers/Fetcher';
import useSWR,{mutate} from 'swr'
import CheckboxForm from '../forms/checkbox';
import ItemsModulo from '../forms/itemsModulo';
import _FormItemAccion from './_formItemAccion';
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
<Grid sx={{my:3}} md={12} item xs={9}> 
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
            <Grid item xs={12}>
            <ItemsModulo
                   setFieldValue={setFieldValue} 
                   campo="acciones" data={values.acciones} 
                   modelo={ModeloModulos().fields.acciones.innerType}
                   nombreModulo="ACCIONES" 
                   fullWidth={true} maxWidth={"md"}
                   textoEditar={`Puedes cambiar las acciones de esta accion:`}
                   textoAgregar={`Ingrese los datos de la accion`}
                   valoresIniciales={valoresInicialesItems()} 
                   form={<_FormItemAccion />} 
                   dataModulo={[]} columnas={[
                        { field: 'nombre',headerName: 'Nombre', editable: false, width: 100,  },
                        
                        { field: 'label',headerName: 'Label', editable: false, width: 80,  },
                        { field: 'icono',headerName: 'Icono', width: 80,  
                        renderCell: (params) => {
                          return <Icon className={params.formattedValue}/>}  },
                        { field: 'descripcion',headerName: 'Descripcion', editable: false, width: 180,  },
                        { field: 'url',headerName: 'Url', editable: false, width: 280,  },
                        { field: 'color',headerName: 'Color', editable: false, width: 80 },
                        { field: 'esregistro',headerName: 'Es Registro?', width: 60,  
                        valueFormatter: ({ value }) => value?"SI":"NO" },
                        { field: 'esFuncion',headerName: 'Es Funcion?', width: 60,  
                        valueFormatter: ({ value }) => value?"SI":"NO" },
                        
                        ]} 
                         />
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
    </Grid>
   </TabContext>
   
  )
}
