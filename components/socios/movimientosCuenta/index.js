import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ModeloCambioEstado,valoresInicialesCambioEstado } from "../../../modelos/ModeloSocios";
import { Button, Stack,Icon,Grid,Box,IconButton, Tooltip, Typography } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionCambiosEstadoSocio from "./impresion"
import {getFechaString} from "../../../helpers/dates"
import { formatMoney } from "../../../helpers/numbers";
import {getModUsuario} from "../../../helpers/db"
import DgFirebaseABM from "../../forms/datagrid/dgFirebaseABM"
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import NewSocioDeuda from "@components/socios_deudas/nuevo" 
import Modelo,{valoresIniciales} from "@modelos/ModeloSocioDeudas"
export const columns = [
  {
    field: 'esPorDebitoAutomatico',
    headerName: '',
    width:15,
    renderCell: (params) =>params.value?<Tooltip title={`Es por Débito automático`}><Icon class="fas fa-credit-card"/></Tooltip>:""
  }, 

  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 80,
    renderCell: (params) =>params.value?<Tooltip title={`CON VTO el ${getFechaString(params.row.fechaVto)}`}><Typography>{`${getFechaString(params.row.fecha)}`}</Typography></Tooltip>:""
  },
  {
    field: 'hijo',
    headerName: '',
    width: 15,
    renderCell: (params) =>params.value?<Tooltip title={`${params.value.apellido} ${params.value.nombre}`}><Icon class="fas fa-users"/></Tooltip>:""
  }, 
  {
    field: 'label_idProducto',
    headerName: 'Servicio/Producto',
    width: 165,
    renderCell:(params) =>renderCellExpandData(params,(row)=>`${row.label_idProducto} ${row.detalle?row.detalle:""}`)
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
    width: 80
  },
]
export default function CuentaSocio({data,mod})
{
    const campo="movimientosCuenta"
    const labelCampo="CUENTA SOCIO"
    const icono="fas fa-file-invoice-dollar"
    const pathFormulario="socios/movimientosCuenta/_formMovimientoCuenta"
    const order="fecha"
    const [datosClick,setDatosClick]=useState()
    const [openImpresion,setOpenImpresion]=useState()
    const modDeudas=getModUsuario("socios_deudas")
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
     
    
    const cargoNuevo=()=>{
      
    }
    const clickImprimir = useCallback(
      (data) => () => {
        setDatosClick(data)
        setOpenImpresion(new Date().getTime()) //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
      
      },
      [],
    )
    if(!modDeudas)return "..."

    return(
      <div>
        <DgFirebaseABM mod={mod} valoresIniciales={valoresIniciales} Modelo={Modelo}
          FormNew={<NewSocioDeuda preData={{idSocio:data.id,label_idSocio:`${data.apellido} ${data.nombre}`}} mod={modDeudas} />} 
          where={[["idSocio","==",data.id]]} 
          allUsers={true} coleccion="socios_deudas" 
          hideSearchBox={true} hideTitle={true} titulo="Resumen" 
          subTitulo="de cuenta" icono="fas fa-dollar"
          limit={10} acciones={modDeudas.acciones} orderBy={order}
          columns={columns} />

       
     </div>
    )
                  
}