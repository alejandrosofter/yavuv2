import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { Typography ,Icon,Stack,Grid,Badge,Paper} from '@mui/material';
import CambiosEstadoSocio from './cambiosEstado';
import MovimientosCuentaSocio from './movimientosCuenta';
import ActividadesSocio from './actividades';
import DocumentacionSocio from './documentos';
import TarjetasSocio from './tarjetas';
import FamiliaresSocio from './familiares';
import PromocionesSocio from './promociones';
import DebitosAutomaticosSocio from "./debitoAutomatico"
import Mensualizado from "./mensualizado"
function BadgeIcono({icono,cantidad,label}){

    return(
     
      <Typography sx={{fontWeight: 'bold',fontSize:10 }} >{`${label} (${cantidad})`}</Typography> 

        
          
       
    
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
export default function TabsSocio({dataSocio,mod,auth}){
    const [value, setValue] = useState(0);
   
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <Stack direction="row" spacing={2} sx={{ }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab icon={<Icon className="fas fa-file-invoice-dollar" />} iconPosition="top" label={<BadgeIcono label="Cuenta" cantidad={dataSocio.movimientosCuenta?dataSocio.movimientosCuenta.length:0} icono="fas fa-file-invoice-dollar"/>}{...a11yProps(0)} /> 
              
                <Tab  icon={<Icon className="fas fa-dumbbell" />} iconPosition="top" label={<BadgeIcono label="Actividades" cantidad={dataSocio.actividades?dataSocio.actividades.length:0}  icono="fas fa-dumbbell"/>}{...a11yProps(2)} /> 
                <Tab icon={<Icon className="fas fa-heart" />} iconPosition="top" label={<BadgeIcono label="Estados" cantidad={dataSocio.cambiosEstado?dataSocio.cambiosEstado.length:0}  icono="fas fa-heart"/>} {...a11yProps(3)} />
                <Tab icon={<Icon className="fas fa-id-card" />} iconPosition="top" label={<BadgeIcono label="Credenciales" cantidad={dataSocio.tarjetas?dataSocio.tarjetas.length:0}  icono="fas fa-id-card"/>} {...a11yProps(4)} />
                <Tab icon={<Icon className="fas fa-image" />} iconPosition="top" label={<BadgeIcono label="Documentos" cantidad={dataSocio.documentacion?dataSocio.documentacion.length:0}  icono="fas fa-image"/>}{...a11yProps(5)} />
                <Tab icon={<Icon className="fas fa-home-user" />} iconPosition="top" label={<BadgeIcono label="Familiares" cantidad={dataSocio.familiares?dataSocio.familiares.length:0}  icono="fas fa-home-user"/>}{...a11yProps(6)} />
                <Tab icon={<Icon className="fas fa-gift" />} iconPosition="top" label={<BadgeIcono label="Promociones" cantidad={dataSocio.promociones?dataSocio.promociones.length:0}  icono="fas fa-gift"/>}{...a11yProps(7)} />
                <Tab icon={<Icon className="fas fa-credit-card" />} iconPosition="top" label={<BadgeIcono label="Debito Automatico" cantidad={dataSocio.debitoAutomatico?dataSocio.debitoAutomatico.length:0}  icono="fas fa-credit-card"/>}{...a11yProps(8)} />
                <Tab icon={<Icon className="fas fa-calendar" />} iconPosition="top" label={<BadgeIcono label="Mensualizado" cantidad={dataSocio.mensualizado?dataSocio.mensualizado.length:0}  icono="fas fa-calendar"/>}{...a11yProps(9)} />
              </Tabs>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',width: '100%' }}>
            <TabPanel value={value} index={0}>
            <MovimientosCuentaSocio mod={mod} data={dataSocio} />
            </TabPanel>
            
            <TabPanel value={value} index={1}>
            <ActividadesSocio mod={mod}  data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={2}>
             <CambiosEstadoSocio mod={mod}  data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={3}>
            <TarjetasSocio mod={mod}  data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={4}>
            <DocumentacionSocio mod={mod}  data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={5}>
            <FamiliaresSocio mod={mod}  data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={6}>
            <PromocionesSocio mod={mod} auth={auth} data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={7}>
            <DebitosAutomaticosSocio mod={mod}  data={dataSocio} />
            </TabPanel>
            <TabPanel value={value} index={8}>
              <Mensualizado mod={mod}  data={dataSocio} />
            </TabPanel>
            </Box>
          </Stack>
    )
}