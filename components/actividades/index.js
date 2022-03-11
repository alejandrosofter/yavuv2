import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {

const columns=[

  {
    field: 'nombreActividad', 
    headerName: 'Actividad',
    width: 150,
    
  },
  {
    field: 'label_estado', 
    headerName: 'Estado',
    width: 100,
  },
          
  
]
      return (
    
       <DataGridFirebase  titulo={mod.label} subTitulo="del club" icono="fas fa-funnel-dollar"
        limit={10} mod={mod} acciones={mod.acciones} orderBy="nombreActividad"
       columns={columns} />
      
      )

}