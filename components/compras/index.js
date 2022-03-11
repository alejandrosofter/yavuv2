import { formatMoney } from '../../helpers/numbers';
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
import {getFechaString } from '../../helpers/dates'

export default function Modulo({mod}) {

const columns=[

    {
        field: 'fecha', 
        headerName: 'Fecha',
        width:100,
        renderCell: (params) =>getFechaString(params.value?params.value:"")
      },
      
      {
        field: 'detalle', 
        headerName: 'Detalle',
        width:400,
        
      },
      {
        field: 'importeTotal', 
        headerName: '$ Importe',
        width:100,
        renderCell: (params) =>formatMoney(params.value?params.value:0)
      },
      {
        field: 'estado', 
        headerName: 'Estado',
        width:100,
        
      },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo="" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={["fecha","desc"]}       columns={columns} />
      )

}