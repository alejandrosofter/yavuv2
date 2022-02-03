import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({modulo,mod,token}) {
  const url="/api/usuariosInvitados"
  const fnLabelMods=(items)=>items.map(item=>item.label_idMod).join()

  
const columns=[

  {
    field: 'email', 
    headerName: 'Email',
    width: 250,
    
  },
  {
      field: 'mods', 
      headerName: 'Mods',
      renderCell: (params) => { return fnLabelMods(params.value)}  ,
      width: 400,
    },
  {
    field: 'activo', 
    headerName: 'Estado',
    renderCell: (params) => params.value?"ACTIVO":"INACTIVO",
    width: 100,
  },
  
          
  
]
      return (
      <Grid container spacing={1}>
          <TitulosFormularios titulo="USUARIOS" subTitulo="invitados" icono="fas fa-users"/>
       <Grid item md={12}> <DataGridServer pageSize={10} url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}