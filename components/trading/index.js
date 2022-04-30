import moment from 'moment';
import {formatMoney,formatPorcentual} from "../../helpers/numbers"
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {

const columns=[

  {
    field: 'fecha', 
    headerName: 'Fecha',
    width: 90,
    renderCell: (params) => {
      const d=new Date(params.value.seconds * 1000);
      
      return( //en params.row tengo los otros datos
        <i>{`${moment(d).format('DD/MM HH:mm')}`}</i>
    )
    }
  },
  {
    field: 'fechaCierre', 
    headerName: 'Cierre',
    width: 90,
    renderCell: (params) => {
      if(!params.value)return "OPEN"
      const d=new Date(params.value.seconds * 1000);
      
      return( //en params.row tengo los otros datos
        <i>{`${moment(d).format('DD/MM HH:mm')}`}</i>
    )
    }
  },
          
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 80,
  },
  {
    field: 'acumuladorTakeProfit',
    headerName: '% TP',
    width: 100,
  },
  {
    field: 'margenStop',
    headerName: '% STP',
    width: 100,
  },
 
  {
    field: 'importeEntrada',
    headerName: '$ Entrada',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'importeMarca',
    headerName: '$ AHORA',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'maximo',
    headerName: '$ MAX',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'minimo',
    headerName: '$ MIN',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'porcentajeUsoStopLoss',
    headerName: '% STOP',
    width: 120,
    renderCell: (params) =>formatPorcentual(params.value?params.value:0)
  }, 
  {
    field: 'importeBeneficio',
    headerName: '$ Ganancia',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'porcentualGanancia',
    headerName: '% GANO',
    width: 120,
    renderCell: (params) =>formatPorcentual(params.value?params.value:0)
  }, 

 
]
      return (
        <DataGridFirebase  coleccion={mod.coleccion} titulo={mod.label} subTitulo="BINANCE" icono="fas fa-dollar"
        limit={40} mod={mod} acciones={mod.acciones} orderBy={['fecha', 'desc']}
       columns={columns} />
      )

}
