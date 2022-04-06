import DataGridFirebase from '../forms/datagrid/dataGridFirebase'
import {getFechaString} from "../../helpers/dates"
import {formatMoney} from "../../helpers/numbers"
import {renderCellExpandData} from "../forms/datagrid/renderCellExpand"
import VentanaImpresion from "../impresorDirecto/toPdf"
import { useState } from 'react'
import ImpresionDialog from "../forms/impresion"
export default function Modulo({mod}) {
const order=["fecha","desc"]
const [openImpresion,setOpenImpresion]=useState(false)
const [dataImpresion,setDataImpresion]=useState()
const getDetalleCobro=(row)=>{
  return row.deudas.map(item=>`${item.label_idProducto} ${formatMoney(item.importe)}`).reduce((n,p)=>`${n} | ${p}`)
}
const getDetalleActividades=(row)=>{
  return row.actividades.map(item=>`${item.label_idActividad}`).reduce((n,p)=>`${n} | ${p}`)
}
let fnAcciones={
  aplicar:(data)=>{ 
    console.log(data)
  },
  imprimir:(data)=>{ 
    setOpenImpresion(true)
    setDataImpresion(data)
  }
}
const columns=[
  {
    field: 'fecha', 
    headerName: 'Fecha',
    width:80,
    renderCell:params=>getFechaString(params.value)
  },
    {
        field: 'socio', 
        headerName: 'Socio',
        width:190,
        renderCell:params=>`${params.value.apellido.toUpperCase()} ${params.value.nombre}`
        
      },
      {
        field: 'actividades', 
        headerName: 'Actividades',
        width:150,
        renderCell:params=>renderCellExpandData(params,getDetalleActividades)
        
      },
      {
        field: 'deudas', 
        headerName: 'Cobro',
        width:250,
        renderCell:params=>renderCellExpandData(params,getDetalleCobro)
        
        
      },
      {
        field: 'estado', 
        headerName: 'Estado',
        width:100,
        
      },
          
  
]
      return (
        <>
            <DataGridFirebase fnAcciones={fnAcciones} titulo={mod.label} subTitulo="al club" icono={mod.icono}
            limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
          columns={columns} /> 
          <ImpresionDialog titulo="IMPRESIÓN AFILIACIÓN" setOpen={setOpenImpresion} open={openImpresion}
           data={dataImpresion} nombrePlantilla="afiliacion_informe" />
          
        </>
      )

}