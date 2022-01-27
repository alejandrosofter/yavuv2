import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useState,useEffect } from "react"
import Input from "../../forms/input"

import {formatMoney} from "../../../helpers/numbers"
import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"
import Fetch from "../../../helpers/Fetcher"
import { ModeloMovimientoCuenta,valoresInicialesMovimiento } from "../../../modelos/ModeloSocios"
import { useRouter } from "next/router";
import DataGridFormikItems from "../../forms/dataGridFormik";
import {ModeloItemMovimientoCuenta} from "../../../modelos/ModeloSocios"
import FormItemMovimientoCuenta from "./_formItemMovimiento"
import SelectStaticFormik from "../../forms/selectEstaticFormik"
export default function FormMovimientoCuentaSocio({mod})
{
    
    
    let dataInicial={fecha:new Date(),nroRecivo:""}
    if(mod) dataInicial.nroRecivo=mod.config.proximoRecivo
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
               
                        <Grid item md={2}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={5}><SelectStaticFormik label="Estado " campo="estado" items={["PENDIENTE","CANCELADO"]}/></Grid>
                        
                        <Grid item md={12}>
                            <DataGridFormikItems mod={mod} label="Tipo Items" Modelo={ModeloItemMovimientoCuenta} 
                            FormularioItem={FormItemMovimientoCuenta}  campo="itemsTipos" columns={[
                                { field: 'label_tipo', headerName: 'Tipo',width: 250,  editable: true },
                                { field: 'detalle', headerName: 'Detalle',width: 200,  editable: true },
                                
                                { field: 'importe', headerName: '$ Importe',width: 80,renderCell: (params) =>formatMoney(params.value),  editable: true },
                            ]}/>
                        </Grid>
                        <Grid item md={12}><Input label="Detalle "  campo="detalle"/></Grid>

                        
        </Grid>
    )
} 