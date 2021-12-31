import { useState,useCallback } from "react";
import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import ExtraAccionesActividades from "./_accionesExtraActividades"
import SubColeccionColeccion from "../forms/subColeccion/_subColeccion";
export default function ClubesActividades({data,token})
{
    const campo="actividades"
    
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
     
    const colsAct = [
        {
            field: 'nombre',
            headerName: 'Actividad',
            width: 150,
          },
          {
            field: 'label_profesor',
            headerName: 'Profesor',
            width: 200,
          },
          {
            field: 'desdeFecha',
            headerName: 'Desde',
            width: 100,
            renderCell: (params) => ( //en params.row tengo los otros datos
                <i>{`${moment(params.value).format('DD/MM/YY')}`}</i>
            )
          },
          {
            field: 'hastaFecha',
            headerName: 'Hasta',
            width: 100,
            renderCell: (params) => (
                <i>{`${moment(params.value).format('DD/MM/YY')}`}</i>
            )
          },
          
          {
            field: 'nombre',
            headerName: 'Actividad',
            width: 150,
          },
         
    ]
    return(
        <SubColeccionColeccion accionesExtra={accionesExtra} token={token}
         urlAcepta={`/api/clubes/abmItem?subColeccion=actividades`} titulo="ACTIVIDADES" 
        pathFormulario="clubes/_formActividad" columns={colsAct}
        registro={data} campo={campo} icono="fas fa-running"/>
    )
}