import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Typography ,InputAdornment,Icon,Grid} from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import algoliasearch from 'algoliasearch/lite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useSWR from 'swr';
import TabsSocio from "./tabsSocio"
import  {useEffect} from "react"
const client = algoliasearch('YEIGHXO1BF', '0e2670dbc0a23a0a5da70aef369d176b');
const index = client.initIndex('socios');

export default function BuscadorSocios({token}) {
  const [datos, setDatos] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [socioSeleccion, setSocioSeleccion] = React.useState(JSON.parse(localStorage.getItem("socioSeleccion")));

  const url=`/api/socios/${socioSeleccion?socioSeleccion.id:''}/`
  useEffect(() => {
    localStorage.setItem("socioSeleccion",JSON.stringify(socioSeleccion))
}, [socioSeleccion])
const { data:dataSocio } = useSWR(socioSeleccion?url:null)
const cambia=e=>{
  index.search(e.target.value).then(({ hits }) => {
    setDatos(hits);
  });
}
const clickSocio=(item,e)=>{

  setSocioSeleccion(item)
}
  return (
    <Grid spacing={2} container>
      <Grid item  xs={3}>
        <Stack direction="row" spacing={1}>
            <Stack>
              <TextField fullWidth InputProps={{
                    startAdornment: <InputAdornment position="start"><Icon className="fas fa-search"/></InputAdornment>,
                  }} label="Buscador de Socios" onChange={cambia}/>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                {datos.map(item=>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemButton data-id={item.id} onClick={clickSocio.bind(this,item)}>
                        <ListItemIcon>
                          <Icon className="fas fa-user" />
                        </ListItemIcon>
                        <ListItemText primary={`${item.apellido} ${item.nombre}`} />
                      </ListItemButton>
                    </ListItem>
                  </Box>
                )}
            </List>
            </Stack>
          </Stack>
      </Grid>
      <Grid item md={8} xs={8}>
        {dataSocio &&
        <Grid container>
          <Grid flex={1} item md={12}>
              <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                  
                  <Stack direction="row" sx={{pl:0}}  justifyContent="center" alignItems="center" spacing={2}>
                  <Icon className="fas fa-user-circle" />
                    <Typography sx={{fontWeight:"bold"}} variant="h3">{dataSocio.apellido}</Typography>
                    <Typography variant="h4">{dataSocio.nombre}</Typography>
                  </Stack>
                  
              </Stack>
              <TabsSocio token={token} dataSocio={dataSocio} />
              </Stack>
          </Grid>
        </Grid>
        }
      </Grid>
    </Grid>
  );
}
