import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order="nombre"
const columns=[

          {
            field: 'nombre', 
            headerName: 'Nombre',
            width:120,
            
          },
          {
            field: 'entradas', 
            headerName: 'entradas',
            width:220,
            renderCell:params=>`${params.value.map(e=>e.nombre).join(',')}`
            
          },
          {
            field: 'rutinas', 
            headerName: 'Rutina', 
            width:200, 
            renderCell:params=>`${params.value.length} movimientos`
            
          },
          
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}