import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router'
import { useState } from 'react';
import React from 'react';
import Fetch from '../helpers/Fetcher';

export default function _FormGenerico({callbackSuccess,token,datos,urlAcepta,valoresIniciales,modelo,mutateIndex,esNuevo,mutateRegistro,children}) {

  const router=useRouter();
  const [load,setLoad]=useState();

  const clickForm=async (values)=>{
    setLoad(true)
    const res=await Fetch(urlAcepta,"POST",values,token)
    setLoad(false)
    if(mutateIndex)mutateIndex()
    if(mutateRegistro)mutateRegistro()
    if(callbackSuccess){
      callbackSuccess(values)
    }else  router.back({ shallow: true })
    
  }
  const valores=datos?datos:(valoresIniciales?valoresIniciales(esNuevo):null)
  console.log(valores)
  return (
    <Formik
       initialValues={valores}
       validationSchema={modelo()}
       onSubmit={clickForm}
       validateOnChange={true}
        validateOnBlur={true}
       validateOnMount={true}
       enableReinitialize={true}
     >
        
         {({handleSubmit,values,errors,setFieldValue,validateForm})=>{
      console.log(errors)
           return ( 
            <Grid sx={{my:0}} md={12} item xs={9}> 
            <Form onSubmit={handleSubmit} >
               {!esNuevo && <input name="id" type="hidden" value={router.query.idItem}/>}
              
                {React.cloneElement(
      children,
      {values: values,setFieldValue:setFieldValue}
    )}
                    <LoadingButton loading={load} color="primary" variant="contained" fullWidth type="submit">
                        ACEPTAR
                    </LoadingButton>
                    
               
                
            </Form>
            </Grid>
             )
         } }
    </Formik>
   
  )
}
