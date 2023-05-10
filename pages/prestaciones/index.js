import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {
const order="nombre"
const columns=[
    {
        field: 'label_obraSocial', 
        headerName: 'Obra Social',
        width:120,
        
      },
    {
        field: 'codigo', 
        headerName: 'Codigo',
        width:160,
        
      },
      {
        field: 'nombre', 
        headerName: 'Nombre',
        width:390,
        
      },
      {
        field: 'importe', 
        headerName: '$ Importe',
        width:120,
        
      },
      
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}