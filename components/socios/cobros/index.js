import { useState,useCallback } from "react";
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import SubColeccionColeccion from "../../forms/subColeccion/";
import ImpresionDialog from "../../forms/impresion"
import ImpresionActividadSocio from "./impresion"
import {ModeloCobros,valoresCobros}from "../../../modelos/ModeloSocios"
import { getFechaString } from "../../../helpers/dates";
export const cols = [
    
      {
        field: 'fecha',
        headerName: 'Fecha',
        width: 90,
        renderCell: (params) => getFechaString(params.value)
      },
      
      {
        field: 'detalle',
        headerName: 'Detalle',
        width: 90,
      },
      {
        field: 'estado',
        headerName: 'Estado',
        width: 90,
      },
]
export default function Modulo({data,mod})
{
    const campo="cobros"
    const labelCampo="COBROS"
    const icono="fas fa-credit-card"
    const pathFormulario="socios/debitoAutomatico/_form"
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
     
    return(
      <div>
        <SubColeccionColeccion sortModel={[{ field: 'fecha',  sort: 'desc', }]} 
        campoId="id" accionesExtra={accionesExtra} coleccion={mod.coleccion}
         titulo={labelCampo} modelo={ModeloCobros} 
        valoresIniciales={valoresCobros}
        pathFormulario={pathFormulario} columns={cols} 
        registro={data} campo={campo} icono={icono}/>
        <ImpresionDialog titulo="IMPRESION COBRO" abrir={openImpresion}
           datos={datosClick} ComponenteItem={ImpresionActividadSocio} />
        </div>
        
    )
                  
}