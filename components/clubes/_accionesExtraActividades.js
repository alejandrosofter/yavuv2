import { GridActionsCellItem } from '@mui/x-data-grid';
import { Button,IconButton, Grid,Icon,Box } from '@mui/material';
export default function ExtraAccionesActividades({params}){

    return[
        <GridActionsCellItem
  icon={<Icon fontSize="10" className="fas fa-printer"/>}
  label="imprimior"
//   onClick={clickEditar(params.row)}
  showInMenu
  />,
    ]
}