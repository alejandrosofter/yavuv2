import DataGridFirebase from '../../forms/datagrid/dataGridFirebase';
import {getFechaString} from "../../../helpers/dates"

export default function Modulo({mod}) {
const order="fecha"

const columns=[

      {
            field: 'fecha', 
            headerName: 'Fecha',
            width:120,
            valueGetter: (params) =>getFechaString(params.value,'DD/MM/YY hh:mm:ss')
            
          },
          {
            field: 'temp', 
            headerName: 'Temp',
            width:100,
            
          },
          {
            field: 'hum', 
            headerName: 'HUM',
            width:100,
            
          },
         
          
  
]
      return (
        <DataGridFirebase allUsers={true} coleccion="dispositivos_registros" titulo="REGISTROS" subTitulo="del dispositivo" icono={mod.icono}
        limit={50} mod={mod} acciones={mod.acciones} orderBy={order}
       columns={columns} />
      )

}