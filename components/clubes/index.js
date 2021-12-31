import Typography from '@mui/material/Typography';

import { Button, Stack,Icon,Grid,Box,IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import NuevoClub from './nuevo';
import ClubesActividades from './actividades';
import ClubesProfesores from './profesores';
import EditarClub from './editarClub';

export default function Modulo({modulo,token,auth}) {
    const url="/api/clubes/miclub"
    const router=useRouter();
    const { data } = useSWR(url)
    console.log(auth)
    if(!data)return "Cargando data..."
    if(data.esNuevo)return(
        <Grid container>
            <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h4">
                Bienvenido a MI CLUB!
                </Typography>
                <Typography  variant="body1">
                Por favor completa la informacion completa de tu club para continuar!
                </Typography>
                <NuevoClub modulo={modulo} token={token} auth={auth} />
                </Grid>
            
            </Grid>
    )
      return (
            <Grid  spacing={1} container>
                <Grid item xs={12}>
                 <Stack direction="row" spacing={2}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h3"> {data.nombre} </Typography>
                       <EditarClub auth={auth} token={token} data={data} />
                    </Stack>
                <Box direction="row" spacing={1}>
                   
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1"> DOMICILIO: </Typography>
                        <Typography variant="subtitle1"> {data.domicilio} </Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1"> TELEFONO: </Typography>
                        <Typography variant="subtitle1"> {data.telefono} </Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1"> CUIT: </Typography>
                        <Typography variant="subtitle1"> {data.cuit} </Typography>
                    </Stack>
                </Box>
                </Grid>
                
              
                <ClubesActividades data={data} token={token}  />
                <ClubesProfesores data={data} token={token}  />
                
            </Grid>
      )

}