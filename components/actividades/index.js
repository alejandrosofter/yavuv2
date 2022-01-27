import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({modulo,mod,token}) {
  const url="/api/actividades"
const columns=[

  {
    field: 'nombreActividad', 
    headerName: 'Actividad',
    width: 150,
    
  },
  {
    field: 'label_estado', 
    headerName: 'Estado',
    width: 100,
  },
          
  
]
      return (
      <Grid container spacing={1}>
          <TitulosFormularios titulo="ACTIVIDADES" subTitulo="del club" icono="fas fa-funnel-dollar"/>
       <Grid item md={12}> <DataGridServer pageSize={10} url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}