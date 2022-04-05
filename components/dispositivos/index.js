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
            field: 'label_tipoEquipo', 
            headerName: 'Tipo Equipo',
            width:160,
            
          },
          {
            field: 'identificador', 
            headerName: 'ID',
            width:120,
            
          },
          {
            field: 'estado', 
            headerName: 'ESTADO',
            width:120,
            
          },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}