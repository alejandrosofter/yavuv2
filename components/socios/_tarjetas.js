import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../forms/subColeccion/_subColeccion";
export default function TarjetasSocio({data,token})
{
    const campo="tarjetas"
    const labelCampo="TARJETAS"
    const icono="fas fa-credit-card"
    const pathFormulario="socios/_formTarjetas"

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
            field: 'fecha',
            headerName: 'Fecha',
            width: 120,
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
            width: 180,
          },
          
    ]
    return(
        <SubColeccionColeccion  sortModel={[{ field: 'fecha',  sort: 'desc', }]} accionesExtra={accionesExtra} token={token} 
        urlAcepta={`/api/socios/abmItem?subColeccion=${campo}`}   titulo={labelCampo} 
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}