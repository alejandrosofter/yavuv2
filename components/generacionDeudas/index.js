import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {

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
    field: 'label_modDeuda',
    headerName: 'Modulo',
    width: 100,
  },
  {
    field: 'importeTotal',
    headerName: '$ Total',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'importeTotalBonificaciones',
    headerName: '$ Bonificado',
    width: 120,
    renderCell: (params) =>formatMoney(params.value?params.value:0)
  }, 
  {
    field: 'deudasEnviadas',
    headerName: 'Enviado',
    width: 90,
    renderCell: (params) =>params.value?params.value.idDeudas?params.value.idDeudas.length:0:0
  },    
  
  {
    field: 'cantidadTotal',
    headerName: 'Deudas',
    width: 100,
 },   
 {
  field: 'totalProcesados',
  headerName: 'Cant.',
  width: 80,
},   
  {
    field: 'porcentajeProcesado',
    headerName: '%',
    width: 80,
  },    

         
          {
            field: 'estado',
            headerName: 'Estado',
            width: 120,
          },
]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="del club" icono="fas fa-funnel-dollar"
        limit={10} mod={mod} acciones={mod.acciones} orderBy="fecha"
       columns={columns} />
      )

}
