import { useState,useCallback } from "react";
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Button, Stack,Icon,Grid,Box,Typography, Tooltip } from '@mui/material';
import ImpresionDialog from "../forms/impresion"

import {getFechaString} from "../../helpers/dates"
import { formatMoney } from "../../helpers/numbers";
import {getModUsuario} from "../../helpers/db"
import DgFirebaseABM from "../forms/datagrid/dgFirebaseABM"
import { useRouter } from "next/router";
const getImportesCuenta=items=>{
    let salida=""
    items.forEach(item=>{
        salida+=`${item.label_socio} ${item.label_idProducto} ${formatMoney(item.importe)} | `
    })
    return salida
}
export const columns = [

      {
        field: 'titular',
        headerName: 'Cuenta Banco',
        width: 150,
        renderCell: (params) =>params.value
      }, 
      {
        field: 'label_tipoCuenta',
        headerName: 'Banco',
        width: 100,
      },
     
      {
        field: 'importe',
        headerName: '$ Importe',
        width: 110,
        renderCell: (params) =>params.value?<Tooltip title={`${getImportesCuenta(params.row.items)}`}><Typography variant="overline" >{`${formatMoney(params.value)}`}</Typography></Tooltip>:""
      }, 
      {
        field: 'importeBonificado',
        headerName: '$ Bonif.',
        width: 110,
        renderCell: (params) =>formatMoney(params.value)
      }, 
  {
    field: 'nroCbu',
    headerName: 'CBU/CVU',
    width: 165,
    renderCell:(params) =>params.value
  },
 
  {
    field: 'estado',
    headerName: 'Estado',
    width: 110
  },
]
export default function CuentaSocio({data,mod})
{
    const router=useRouter()
    const order=["titular"]
    const [datosClick,setDatosClick]=useState()
    const [openImpresion,setOpenImpresion]=useState()
    const modDeudas=getModUsuario("socios_deuda")
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
    if(!modDeudas)return "..."

    return(
      <Grid container >
          <Grid item md={12}>
            <DgFirebaseABM where={[["idDebitoAutomatico","==",router.query.idItem]]} allUsers={true} 
            coleccion="debitoAutomatico_debitos" 
            hideSearchBox={true} hideTitle={true} titulo="ITEMS DÉBITO AUTOMÁTICO" 
            subTitulo="de debito automatico" icono="fas fa-user"
            limit={10} acciones={[]} orderBy={order}
        columns={columns} />
        </Grid>
     
     </Grid>
    )
                  
}