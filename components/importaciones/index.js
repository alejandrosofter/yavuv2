import { getFechaString } from '@helpers/dates';
import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order="fecha"
const [loading,setLoading] = useState(false)
let fnAcciones={
  aplicar:async (data)=>{ 
    setLoading(true)
    fetch(`/api/importaciones/iniciar/${data.id}`)
    .then(async response => {
      setLoading(false) 
       
      console.log(await response.json())
    }) 
    .catch(error => {
      setLoading(false)
      console.error(error)
    })
    
  },

 
} 
const columns=[

      { 
            field: 'fecha', 
            headerName: 'Fecha',
            width:90,
            renderCell: (params) =>getFechaString(params.value?params.value:"")
            
          },
          {
            field: 'clavePrimaria', 
            headerName: 'Pk file',
            width:80,
            
          },
          {
            field: 'destino', 
            headerName: 'Destino',
            width:100,
            
          },
          {
            field: 'registros', 
            headerName: 'Registros',
            width:120,
            renderCell:params=>`${params.row.cantidadRegistros?params.row.cantidadRegistros:0}/${params.row.importados?params.row.importados:0}`
            
          },
          {
            field: 'totalPostProcesa', 
            headerName: 'Res. Post',
            width:80,
            
          },
          {
            field: 'pathFile', 
            headerName: 'Archivo',
            width:420,
            
          },
          {
            field: 'estado', 
            headerName: 'ESTADO',
            width:120,
            
          },
          
  
]
      return (
        <>
        <DataGridFirebase fnAcciones={fnAcciones} titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading} >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
        
      )

}