import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton, Tooltip } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionActividadSocio from "./impresion"
import {ModeloActividades,valoresInicialesActividades}from "../../../modelos/ModeloSocios"
import { getFechaString } from "../../../helpers/dates";
export const cols = [
  {
    field: 'esPorDebitoAutomatico',
    headerName: '',
    width: 20,
    renderCell: (params) =>params.value?<Tooltip title={`Es por Débito automático`}><Icon class="fas fa-credit-card"/></Tooltip>:""
  }, 
      {
        field: 'fechaInicio',
        headerName: 'Fecha',
        width: 90,
        renderCell: (params) => getFechaString(params.value)
      },
      
      {
        field: 'label_idActividad',
        headerName: 'Actividad',
        width: 170,
      },
      {
        field: 'label_idSubActividad',
        headerName: 'Sub-Actividad',
        width: 170,
      },
      {
        field: 'label_idPeriodo',
        headerName: 'Periodo',
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
    const campo="actividades"
    const labelCampo="ACTIVIDADES"
    const icono="fas fa-dumbbell"
    const pathFormulario="socios/actividades/_formActividades"
    const urlAcepta=`/api/socios/abmItem?subColeccion=${campo}&idRegistroPadre=${data.id}&label=${data.apellido} ${data.nombre}`
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
    const cambiaItem=async (valor,tipo)=>{
      await fetch(`/api/socios/checkMensualizado/${data.id}`)
    }
    return(
      <div>
        <SubColeccionColeccion sortModel={[{ field: 'fechaInicio',  sort: 'desc', }]} 
        campoId="id" accionesExtra={accionesExtra} coleccion={mod.coleccion}
        urlAcepta={urlAcepta}   titulo={labelCampo} modelo={ModeloActividades} 
        valoresIniciales={valoresInicialesActividades} callbackchange={cambiaItem}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
       
        </div>
        
    )
                  
}