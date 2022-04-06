import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionActividadSocio from "./impresion"
import {ModeloDebitoAutomatico,valoresDebitoAutomatico}from "@modelos/ModeloSocios"
import { getFechaString } from "@helpers/dates";
export const cols = [
    
      {
        field: 'fecha',
        headerName: 'Fecha',
        width: 90,
        renderCell: (params) => getFechaString(params.value)
      },

      {
        field: 'label_idCuentaCbu',
        headerName: 'Titular',
        width: 120,
      },
      {
        field: 'detalle',
        headerName: 'Detalle',
        width: 150,
      },
      {
        field: 'estado',
        headerName: 'Estado',
        width: 90,
      },
]
export default function ActividadesSocio({data,mod})
{
    const campo="debitoAutomatico"
    const labelCampo="DEBITO AUTOMATICO"
    const icono="fas fa-credit-card"
    const pathFormulario="socios/debitoAutomatico/_form"
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
       <i> Será utilizada solo la cuenta que se encuentre en estado ACTIVO</i>
        <SubColeccionColeccion sortModel={[{ field: 'fecha',  sort: 'desc', }]} 
        campoId="id" accionesExtra={accionesExtra} coleccion={mod.coleccion}
         titulo={labelCampo} modelo={ModeloDebitoAutomatico} 
        valoresIniciales={valoresDebitoAutomatico}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
        </div>
        
    )
                  
}