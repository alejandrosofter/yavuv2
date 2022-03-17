import {  Grid } from "@mui/material"
import { useState ,useEffect, useLayoutEffect } from "react"
import Input from "../../forms/input"
import SelectProducto from "../../productos/selectProducto"
import SelectPromocion from "../../promociones/selectPromocion"

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem"

export default function FormPromocionesSocio({values,setFieldValue})
{
    const cambiaPromo=(valor,registro)=>{
        let importe=0
        if(registro)registro.items.map(item=>{
            console.log(item,values.idProducto)
            if(item.idProducto===values.idProducto.value){
                importe=importe+Number(item.importe)
                importe=importe+Number(values.idProducto_importe)*Number(item.porcentaje/100)
            }
        })
        setFieldValue("importePromocion",importe.toFixed(2))
    }
    return(
        
                    <Grid  md={12} container rowSpacing={2} spacing={2}>
                        
                        <Grid item sx={{flex:1}} md={4}><SelectFecha label="Fecha " campo="fecha"/></Grid>
                        <Grid item md={7}><Input label="Detalle"  campo="detalle"/></Grid>
                        <Grid item md={8}><SelectProducto/></Grid>
                        <Grid item md={7}><SelectPromocion callbackchange={cambiaPromo}/></Grid>
                        
                       
                    </Grid>
           
    )
} 