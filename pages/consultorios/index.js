import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order="nombre"
const columns=[

      {
            field: 'nombre', 
            headerName: 'Nombre',
            width:190,
            
          },
          {
            field: 'direccion', 
            headerName: 'Direccion',
            width:160,
            
          },
          {
            field: 'telefono', 
            headerName: 'Tel.',
            width:160,
            
          },
          {
            field: 'email', 
            headerName: 'Email',
            width:160,
            
          },
          {
            field: 'estado', 
            headerName: 'Estado',
            width:120,
            
          },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}