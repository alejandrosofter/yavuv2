import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { Typography ,Icon,Grid,Badge} from '@mui/material';
import CambiosEstadoSocio from './_cambiosEstado';
import MovimientosCuentaSocio from './_movimientosCuenta';
import ActividadesSocio from './_actividades';
import DocumentacionSocio from './_documentos';
import TarjetasSocio from './_tarjetas';

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
export default function TabsSocio({dataSocio,token}){
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<BadgeIcono cantidad={dataSocio.movimientosCuenta.length} icono="fas fa-file-invoice-dollar"/>}{...a11yProps(0)} /> 
                <Tab label={<Icon className="fas fa-info"/>}{...a11yProps(1)} /> 
                <Tab label={<BadgeIcono cantidad={dataSocio.actividades.length}  icono="fas fa-dumbbell"/>}{...a11yProps(2)} /> 
                <Tab label={<BadgeIcono cantidad={dataSocio.cambiosEstado.length}  icono="fas fa-heart"/>} {...a11yProps(3)} />
                <Tab label={<BadgeIcono cantidad={dataSocio.tarjetas.length}  icono="fas fa-credit-card"/>} {...a11yProps(4)} />
                <Tab label={<BadgeIcono cantidad={dataSocio.documentacion.length}  icono="fas fa-image"/>}{...a11yProps(5)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            <MovimientosCuentaSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              infoSocio
            </TabPanel>
            <TabPanel value={value} index={2}>
            <ActividadesSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
             <CambiosEstadoSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
            <TarjetasSocio data={dataSocio} token={token}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
            <DocumentacionSocio data={dataSocio} token={token}/>
            </TabPanel>
          </Box>
    )
}