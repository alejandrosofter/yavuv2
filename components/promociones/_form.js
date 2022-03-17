import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material"

import Input from "../forms/input"
import {useEffect, useState} from "react"
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import TitulosFormularios from "../forms/tituloFormularios";
import { useCollection,fuego } from '@nandorojo/swr-firestore'

import ItemsModulo from "../forms/itemsModulo";
import {ModeloItems,valoresInicialesItems} from "../../modelos/ModeloPromociones"
import FormItem from "./_formItem"
export default function FormPromocionesGenerales({setFieldValue,errors,values,titulo,subTitulo,icono})
{
    const {data:modsDeuda}= useCollection(`mods`,
    { where:[
        ["generaDeuda","==",true],
        ["idUsuario","==",fuego.auth().currentUser.uid],
    ]})
    if(!modsDeuda)return "carga mods"

        
      
    
    return(
             
            <Grid sx={{pt:1,mb:2}} container rowSpacing={2} spacing={2}>
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
                        { field: 'label_idProducto',headerName: 'Aplica en...', editable: false, width: 350,  },
                        
                        { field: 'importe',headerName: 'Aplica $', width: 120,  },
                        { field: 'porcentaje',headerName: 'Aplica %', width: 120,  },
                      
                        
                        ]} 
                         />
            </Grid>
                      
                       
            </Grid>
    )
} 