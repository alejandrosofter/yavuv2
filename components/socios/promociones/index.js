import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/_subColeccion";
import { ModeloPromociones,valoresInicialesPromocion } from "../../../modelos/ModeloSocios"
import { getFechaString } from "../../../helpers/dates";
export default function PromocionesSocios({data,token,mod})
{
    const campo="promociones"
    const labelCampo="PROMOCIONES"
    const icono="fas fa-gift"
    const pathFormulario="socios/promociones/_form"
    const urlAcepta=`/api/socios/abmItem?subColeccion=${campo}`
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
    
      },
      [],
    )
     
    const cols = [
       
        {
            field: 'fechaInicio',
            headerName: 'Fecha ',
            width: 110,
            renderCell: (params) => getFechaString(params.value)
          },
          {
            field: 'fechaVto',
            headerName: 'Fecha Vto',
            width: 110,
            renderCell: (params) => getFechaString(params.value)
          },
          {
            field: 'label_idPromocion',
            headerName: 'Promocion',
            width: 250,
          },
          {
            field: 'estado',
            headerName: 'Estado',
            width: 100,
          },
          
    ]
    return(
        <SubColeccionColeccion mod={mod} accionesExtra={accionesExtra} token={token} 
        urlAcepta={urlAcepta}   titulo={labelCampo} modelo={ModeloPromociones} valoresIniciales={valoresInicialesPromocion}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}