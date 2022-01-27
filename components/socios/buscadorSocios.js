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

export default function BuscadorSocios({mod,modulo,token}) {
  const router=useRouter();
const editarSocio=(e)=>{

}
  const [socioSeleccion, setSocioSeleccion] = React.useState(JSON.parse(localStorage.getItem("socioSeleccion")));
  const url=`/api/socios/${socioSeleccion?socioSeleccion.id:''}/`
  const { data:dataSocio } = useSWR(socioSeleccion?url:null)
  useEffect(() => {
    localStorage.setItem("socioSeleccion",JSON.stringify(socioSeleccion))
}, [socioSeleccion])
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
                      <Icon className="fas fa-user-circle" />
                      <Typography sx={{fontWeight:"bold"}} variant="h3">{dataSocio.apellido}</Typography>
                      <Typography variant="h4">{dataSocio.nombre}</Typography>
                    
                    </Stack>
                  </Badge>
                  <Link passHref href={`/mod/${router.query.id}/socios/editar/${socioSeleccion.id}`}>
                    <Button variant="outlined" size="small" onClick={editarSocio}><Icon className="fas fa-pencil"/></Button>
                  </Link>
                  
              </Stack>
              <TabsSocio modulo={modulo} mod={mod} token={token} dataSocio={dataSocio} />
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
