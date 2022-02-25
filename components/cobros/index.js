import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({modulo,mod,token}) {
  const url="/api/cobros"
const columns=[

  {
    field: 'fecha', 
    headerName: 'Fecha',
    width: 100,
    
  },
  {
    field: 'label_cliente', 
    headerName: 'Cliente',
    width: 250,
  },
  {
    field: 'detalle', 
    headerName: 'Detalle',
    width: 300,
  },
  {
    field: 'importe', 
    headerName: '$importe',
    width: 150,
  },
  {
    field: 'importeBonificado', 
    headerName: '$ Bonif.',
    width: 150,
  },
  {
    field: 'importeTotal', 
    headerName: '$ Total.',
    width: 150,
  },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo=" generales"
        icono="fas fa-funnel-dollar" limit={10} mod={mod} acciones={mod.acciones} 
        orderBy="fecha"
       columns={columns} />
      )

}