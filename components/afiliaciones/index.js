import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order="estado"
const columns=[

    {
        field: 'socio', 
        headerName: 'Socio',
        width:190,
        
      },
      {
        field: 'documentos', 
        headerName: 'Documentos',
        width:190,
        
      },
      {
        field: 'debitoAutomatico', 
        headerName: 'Debitos',
        width:190,
        
      },
      {
        field: 'estado', 
        headerName: 'Estado',
        width:100,
        
      },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="al club" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}