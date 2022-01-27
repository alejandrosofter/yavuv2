import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/_subColeccion";
import ImpresionDialog from "../../forms/impresion"
import ImpresionActividadSocio from "./impresion"
import {ModeloActividades,valoresInicialesActividades}from "../../../modelos/ModeloSocios"
import { getFechaString } from "../../../helpers/dates";
export default function ActividadesSocio({data,token})
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
     
    const cols = [
        
          {
            field: 'fechaInicio',
            headerName: 'Fecha',
            width: 90,
            renderCell: (params) => getFechaString(params.value)
          },
          
          {
            field: 'label_idActividad',
            headerName: 'Actividad',
            width: 180,
          },
          {
            field: 'label_idSubActividad',
            headerName: 'Sub-Actividad',
            width: 180,
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
    return(
      <div>
        <SubColeccionColeccion sortModel={[{ field: 'fechaInicio',  sort: 'desc', }]} campoId="id" accionesExtra={accionesExtra} token={token} 
        urlAcepta={urlAcepta}   titulo={labelCampo} modelo={ModeloActividades} valoresIniciales={valoresInicialesActividades}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        <ImpresionDialog titulo="IMPRESION DE INGRESO A ACTIVIDAD" abrir={openImpresion}
           datos={datosClick} ComponenteItem={ImpresionActividadSocio} />
        </div>
        
    )
                  
}