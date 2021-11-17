import Grid from '@mui/material/Grid';

import useSWR from "swr";
import Loader from './loader';

const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function ModuloIndexCard({modulo,dataUsuario,vistaItem,url}) {

    const {data:dataIndex,mutate} = useSWR(url,fetcher);
    
    if(!dataIndex) return <Loader texto="Cargando data inicio"/>
      return (
      
        <Grid spacing={3} rowSpacing={2}  container>
            {dataIndex && dataIndex.map(data=>{
            const AuxVistaCard=vistaItem({data,dataUsuario,mutate,modulo})
            return (
            
            <Grid key={`grid_${data.id}`} item >
              {AuxVistaCard}
            </Grid>
            )
            }
            )}
        </Grid>
      
      )

}
