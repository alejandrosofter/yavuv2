import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ModeloMensualizado,valoresMensualizado } from "../../../modelos/ModeloSocios";
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionCambiosEstadoSocio from "./impresion"
import {getFechaString} from "../../../helpers/dates"
import { formatMoney } from "../../../helpers/numbers";
import {getValorDb} from "../../../helpers/db"
import Tooltip from '@mui/material/Tooltip';
export const cols = [
  {
    field: 'hijo',
    headerName: '',
    width: 30,
    renderCell: (params) =>params.value?<Tooltip title={`${params.value.apellido} ${params.value.nombre}`}><Icon class="fas fa-users"/></Tooltip>:""
  },    
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 85,
    type: 'date',
    renderCell: (params) =>getFechaString(params.value)
  },
 
 
  {
    field: 'label_idProducto',
    headerName: 'Producto',
    width: 200,
  },
  {
    field: 'importe',
    headerName: '$ Importe',
    width: 110,
    renderCell:params=>formatMoney(params.value)
  },
  {
    field: 'promoProducto',
    headerName: 'Promocion',
    width: 110,
    valueGetter: (params) =>params.value?params.value.nombrePromocion:"-"
  },
  
  {
    field: 'importeBonifica',
    headerName: '$ Promo',
    width: 110,
    renderCell:params=>formatMoney(params.value)
  },
]
export default function CuentaSocio({data,mod})
{
    const campo="mensualizado"
    const labelCampo="MENSUAL"
    const icono="fas fa-file-invoice-dollar"
    const pathFormulario="socios/mensualizado/_form"
    const [datosClick,setDatosClick]=useState()
    const [openImpresion,setOpenImpresion]=useState()
    const accionesExtra=(params)=>{

      return(
        [
          <GridActionsCellItem
          key={params.row.id}
          icon={<Icon fontSize="10" className="fas fa-print"/>}
          label="imprimir"
          onClick={clickImprimir(params.row)}
          showInMenu
          />,
    
        ]
      )
    }
     
    

    const clickImprimir = useCallback(
      (data) => () => {
        setDatosClick(data)
        setOpenImpresion(new Date().getTime()) //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
      
      },
      [],
    )
     
   
    return(
     <div>
        {data.modoFamiliar && <i>Este socio se encuentra en modo familiar.. en este estado no se puede generar deuda mensual a su cargo.. solamente se cargara en el mensual del socio <b>{data.socioFlia?.label}</b></i>}
        {!data.modoFamiliar  && 
          <div>
        <SubColeccionColeccion sortModel={[{ field: 'fecha',  sort: 'desc', }]} 
          accionesExtra={accionesExtra} 
          coleccion={mod.coleccion}   titulo={labelCampo}
        pathFormulario={pathFormulario} columns={cols} 
        modelo={ModeloMensualizado} valoresIniciales={valoresMensualizado}
        registro={data} campo={campo} icono={icono}/>
        <ImpresionDialog titulo="IMPRESION DE ESTADO" abrir={openImpresion}
        datos={datosClick} ComponenteItem={ImpresionCambiosEstadoSocio} /> 
        </div> }
    </div>
    
    )
                  
}