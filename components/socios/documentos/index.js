import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import {getFechaString} from "../../../helpers/dates"
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import { ModeloDocumentos,valoresInicialesDocumentacion } from "../../../modelos/ModeloSocios"
export const cols = [
       
  {
    field: 'fechaVto',
    headerName: 'Fecha Vto',
    width: 280,
    renderCell: (params) => getFechaString(params.value)
  },
  {
    field: 'label_tipo',
    headerName: 'Tipo Documento',
    width: 180,
  },
  
]
export default function DocumentacionSocio({data,mod})
{
    const campo="documentacion"
    const labelCampo="DOCUMENTACION"
    const icono="fas fa-image"
    const pathFormulario="socios/documentos/_formDocumentos"
    const urlAcepta=`/api/socios/abmItem?subColeccion=${campo}`
    const accionesExtra=(params)=>{

      return(
        [
          <GridActionsCellItem
          key={params.row}
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
    
      },
      [],
    )
     
    
    return(
        <SubColeccionColeccion mod={mod}  coleccion={mod.coleccion}
        accionesExtra={accionesExtra} 
        urlAcepta={urlAcepta}   titulo={labelCampo} modelo={ModeloDocumentos} valoresIniciales={valoresInicialesDocumentacion}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}