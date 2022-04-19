import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order="apellido"
const columns=[

      {
            field: 'apellido', 
            headerName: 'Apellido',
            width:120,
            
          },
          {
            field: 'nombre', 
            headerName: 'Nombre',
            width:120,
            
          },
          {
            field: 'dni', 
            headerName: 'D.N.I',
            width:120,
            
          },
          {
            field: 'telefono', 
            headerName: 'Teléfono',
            width:100,
            
          },
          {
            field: 'label_obraSocial', 
            headerName: 'Obra Social',
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