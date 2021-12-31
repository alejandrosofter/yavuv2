import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router'
import { useState } from 'react';
import React from 'react';
import Fetch from '../../helpers/Fetcher'

export default function FormSubitemColeccion({registro,callbackSuccess,token,datos,urlAcepta,valoresIniciales,modelo,mutateIndex,esNuevo,mutateRegistro,children}) {

  const router=useRouter();
  const [load,setLoad]=useState();

  const clickForm=async (values)=>{
    setLoad(true)
    
    if(registro)values.idRegistroPadre=registro.id
    
    const res=await Fetch(urlAcepta,"POST",values,token)
    setLoad(false)
    if(mutateIndex)mutateIndex()
    if(mutateRegistro)mutateRegistro()
    if(callbackSuccess)callbackSuccess(values)
    
    // router.back({ shallow: true })
  }
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
           console.log(errors)
           return ( 
            <Grid sx={{my:3}} md={12} item xs={9}> 
            <Form onSubmit={handleSubmit} >
            
                {React.cloneElement( children, {values: values,setFieldValue:setFieldValue} )}
                
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
