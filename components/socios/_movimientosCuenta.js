import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../forms/subColeccion/_subColeccion";
import {renderCellExpand} from "../forms/datagrid/renderCellExpand";
import {formatMoney} from "../../helpers/numbers"
export default function MovimientosCuentaSocio({data,token})
{
    const campo="movimientosCuenta"
    const labelCampo="MOVIMIENTOS CUENTA"
    const icono="fas fa-file-invoice-dollar"
    const pathForm="socios/_formMovimientoCuenta" 
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
     
    const renderDetalle=(params)=> {
      return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
      );
    }
    

    const clickImprimir = useCallback(
      (data) => () => {
        console.log(data)
      },
      [],
    )
     
    const cols = [
        {
            field: 'nroRecivo',
            headerName: 'Nro',
            width: 90,
          },

          {
            field: 'fecha',
            headerName: 'Fecha',
            width: 90,
            renderCell: (params) => {
              const d=new Date(params.value.seconds * 1000);
              
              return( //en params.row tengo los otros datos
                <i>{`${moment(d).format('DD/MM/YY')}`}</i>
            )
            }
          },
          {
            field: 'detalle',
            headerName: 'Detalle',
            width: 350,
            renderCell: renderCellExpand
          },
          {
            field: 'importeDebita',
            headerName: '$DEBE',
            width: 90,
            renderCell: (params) =>formatMoney(params.value)
          },
          {
            field: 'importeAcredita',
            headerName: '$HABER',
            width: 90,
            renderCell: (params) =>formatMoney(params.value)
          },
    ]
    return(
        <SubColeccionColeccion sortModel={[{ field: 'nroRecivo',  sort: 'desc', }]} 
        campoId="_id" accionesExtra={accionesExtra} token={token} 
        urlAcepta={`/api/socios/abmItem?subColeccion=${campo}`}   titulo={`${labelCampo}`}
        pathFormulario={pathForm} columns={cols} 
        registro={data} campo={campo} icono={`${icono}`}/>
        
    )
                  
}