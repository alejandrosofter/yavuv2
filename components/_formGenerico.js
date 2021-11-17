import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router'
import { useState } from 'react';

import Fetch from '../helpers/Fetcher';

export default function _FormGenerico({datos,urlAcepta,valoresIniciales,modelo,mutateIndex,esNuevo,mutateRegistro,children}) {

  const router=useRouter();
  const [load,setLoad]=useState();

  const clickForm=async (values)=>{
    setLoad(true)
    const res=await Fetch(urlAcepta,"POST",values)
    if(mutateIndex)mutateIndex()
    if(mutateRegistro)mutateRegistro()
    router.back({ shallow: true })
  }
  return (
    <Formik
       initialValues={datos?datos:valoresIniciales(esNuevo)}
       validationSchema={modelo()}
       onSubmit={clickForm}
       validateOnChange={true}
        validateOnBlur={true}
       validateOnMount={true}
     >
        
         {({handleSubmit,values,errors,setFieldValue,validateForm})=>{
           console.log(values)
           return ( 
          
            <Form onSubmit={handleSubmit} >
               {!esNuevo && <input name="id" type="hidden" value={router.query.idItem}/>}
                {children}
                <Grid sx={{my:3}} md={12} item xs={9}> 
                    <LoadingButton loading={load} color="primary" variant="contained" fullWidth type="submit">
                        ACEPTAR
                    </LoadingButton>
                    
                </Grid>
                
            </Form>
             )
         } }
    </Formik>
   
  )
}
