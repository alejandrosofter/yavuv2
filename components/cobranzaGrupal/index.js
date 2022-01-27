import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({modulo,mod,token}) {
  const url="/api/cobranzaGrupal"
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
      <Grid container spacing={1}>
          <TitulosFormularios titulo="Cobranza" subTitulo="Grupal " icono="fas fa-piggy-bank"/>
          <Grid item md={12}> <DataGridServer url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}