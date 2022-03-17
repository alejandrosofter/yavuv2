import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ModeloCambioEstado,valoresInicialesCambioEstado } from "../../../modelos/ModeloSocios";
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionCambiosEstadoSocio from "./impresion"
import {getFechaString} from "../../../helpers/dates"
import { formatMoney } from "../../../helpers/numbers";

export const cols = [
       
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 85,
    type: 'date',
    valueGetter: (params) =>getFechaString(params.value)
  },
  {
    field: 'fechaVto',
    headerName: 'Vto.',
    width: 85,
    type: 'date',
    valueGetter: (params) =>getFechaString(params.value)
  },
  {
    field: 'detalleExtra',
    headerName: 'Detalle',
    width: 200,
    renderCell:(params) =>params.value
  },
 
  {
    field: 'importe',
    headerName: '$ Importe',
    width: 90,
    renderCell: (params) =>formatMoney(params.value)
  },
  {
    field: 'importeBonificacion',
    headerName: '$ BONIF.',
    width: 90,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  },
  {
    field: 'total',
    headerName: '$ TOTAL',
    width: 90,
    renderCell: (params) =>{
        const importe=(params.row.importe?params.row.importe:0)-(params.row.importeBonificacion?params.row.importeBonificacion:0)
        return formatMoney(importe)
    }
  },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 90
  },
]
export default function CuentaSocio({data,mod})
{
    const campo="movimientosCuenta"
    const labelCampo="CUENTA SOCIO"
    const icono="fas fa-file-invoice-dollar"
    const pathFormulario="socios/movimientosCuenta/_formMovimientoCuenta"
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
        <SubColeccionColeccion sortModel={[{ field: 'fecha',  sort: 'desc', }]} 
          accionesExtra={accionesExtra} 
          coleccion={mod.coleccion}   titulo={labelCampo}
        pathFormulario={pathFormulario} columns={cols} 
        modelo={ModeloCambioEstado} valoresIniciales={valoresInicialesCambioEstado}
        registro={data} campo={campo} icono={icono}/>
        <ImpresionDialog titulo="IMPRESION DE ESTADO" abrir={openImpresion}
        datos={datosClick} ComponenteItem={ImpresionCambiosEstadoSocio} />
     </div>
    )
                  
}