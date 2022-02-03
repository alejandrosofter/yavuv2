import Grid from '@mui/material/Grid';
import Input from "../forms/input";



import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";
import SelectEstaticFormik from '../forms/selectEstaticFormik';
import SelectFormik from "../forms/select"
import Fetch from "../../helpers/Fetcher";
import { useEffect, useState } from 'react';
export default function FormularioItemPago({token}){
    const [formasPago,setFormasPago]=useState([])
useEffect(()=>{
    const buscar=async ()=>{
        const data=await Fetch(`/api/formaPagos`,null,null,token)
        if(data.datos) setFormasPago(data.datos) 
        else setFormasPago([])
        }
        buscar()
},[])
    return(
   
         <Grid container spacing={2}>

            <Grid item md={3}><SelectFormik lista={formasPago} campoLabel="nombreFormaPago" campoId="id" campo='formaPago' label="Forma de Pago" /></Grid>
            <Grid item md={3}><Input campo='importe' label="Importe" /></Grid>
            
            
          </Grid>
        
       
    )
}