import DataGridFirebase from '../forms/datagrid/dataGridFirebase';


export default function Modulo({mod}) {

const columns=[

  {
    field: 'nombreCentroCosto', 
    headerName: 'centro de Costo',
    width:350,
    
  },
          
  
]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy="nombreCentroCosto"
       columns={columns} />
      )

}