import moment from 'moment';
import { Grid,Icon, Typography } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import { useRouter } from "next/router"
import DataGridServer from '../forms/datagrid/dataGridServer';
import Dialogo from '../forms/dialogo';
import { useState,useEffect } from 'react';
import Fetch from '../../helpers/Fetcher';
import LoadingButton from '@mui/lab/LoadingButton';
import {formatMoney} from '../../helpers/numbers'
export default function Modulo({modulo,mod,token}) {
    const router=useRouter()
    const [open,setOpen]=useState(false)
    const [openVaciar,setOpenVaciar]=useState(false)
    const [deuda,setDeuda]=useState()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      const deuda=async ()=>{
        return  Fetch(`/api/generacionDeudas/${router.query.idItem}`,null,null,token)
      }
      setDeuda(deuda())
  
    },[loading])
    
    const aceptaGenerar=async ()=>{
      setLoading(true)
      const resultado=await Fetch(`/api/generacionDeudas/generar/${router.query.idItem}`,null,null,token)
      setLoading(false)
  }
  const aceptaVaciar=async ()=>{
    setLoading(true)
    const resultado=await Fetch(`/api/generacionDeudas/vaciar/${router.query.idItem}`,null,null,token)
    setLoading(false)
}
    
   
   
  const url=`/api/generacionDeudas/items/${router.query.idItem}`
const columns=[

  {
    field: 'fecha', 
    headerName: 'Fecha',
    width: 80,
    renderCell: (params) => {
      const d=new Date(params.value.seconds * 1000);
      
      return( //en params.row tengo los otros datos
        <i>{`${moment(d).format('DD/MM/YY')}`}</i>
    )
    }
  },
  {
    field: 'fechaVto', 
    headerName: 'Vto',
    width: 80,
    renderCell: (params) => {
      const d=new Date(params.value.seconds * 1000);
      
      return( //en params.row tengo los otros datos
        <i>{`${moment(d).format('DD/MM/YY')}`}</i>
    )
    }
  },
          
  {
    field: 'label_concepto',
    headerName: 'Concepto',
    width: 280,
  },
  {
    field: 'detalleExtra',
    headerName: 'Destino...',
    width: 220,
  }, 
  {
    field: 'importe',
    headerName: '$ Importe',
    width: 120,
    renderCell: (params) =>formatMoney(params.value)
  },    
  {
    field: 'importeBonificacion',
    headerName: '$ Bonificado',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  },  
  
          {
            field: 'estado',
            headerName: 'Estado',
            width: 130,
          }, 
]
      return (
      <Grid container spacing={1}>
          <TitulosFormularios  titulo="Detalle" subTitulo="de deudas " icono="fas fa-users"/>
          {deuda && deuda.estado=="PENDIENTE" &&
          <LoadingButton size="small" onClick={()=>setOpen(true)}  loading={loading} sx={{ml:5}} variant="outlined"><Icon className="fas fa-sync-alt"/> Generar Deuda</LoadingButton>
          }
          {deuda && deuda.estado!=="PENDIENTE" &&
          <LoadingButton size="small" onClick={()=>setOpenVaciar(true)}  loading={loading} sx={{ml:5}} variant="outlined"><Icon className="fas fa-trash"/> Vaciar</LoadingButton>
   
          }
          <Grid item md={12}> 
          <DataGridServer url={url} modulo={{}} acciones={[]} token={token} columns={columns}/>
          </Grid>
          <Dialogo callbackAcepta={aceptaGenerar} titulo="Deseas generar la deuda?"  open={open} icon="fas fa-exclamation-triangle" setOpen={setOpen}/>
          <Dialogo callbackAcepta={aceptaVaciar} titulo="Deseas quitar todos los items?"  open={openVaciar} icon="fas fa-exclamation-triangle" setOpen={setOpenVaciar}/>
      </Grid    >
      )

}