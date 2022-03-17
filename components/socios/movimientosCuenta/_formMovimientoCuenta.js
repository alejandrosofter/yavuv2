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
    
    return(
        <Grid  md={12} container rowSpacing={2} spacing={2}>
               
               <Grid item md={4}><SelectFecha label="Fecha" campo="fecha"/></Grid>
               <Grid item md={4}><SelectFecha label="Vto" campo="fechaVyo"/></Grid>
                <Grid item md={4}><SelectStaticFormik label="Estado " campo="estado" items={["PENDIENTE","CANCELADO"]}/></Grid>
                
                <Grid item md={2}><Input label="Importe"  campo="importe"/></Grid>
                <Grid item md={10}><Input label="Detalle" campo="detalleExtra"/></Grid>
                <Grid item md={2}><Input label="Importe Bon."  campo="importeBonificado"/></Grid>

                <Grid item md={10}><Input label="Detalle Bon."  campo="detalleBonificado"/></Grid>
               
                <Grid item md={12}><Input label="Extra"  campo="detalle"/></Grid>
                
 
                        
        </Grid>
    )
} 