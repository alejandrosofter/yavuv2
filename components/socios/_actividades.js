import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../forms/subColeccion/_subColeccion";
export default function ActividadesSocio({data,token})
{
    const campo="actividades"
    const labelCampo="ACTIVIDADES"
    const icono="fas fa-dumbbell"
    const pathFormulario="socios/_formActividades"

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
        console.log(data)
      },
      [],
    )
     
    const cols = [
        
          {
            field: 'fechaInicio',
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
            field: 'estaBaja',
            headerName: 'Baja',
            width: 90,
          },
          {
            field: 'tieneImporteEspecial',
            headerName: '$ especial',
            width: 80,
          },
          {
            field: 'idActividad',
            headerName: 'Actividad',
            width: 180,
          },
          {
            field: 'tieneVto',
            headerName: 'Vto?',
            width: 90,
          },
    ]
    return(
        <SubColeccionColeccion sortModel={[{ field: 'fechaInicio',  sort: 'desc', }]} campoId="_id" accionesExtra={accionesExtra} token={token} 
        urlAcepta={`/api/socios/abmItem?subColeccion=${campo}`}   titulo={labelCampo} 
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}