import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material"

import Input from "../forms/input"
import {useEffect, useState} from "react"
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import TitulosFormularios from "../forms/tituloFormularios";
import useSWR from 'swr';
import { getIndexItemArray } from "../../helpers/arrays";

import ItemsModulo from "../forms/itemsModulo";
import {ModeloItems,valoresInicialesItems} from "../../modelos/ModeloPromociones"
import FormItem from "./_formItem"
export default function FormPromocionesGenerales({setFieldValue,errors,values,titulo,subTitulo,icono})
{
    const {data:modsDeuda}= useSWR(`/api/mod/getModGeneraDeuda`)
console.log(errors)
    if(!modsDeuda)return "carga mods"

        
      
    
    return(
        <Stack>
             <TitulosFormularios titulo={titulo} subTitulo={subTitulo} icono={icono}/>
            <Grid sx={{pt:1,mb:2}} md={12} container rowSpacing={2} spacing={2}>
            <Grid item md={5}><Input label="Nombre Promo"  campo="nombrePromocion"/></Grid>
                        
                        <Grid item md={2}><SelectEstaticFormik items={["ACTIVO","INACTIVO"]}  label="ESTADO" campo="estado"/></Grid>
     
                        <Grid item md={2}><SelectFecha label="Fecha Vto" campo="fechaVto"/></Grid>
                        <Grid item xs={12}>
            <ItemsModulo
                   setFieldValue={setFieldValue} 
                   campo="items" data={values.items} 
                   modelo={ModeloItems}
                   nombreModulo="ITEMS" 
                   fullWidth={true} maxWidth={"md"}
                   textoEditar={`Puedes cambiar las propiedades del registro:`}
                   textoAgregar={`Ingrese los datos del registro`}
                   valoresIniciales={valoresInicialesItems()} 
                   form={<FormItem modsDeuda={modsDeuda} />} 
                   dataModulo={[]} columnas={[
                        { field: 'label_concepto',headerName: 'Concepto', editable: false, width: 350,  },
                        
                        { field: 'importe',headerName: 'Aplica $', width: 120,  },
                        { field: 'porcentaje',headerName: 'Aplica %', width: 120,  },
                      
                        
                        ]} 
                         />
            </Grid>
                      
                       
            </Grid>
        </Stack>
    )
} 