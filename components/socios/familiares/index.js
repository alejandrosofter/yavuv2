import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/_subColeccion";
import { ModeloFamiliares,valoresInicialesFamiliares} from "../../../modelos/ModeloSocios"
export default function PromocionesSocios({data,token,mod})
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
    return(
        <SubColeccionColeccion mod={mod} accionesExtra={accionesExtra} token={token} 
        urlAcepta={urlAcepta}   titulo={labelCampo} modelo={ModeloFamiliares} valoresIniciales={valoresInicialesFamiliares}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        
    )
                  
}