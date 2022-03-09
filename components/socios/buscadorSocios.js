import * as React from 'react';
import { Typography ,Badge,Icon,Grid} from '@mui/material';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import useSWR from 'swr';
import TabsSocio from "./tabsSocio"
import  {useEffect} from "react"
import BuscadorSociosInput from './_buscador';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDocument } from '@nandorojo/swr-firestore';
import MuestraImagen from '../forms/muestraImagen';

export default function BuscadorSocios({mod,modulo,auth}) {
  const router=useRouter();
const editarSocio=(e)=>{

}
  const [socioSeleccion, setSocioSeleccion] = React.useState(JSON.parse(localStorage.getItem("socioSeleccion")));
  
  const { data:dataSocio } = useDocument(`socios/${socioSeleccion.objectID}`)

  useEffect(() => {
   
    localStorage.setItem("socioSeleccion",JSON.stringify(socioSeleccion))
}, [socioSeleccion])
if(!dataSocio){
  return(
    <BuscadorSociosInput setSocioSeleccion={setSocioSeleccion}  />
  )
}
  return (
    <Stack direction="row" spacing={1} >
      <Grid item xs={9}>
        {dataSocio &&
        <Grid container>
          <Grid flex={1} item md={12}>
              <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Badge color="secondary" badgeContent={dataSocio.estado==="ALTA"?0:dataSocio.estado} >
                    <Stack direction="row" sx={{pl:0}}  justifyContent="center" alignItems="center" spacing={2}>
                      <MuestraImagen w={70} h={70} pathImagen={dataSocio.foto}/>
                      <Typography sx={{fontWeight:"bold"}} variant="h3">{dataSocio.apellido}</Typography>
                      <Typography variant="h4">{dataSocio.nombre}</Typography>
                    
                    </Stack>
                  </Badge>
                  <Link passHref href={`/mod/${router.query.id}/editar/${dataSocio.id}`}>
                    <Button variant="outlined" size="small" onClick={editarSocio}><Icon className="fas fa-pencil"/></Button>
                  </Link>
                  
              </Stack>
              <TabsSocio auth={auth} mod={mod} dataSocio={dataSocio} />
              </Stack>
          </Grid>
        </Grid>
        }
      </Grid>
      <Grid item sx={{}} xs={3}>
       <BuscadorSociosInput setSocioSeleccion={setSocioSeleccion}  />
      </Grid>
      
    </Stack>
  );
}
