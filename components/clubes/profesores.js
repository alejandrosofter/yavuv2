import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import ExtraAccionesActividades from "./_accionesExtraActividades"
import SubColeccionColeccion from "../forms/subColeccion/_subColeccion";
export default function ClubesProfesores({data,token})
{
    const campo="profesores"
    
    const accionesExtra=(params)=>{

      return(
        [
       
    
        ]
      )
    }
     
    


     
    const colsProfes = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 180,
          },
          {
            field: 'apellido',
            headerName: 'Apellido',
            width: 280,
          }
    ]
    return(
        <SubColeccionColeccion accionesExtra={accionesExtra} token={token} 
        urlAcepta={`/api/clubes/abmItem?subColeccion=profesores`}   titulo="PROFESORES" 
        pathFormulario="clubes/_formProfesores" columns={colsProfes} registro={data}
        registro={data} campo={campo} icono="fas fa-user-graduate"/>
        
    )
                  
}