import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ModeloCambioEstado,valoresInicialesCambioEstado } from "../../../modelos/ModeloSocios";
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/_subColeccion";
import ImpresionDialog from "../../forms/impresion"
import ImpresionCambiosEstadoSocio from "./impresion"
export default function CambiosEstadoSocio({data,token})
{
    const campo="cambiosEstado"
    const labelCampo="CAMBIOS DE ESTADO"
    const icono="fas fa-heart"
    const pathFormulario="socios/cambiosEstado/_formCambiosEstado"
    const urlAcepta=`/api/socios/abmItem?subColeccion=${campo}`
    const [datosClick,setDatosClick]=useState()
    const [openImpresion,setOpenImpresion]=useState()
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
        setDatosClick(data)
        setOpenImpresion(new Date().getTime()) //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
      
      },
      [],
    )
     
    const cols = [
      {
        field: 'fecha',
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
        field: 'estado',
        headerName: 'Estado',
        width: 180,
      },
      {
        field: 'detalle',
        headerName: 'Detalle',
        width: 380,
      },
          
    ]
    return(
      <div>
        <SubColeccionColeccion sortModel={[{ field: 'fecha',  sort: 'desc', }]} 
          accionesExtra={accionesExtra} token={token} 
        urlAcepta={urlAcepta}   titulo={labelCampo}
        pathFormulario={pathFormulario} columns={cols} modelo={ModeloCambioEstado} valoresIniciales={valoresInicialesCambioEstado}
        registro={data} campo={campo} icono={icono}/>
        <ImpresionDialog titulo="IMPRESION DE ESTADO" abrir={openImpresion}
        datos={datosClick} ComponenteItem={ImpresionCambiosEstadoSocio} />
     </div>
    )
                  
}