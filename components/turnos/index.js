import { getFechaString } from '@helpers/dates';
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order=["fecha","desc"]
const columns=[
    {
        field: 'fecha', 
        headerName: 'Fecha',
        width:110,
        renderCell:params=>getFechaString(params.value,"DD/MM/YY hh:mm")
        
      },
      {
        field: 'duracion', 
        headerName: 'Duración',
        width:90,
        renderCell:params=>`${params.value} mins`
        
      },
      {
        field: 'label_paciente', 
        headerName: 'Paciente',
        width:180,
        
      },
      
          {
            field: 'detalle', 
            headerName: 'Detalle',
            width:250,
            
          },
          {
            field: 'estado', 
            headerName: 'Estado',
            width:100,
            
          },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}