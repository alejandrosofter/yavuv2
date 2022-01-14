import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { Typography ,Icon,Stack,Badge} from '@mui/material';
import CambiosEstadoSocio from './cambiosEstado';
import MovimientosCuentaSocio from './movimientosCuenta';
import ActividadesSocio from './actividades';
import DocumentacionSocio from './documentos';
import TarjetasSocio from './tarjetas';

function BadgeIcono({icono,cantidad}){

    return(
        <Badge badgeContent={cantidad} color="secondary">
            <Icon className={icono}/>
        </Badge>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function TabsSocio({dataSocio,mod,token}){
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<BadgeIcono cantidad={dataSocio.movimientosCuenta.length} icono="fas fa-file-invoice-dollar"/>}{...a11yProps(0)} /> 
              
                <Tab label={<BadgeIcono cantidad={dataSocio.actividades.length}  icono="fas fa-dumbbell"/>}{...a11yProps(2)} /> 
                <Tab label={<BadgeIcono cantidad={dataSocio.cambiosEstado.length}  icono="fas fa-heart"/>} {...a11yProps(3)} />
                <Tab label={<BadgeIcono cantidad={dataSocio.tarjetas.length}  icono="fas fa-credit-card"/>} {...a11yProps(4)} />
                <Tab label={<BadgeIcono cantidad={dataSocio.documentacion.length}  icono="fas fa-image"/>}{...a11yProps(5)} />
              </Tabs>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',width: '100%' }}>
            <TabPanel value={value} index={0}>
            <MovimientosCuentaSocio mod={mod} data={dataSocio} token={token}/>
            </TabPanel>
            
            <TabPanel value={value} index={1}>
            <ActividadesSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
             <CambiosEstadoSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
            <TarjetasSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
            <DocumentacionSocio data={dataSocio} token={token}/>
            </TabPanel>
            </Box>
          </Stack>
    )
}