
import Dgrid from "../forms/datagrid/dataGridFirebase"
import { Grid } from "@mui/material";

import { Icon, Typography,Stack } from "@mui/material";
export default function Modulo({mod}) {
 
      const columns=[

     
            { field: 'icono',headerName: 'Modulo', width: 250,  
            renderCell: (params) => {
              return    <Stack spacing={1} direction="row">
                              <Icon size="small" className={params.formattedValue}/>
                              <Typography variant="h5"> {`${params.row.label}`}</Typography>
                        </Stack>  }},
                        { field: 'acciones',headerName: 'Acciones', width: 480,  
                        renderCell: (params) => 
                           params.value?params.value.map(item=>item.label).join(", "):""
                          },
                        
                    
            
          ]

      return (
            <Dgrid titulo="MODULOS" subTitulo="generales" icono="fas fa-cube" 
            limit={50} mod={mod} acciones={mod.acciones} orderBy="label"
            columns={columns} coleccion={"modulos"}/>
      
      )

}