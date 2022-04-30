import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
import {getFechaString} from "../../helpers/dates"
import {formatMoney} from "../../helpers/numbers"
import {renderCellExpandData} from "../forms/datagrid/renderCellExpand"
export default function Modulo({mod}) {

  const fnLabelDetalle=(item)=>{
    const bonif=Number(item.importeBonificacion?item.importeBonificacion:0)
    const importe=((item.importe*item.cantidad)-bonif).toFixed(2)
    const hijo=item.hijo?` (${item.hijo.apellido.toUpperCase()} ${item.hijo.nombre})`:''
      return `${getFechaString(item.fechaVto)} - ${item.label_idProducto}  ${item.detalle} ${hijo} $${importe} `
    }
    const getDetalle=row=>{ 
      const items=row.deudas
      let aux=""
      if(items)
        items.forEach(item=>aux+=fnLabelDetalle(item))
      return aux
    }
const columns=[

  {
    field: 'fecha', 
    headerName: 'Fecha',
    width: 100,
    renderCell: (params) => { return getFechaString(params.value)}  
    
  },
  {
    field: 'label_cliente', 
    headerName: 'Cliente',
    width: 250,
  },
  {
    field: 'deudas', 
    headerName: 'Detalle',
    width: 300,
    renderCell: (params) =>  renderCellExpandData(params,getDetalle)
  },
  {
    field: 'importe', 
    headerName: '$ Importe',
    width: 120,
    renderCell: (params) => { return formatMoney(params.value)} 
  },
  {
    field: 'importeBonificacion', 
    headerName: '$ Bonif.',
    width: 150,
    renderCell: (params) => { return formatMoney(params.value)} 
  },
  {
    field: 'importePaga', 
    headerName: '$ Paga.',
    width: 150,
    renderCell: (params) => { return formatMoney(params.value)} 
  },
          
  
]
      return (
        <DataGridFirebase titulo={mod.label} subTitulo=" generales"
        icono="fas fa-funnel-dollar" limit={10} mod={mod} acciones={mod.acciones} 
        orderBy={["fecha","desc"]} columns={columns} />
      )

}