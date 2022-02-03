import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({modulo,mod,token}) {
  const url="/api/formaPagos"
const columns=[
     
  {
    field: 'nombreFormaPago',
    headerName: 'Nombre',
    width: 280,
  },
   

         
          {
            field: 'estado',
            headerName: 'Estado',
            width: 120,
          },
]
      return (
      <Grid container spacing={1}>
          <TitulosFormularios titulo="FORMA" subTitulo="de Pagos " icono="fas fa-funnel-dollar"/>
       <Grid item md={12}> <DataGridServer url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}