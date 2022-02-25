import Grid from '@mui/material/Grid';

import useSWR from "swr";
import Loader from './loader';

import { useCollection } from '@nandorojo/swr-firestore'

export default function ModuloIndexCard({coleccion,modulo,vistaItem,url}) {

  const { data:dataIndex, update:mutate, error } = useCollection(coleccion)
    if(error) return <div>Error con el logueo del token, puedes desloguear y volver a intenarlo</div>
    if(!dataIndex) return <Loader texto="Cargando data inicio"/>
      return (
      
        <Grid spacing={3} rowSpacing={2}  container>
            {dataIndex && dataIndex.map(data=>{
            const AuxVistaCard=vistaItem({data,mutate,modulo})
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
