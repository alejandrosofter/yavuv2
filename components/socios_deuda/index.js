import moment from 'moment';
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({mod}) {

const columns=[

    {
        field: 'fechaVto',
        headerName: 'Vto.',
        width: 90,
        type: 'date',
        valueGetter: (params) =>moment(new Date(params.value.seconds * 1000)).format('DD/MM/YY')
      },
      {
        field: 'label_elemento',
        headerName: 'Socio',
        width: 130,
      },
      {
        field: 'label_concepto',
        headerName: 'Concepto',
        width: 230,
        renderCell:(params) =>params.value
      },
      {
        field: 'estado',
        headerName: 'Estado',
        width: 90,
        // renderCell:(params) =>renderCellExpandData(params,fnRender) 
      },
      {
        field: 'importe',
        headerName: '$ Importe',
        width: 90,
        renderCell: (params) =>formatMoney(params.value)
      },
      {
        field: 'importeBonificacion',
        headerName: '$ BONIF.',
        width: 90,
        renderCell: (params) =>formatMoney(params.value?params.value:0)
      },
      {
        field: 'total',
        headerName: '$ TOTAL',
        width: 90,
        renderCell: (params) =>{
            const importe=(params.row.importe?params.row.importe:0)-(params.row.importeBonificacion?params.row.importeBonificacion:0)
            return formatMoney(importe)
        }
      },
]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="de socios" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy="fecha"
       columns={columns} />
      )

}