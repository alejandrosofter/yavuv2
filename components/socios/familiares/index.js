import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import { ModeloFamiliares,valoresInicialesFamiliares} from "../../../modelos/ModeloSocios"

export const cols = [
   
      {
        field: 'fecha',
        headerName: 'Fecha',
        width: 280,
        renderCell: (params) => {
          
         if(!params.value)return "-"
    
          return( //en params.row tengo los otros datos
            <i>{`${moment(new Date(params.value.seconds * 1000)).format('DD/MM/YY')}`}</i>
        )
        }
      },
      {
        field: 'label_socio',
        headerName: 'Socio',
        width: 250,
      },
      {
        field: 'relacion',
        headerName: 'Relacion',
        width: 110,
      },
     
      
]
export default function PromocionesSocios({data,mod})
{
    const campo="familiares"
    const labelCampo="FAMILIARES"
    const icono="fas fa-house-user"
    const pathFormulario="socios/familiares/_form"
    const urlAcepta=`/api/socios/abmItem?subColeccion=${campo}`
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
        accionesExtra={accionesExtra} callbackchange={cambiaItem}
        urlAcepta={urlAcepta}   titulo={labelCampo} modelo={ModeloFamiliares} 
        valoresIniciales={valoresInicialesFamiliares}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}