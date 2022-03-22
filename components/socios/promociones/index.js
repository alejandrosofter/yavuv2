import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import { ModeloPromociones,valoresInicialesPromocion } from "../../../modelos/ModeloSocios"
import { getFechaString } from "../../../helpers/dates";
export const cols = [
   
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

export default function PromocionesSocios({data,mod,auth})
{
    const campo="promociones"
    const labelCampo="PROMOCIONES"
    const icono="fas fa-gift"
    const pathFormulario="socios/promociones/_form"
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
    
      },
      [],
    )
    const cambiaItem=async (valor,tipo)=>{
      await fetch(`/api/socios/checkMensualizado/${data.id}`)
    }
    return(
        <SubColeccionColeccion mod={mod}  coleccion={mod.coleccion}
        accionesExtra={accionesExtra} auth={auth}  callbackchange={cambiaItem}
         titulo={labelCampo} modelo={ModeloPromociones} 
        valoresIniciales={valoresInicialesPromocion}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}