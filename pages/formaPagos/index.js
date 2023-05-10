import moment from 'moment';
import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
export default function Modulo({mod}) {

const columns=[
     
  {
    field: 'nombreFormaPago',
    headerName: 'Nombre',
    width: 280,
  },
   
  {
    field: 'label_idCuentaEfectivo',
    headerName: 'Destino',
    width: 120,
  },
         
  {
    field: 'estado',
    headerName: 'Estado',
    width: 120,
  },
]
      return (
      
          <DataGridFirebase titulo="FORMA" subTitulo="de Pagos "
           icono="fas fa-funnel-dollar" limit={10} mod={mod} acciones={mod.acciones} 
           orderBy="nombreFormaPago"
          columns={columns} />
 
      )

}