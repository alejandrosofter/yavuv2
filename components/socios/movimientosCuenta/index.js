import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Icon } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/_subColeccion";
import {renderCellExpandData} from "../../forms/datagrid/renderCellExpand";
import {formatMoney} from "../../../helpers/numbers"
import ImpresionDialog from "../../forms/impresion"
import { ModeloMovimientoCuenta,valoresInicialesMovimiento } from "../../../modelos/ModeloSocios"
import ImpresionMovimientoCuenta from "./impresion"
import { useRouter } from "next/router";
import DataGridServer from "../../forms/datagrid/dataGridServer";

export default function MovimientosCuentaSocio({mod,modulo,data,token})
{
    const url=`/api/socios_deuda/${data.id}`
  const router=useRouter();
const acciones=[{
    "icono": "fas fa-trash",
    "label": "Quitar",
    "esFuncion": true,
    "method":"DELETE",
    "url": url+ '?id=${data.id}',
    "esRegistro": true,
    "color": "red"
}]
  
    const accionesExtra=(params)=>{

      return(
        [
          <GridActionsCellItem
          icon={<Icon fontSize="10" className="fas fa-print"/>}
          label="imprimir"
          onClick={clickImprimir(params.row)}
          showInMenu
          />,
    
        ]
      )
    }
     

    
    const fnRender=(row)=>{
      let sal=""
      if(row.itemsTipos)
        row.itemsTipos.map(item=>{
          if(item.label_tipo) sal+=`${item.label_tipo} (${formatMoney(item.importe)})`
        
      })
      if(sal=="")return "-"
      return sal
    }
    const renderImporte=(row)=>{
      let total=0
      if(row.itemsTipos)
      row.itemsTipos.map(item=>{
        if(item.importe)total+=Number(item.importe)
        
      })
      return formatMoney(total)
    }
    const clickImprimir = useCallback(
      (data) => () => {
        setDatosClick(data)
        setOpenImpresion(new Date().getTime()) //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
      },
      [],
    )
     
    const cols = [
       

          {
            field: 'fechaVto',
            headerName: 'Vto.',
            width: 90,
            type: 'date',
            valueGetter: (params) =>moment(new Date(params.value.seconds * 1000)).format('DD/MM/YY')
          },
          {
            field: 'label_concepto',
            headerName: 'Concepto',
            width: 230,
            renderCell:(params) =>params.value
          },
          {
            field: 'estado',
            headerName: 'Estado',
            width: 90,
            // renderCell:(params) =>renderCellExpandData(params,fnRender) 
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
    ]
    return(
      <div>
          <DataGridServer url={url} modulo={modulo} acciones={acciones} token={token} columns={cols}/>
        </div>
    )
                  
}