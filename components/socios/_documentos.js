import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../forms/subColeccion/_subColeccion";
export default function DocumentacionSocio({data,token})
{
    const campo="documentacion"
    const labelCampo="DOCUMENTACION"
    const icono="fas fa-image"
    const pathFormulario="socios/_formDocumentos"

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
            field: 'fechaVto',
            headerName: 'Fecha',
            width: 280,
            renderCell: (params) => {
              console.log(params.value)
               const d=new Date(params.value.seconds * 1000);
        
              return( //en params.row tengo los otros datos
                <i>{`${moment(d).format('DD/MM/YY')}`}</i>
            )
            }
          },
          {
            field: 'tipo',
            headerName: 'TIPO',
            width: 180,
          },
          
    ]
    return(
        <SubColeccionColeccion  accionesExtra={accionesExtra} token={token} 
        urlAcepta={`/api/socios/abmItem?subColeccion=${campo}`}   titulo={labelCampo} 
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}