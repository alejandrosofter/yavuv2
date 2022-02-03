import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({modulo,mod,token}) {
  const url="/api/clientes"
const columns=[

  {
    field: 'nombre', 
    headerName: 'Nombre',
    width: 150,
    
  },
  {
    field: 'apellido', 
    headerName: 'Apellido',
    width: 100,
  },
          
  
]
      return (
      <Grid container spacing={1}>
          <TitulosFormularios titulo="CLIENTES" subTitulo="generales" icono="fas fa-users"/>
       <Grid item md={12}> <DataGridServer pageSize={10} url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}