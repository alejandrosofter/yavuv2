import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router'
import { useState } from 'react';
import React from 'react';
import { useDocument } from '@nandorojo/swr-firestore'
import randomId from "random-id";
import {getIndexItemArray} from "../../../helpers/arrays"
export default function _FormItem({registro,campo,coleccion,dataInicial,esNuevo,callbackSuccess,datos,valoresIniciales,modelo,children}) {

  const router=useRouter();
  const [load,setLoad]=useState();
  const {  update } = useDocument(`${coleccion}/${registro.id}`, { listen: true})
  
  const clickForm=async (values)=>{
    setLoad(true)
    
    if(registro)values.idRegistroPadre=registro.id
    if(esNuevo){
      const aux=registro[campo]?registro[campo]:[]
      let auxRegistro=values
      auxRegistro.id=randomId(20)
     
      aux.push(auxRegistro)
      update({[campo]:aux})
    }else{
      //es update registro 
      const aux=registro[campo]?registro[campo]:[]
      let auxRegistro=registro
      const i=getIndexItemArray({data:aux,valor:values.id,campoId:"id"})
      auxRegistro[campo][i]=values
      console.log(auxRegistro)
      // update({[campo]:auxRegistro})
    }
    
    if(callbackSuccess)callbackSuccess(values)

    // router.back({ shallow: true })
  }
  return (
    <Formik
       initialValues={datos?datos:valoresIniciales({dataInicial})}
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
            
                {React.cloneElement( children, {values: values,setFieldValue:setFieldValue,registro} )}
                
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
