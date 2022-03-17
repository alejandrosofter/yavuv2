import DataGridFirebase from '../forms/datagrid/dataGridFirebase';


export default function Modulo({mod}) {
const order="nombre"
const columns=[

        {
            field: 'cantidad', 
            headerName: 'Cant.',
            width:60,
            
        },
        {
            field: 'nombre', 
            headerName: 'Nombre',
            width:250,
            
        },
          {
            field: 'detalle', 
            headerName: 'Detalle',
            width:250,
          },
          {
            field: 'esServicio', 
            headerName: 'Es Servicio?',
            width:120,
          },
          {
            field: 'label_idCentroCosto', 
            headerName: 'CC',
            width:150,
          },
          {
            field: 'estado', 
            headerName: 'Estado',
            width:90,
          },
          
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}