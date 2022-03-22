import * as React from 'react';
import { Icon,Grid,Badge, IconButton, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import TabsSocio from "../tabsSocio"
import  {useEffect} from "react"
import BuscadorSociosInput from '../_buscador';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDocument } from '@nandorojo/swr-firestore';
import MuestraImagen from '../../forms/muestraImagen';
import {SubInfoSocio,ContainerTextoSocio,NombreSocio,ApellidoSocio} from "./style"

export default function BuscadorSocios({mod,auth}) {
  const router=useRouter();
const editarSocio=(e)=>{

}
  const [socioSeleccion, setSocioSeleccion] = React.useState(JSON.parse(localStorage.getItem("socioSeleccion")));
  
  const { data:dataSocio } = useDocument(`socios/${socioSeleccion?.objectID}`)

  useEffect(() => {
   
    localStorage.setItem("socioSeleccion",JSON.stringify(socioSeleccion))
}, [socioSeleccion])
if(!dataSocio){
  return(
    <div>
        <BuscadorSociosInput setSocioSeleccion={setSocioSeleccion}  />
        <Typography>Sin socio seleccionado. Por favor busque un socio ...</Typography>
    </div>
  )
}
  return (
    <Stack direction="row" spacing={1} >
      <Grid item xs={9}>
        {dataSocio &&
        <Grid justifyContent="flex-end" container>
            
            <Grid item   xs={9}> <ContainerTextoSocio >
                <Badge color="secondary" badgeContent={dataSocio.estado==="ALTA"?0:dataSocio.estado} />
                    <MuestraImagen w={70} h={70} pathImagen={dataSocio.foto}/>
                      <ApellidoSocio >{dataSocio.apellido}</ApellidoSocio>
                      <NombreSocio >{dataSocio.nombre}</NombreSocio>
                      
                      <Link passHref href={`/mod/${router.query.id}/editar/${dataSocio.id}`}>
                        <IconButton  fontSize="small" color="secondary" onClick={editarSocio}><Icon className="fas fa-pencil"/></IconButton>
                      </Link>
                      <SubInfoSocio>EN FLIA: {dataSocio.socioFlia?.label} |{dataSocio.domicilio} | DNI:{dataSocio.dni} | {dataSocio.email}</SubInfoSocio>
                     
                  
              </ContainerTextoSocio>
            </Grid>
            <Grid item   xs={3}> <BuscadorSociosInput setSocioSeleccion={setSocioSeleccion}  /> </Grid>
          <Grid flex={1}  item md={12}>
             <TabsSocio auth={auth} mod={mod} dataSocio={dataSocio} />
         
          </Grid>
        </Grid>
        }
      </Grid>
      
      
    </Stack>
  );
}
