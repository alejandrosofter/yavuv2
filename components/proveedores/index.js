import DataGridFirebase from '../forms/datagrid/dataGridFirebase';


export default function Modulo({mod}) {

const columns=[

  {
    field: 'razonSocial', 
    headerName: 'Razon social',
    width: 150,
    
  },
          
  
]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy="razonSocial"
       columns={columns} />
      )

}