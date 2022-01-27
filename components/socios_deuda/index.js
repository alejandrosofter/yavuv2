import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({modulo,mod,token}) {
  const url="/api/socios_deuda"
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
      <Grid container spacing={1}>
          <TitulosFormularios titulo="Deudas" subTitulo="socios " icono="fas fa-file-invoice-dollar"/>
       <Grid item md={12}> <DataGridServer url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}