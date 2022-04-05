import {  Grid,Icon } from "@mui/material"

import { useState} from "react"

import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectTipoCuenta from "../cuentasCbu/selectTipoCuenta";
import ItemsModulo from "../forms/itemsModulo";
import Input from "../forms/input";
import FormItem from "./_formImputa"
import {ModeloImputaciones,valoresInicialesImputa} from "../../modelos/ModeloDebitoAutomatico"
import { getFechaString } from "../../helpers/dates";
import { GridActionsCellItem } from "@mui/x-data-grid";
export default function FormCobranzaGrupal({setFieldValue,values})
{
    const clickProcesar = (data) => (event) => { 
console.log(data)
    }
    const accionesExtra=data=>[
        <GridActionsCellItem
        icon={<Icon className="fas fa-plug" />}
        label="Procesar"
        key="accion_Procesar"
        onClick={clickProcesar(data)}
        color="inherit"
      />,
    ]
    return(
        <Grid sx={{pt:1,mb:2}} md={12} container rowSpacing={2} spacing={2}>
           
            <Grid item md={2}><SelectEstaticFormik items={["PENDIENTE","GENERADO"]}  label="ESTADO" campo="estado"/></Grid>
            <Grid item md={2}><SelectFecha label="Fecha" campo="fecha"/></Grid>
            <Grid item md={2}><Input label="CUIT Empresa" campo="cuit"/></Grid>
            <Grid item md={3}><SelectTipoCuenta  label="Tipo Cuenta"  campo="tipoCuenta"/></Grid>
            <Grid item md={12}>
                <ItemsModulo
                                accionesExtra={accionesExtra}
                                setFieldValue={setFieldValue} 
                                campo="imputaciones" data={values.imputaciones} 
                                modelo={ModeloImputaciones}
                                nombreModulo="IMPUTACIONES" 
                                fullWidth={true} maxWidth={"md"}
                                textoEditar={`Puedes cambiar las propiedades:`}
                                textoAgregar={`Ingrese los datos del registro`}
                                valoresIniciales={valoresInicialesImputa()} 
                                form={<FormItem />} 
                                dataModulo={[]} columnas={[
                                    { field: 'fecha',headerName: 'Fecha Imputa', width: 120, renderCell: (params) => { return getFechaString(params.value)}    },
                                    { field: 'archivo',headerName: 'Archivo Rta Banco', width: 180,
                                renderCell:params=>params.value.nombreUser  },
                                    { field: 'estado',headerName: 'Estado', width: 100,  },
                            
                                    
                                    ]} 
                                    />    
            </Grid>
            
                       
        </Grid>
   
    )
} 