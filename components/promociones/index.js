import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import DataGridServer from '../forms/datagrid/dataGridServer';
import {formatMoney} from "../../helpers/numbers"
import { renderCellExpandData } from '../forms/datagrid/renderCellExpand';
const renderConcepto=(row)=>{
    let salida=""
    if(row.items)
    row.items.map(item=>{
        salida+=`${item.label_concepto} ${item.importe>0?formatMoney(item.importe):''} ${item.porcentaje>0?item.porcentaje+' %':''}  `
    })
    return salida
}
export default function Modulo({modulo,mod,token}) {
  const url="/api/promociones"
const columns=[

    {
        field: 'nombrePromocion',
        headerName: 'Nombre',
        width: 180,
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
    field: 'id',
    headerName: 'Concepto',
    renderCell:(params) =>renderCellExpandData(params,renderConcepto) ,
    width: 380,
  },
   
         
          {
            field: 'estado',
            headerName: 'Estado',
            width: 90,
          },
]
      return (
      <Grid container spacing={1}>
          <TitulosFormularios titulo="PROMOCIONES" subTitulo="generales" icono="fas fa-gift"/>
       <Grid item md={12}> <DataGridServer url={url} modulo={modulo} acciones={modulo.acciones} token={token} columns={columns}/></Grid>
      </Grid    >
      )

}