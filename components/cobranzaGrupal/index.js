import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
import {formatMoney} from "../../helpers/numbers"
import moment from 'moment';
export default function Modulo({mod}) {
const order="fecha"
  const columns=[

    {
      field: 'fecha', 
      headerName: 'Fecha',
      width: 80,
      renderCell: (params) => {
        const d=new Date(params.value.seconds * 1000);
        
        return( //en params.row tengo los otros datos
          <i>{`${moment(d).format('DD/MM/YY')}`}</i>
      )
      }
    },
    {
      field: 'fechaVto', 
      headerName: 'Vto',
      width: 80,
      renderCell: (params) => {
        const d=new Date(params.value.seconds * 1000);
        
        return( //en params.row tengo los otros datos
          <i>{`${moment(d).format('DD/MM/YY')}`}</i>
      )
      }
    },
            
    {
      field: 'label_concepto',
      headerName: 'Concepto',
      renderCell: (params) => `${params.value} ${params.row.detalle}`,
      width: 280,
    },
    {
      field: 'importeTotal',
      headerName: '$ Total',
      width: 120,
      renderCell: (params) =>formatMoney(params.value)
    },    
    {
      field: 'cantidadTotal',
      headerName: 'Alcanzados...',
      width: 120,
      renderCell: (params) =>`${params.value}`
    },    
  
           
            {
              field: 'estado',
              headerName: 'Estado',
              width: 90,
            },
  ]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}