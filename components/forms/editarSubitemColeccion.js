import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router'
import { useState } from 'react';
import React from 'react';
import Fetch from '../../helpers/Fetcher'
import { useDocument } from '@nandorojo/swr-firestore';

export default function FormSubitemColeccion({registro,coleccion,campo,callbackSuccess,datos,mod,valoresIniciales,modelo,children}) {

  const router=useRouter();
  const [load,setLoad]=useState();
  const { data, update, error } = useDocument(`${coleccion}/${registro.id}`, { listen: true})
  const clickForm=async (values)=>{
    setLoad(true)
    
    if(registro)values.idRegistroPadre=registro.id
    update({[campo]:values})
    setLoad(false)
    if(mutateIndex)mutateIndex()
    if(mutateRegistro)mutateRegistro()
    if(callbackSuccess)callbackSuccess(values)
    
    // router.back({ shallow: true })
  }
  if(error)return "Error en conectar con la data..."
  return (
    <Formik
       initialValues={datos?datos:valoresIniciales()}
       validationSchema={modelo}
       onSubmit={clickForm}
       validateOnChange={true}
        validateOnBlur={true}
       validateOnMount={true}
     >
        
         {({handleSubmit,values,errors,setFieldValue,validateForm})=>{
          
           return ( 
            <Grid sx={{my:3}} md={12} item xs={9}> 
            <Form onSubmit={handleSubmit} >
            
                {React.cloneElement( children, {mod:mod,values: values,setFieldValue:setFieldValue} )}
                
                    <LoadingButton sx={{mt:2}} loading={load} color="primary" variant="contained" fullWidth type="submit">
                        ACEPTAR
                    </LoadingButton>
                    
               
                
            </Form>
            </Grid>
             )
         }
         }
    </Formik>
   
  )
}
