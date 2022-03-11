import { Icon, Stack, Typography } from '@mui/material';
import moment from 'moment';
import {formatMoney} from "../../helpers/numbers"
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {

const columns=[

     
      { field: 'icono',headerName: 'Modulo', width: 450,  
      renderCell: (params) => {
        return    <Stack spacing={1} direction="row">
                        <Icon size="small" className={params.formattedValue}/>
                        <Typography variant="h5"> {`${params.row.nombre}`}</Typography>
                  </Stack>  }},
  {
    field: 'detalle',
    headerName: 'Detalle',
    width: 320,
  }, 
  
]
      return (
        <DataGridFirebase allUsers={true} coleccion={mod.coleccion} titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy="nombre"
       columns={columns} />
      )

}
