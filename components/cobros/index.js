import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
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
      <Grid container spacing={1}>
          <TitulosFormularios titulo="COBROS" subTitulo="generales" icono="fas fa-money-check-alt"/>
       <Grid item md={12}> <DataGridServer pageSize={10} url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}