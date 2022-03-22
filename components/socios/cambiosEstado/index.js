import { useState,useCallback } from "react";

import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ModeloCambioEstado,valoresInicialesCambioEstado } from "../../../modelos/ModeloSocios";
import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionCambiosEstadoSocio from "./impresion"
import {fuego} from '@nandorojo/swr-firestore'
export default function CambiosEstadoSocio({data,mod})
{
    const campo="cambiosEstado"
    const labelCampo="CAMBIOS DE ESTADO"
    const icono="fas fa-heart"
    const pathFormulario="socios/cambiosEstado/_formCambiosEstado"
    const [datosClick,setDatosClick]=useState()
    const [openImpresion,setOpenImpresion]=useState()
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
        setDatosClick(data)
        setOpenImpresion(new Date().getTime()) //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
      
      },
      [],
    )
    const cambiaEstado=async (valores,tipo)=>{
      
      if(tipo==="nuevo"){
        await fuego.db.collection("socios").doc(data.id).update({estado:valores.estado})
      }
      await fetch(`/api/socios/checkMensualizado/${data.id}`)
    }
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
        width: 100,
      },
      {
        field: 'label_motivo',
        headerName: 'Motivo',
        width: 300,
      },
      {
        field: 'detalle',
        headerName: 'Acota',
        width: 180,
      },
          
    ]
    
    return(
      <div>
        <i>Al crear un nuevo estado, se modifica el estado del socio (no asi en las modificaciones)</i>
        <SubColeccionColeccion sortModel={[{ field: 'fecha',  sort: 'desc', }]} 
          accionesExtra={accionesExtra} mod={mod} callbackchange={cambiaEstado}
          coleccion={mod.coleccion}   titulo={labelCampo} 
        pathFormulario={pathFormulario} columns={cols} 
        modelo={ModeloCambioEstado} valoresIniciales={valoresInicialesCambioEstado}
        registro={data} campo={campo} icono={icono}/>
        <ImpresionDialog titulo="IMPRESION DE ESTADO" abrir={openImpresion}
        datos={datosClick} ComponenteItem={ImpresionCambiosEstadoSocio} />
     </div>
    )
                  
}