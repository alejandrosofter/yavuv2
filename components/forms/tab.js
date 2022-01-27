import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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

export default function TabsFormik({vistas,children,label}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12}>
  
        <Tabs  value={value} onChange={handleChange} aria-label={`tab_${label}`}>
        {vistas.map(vista=>(
            <Tab key={vista.nro} label={vista.label} {...a11yProps(vista.nro)} />
        ))}
        
          
        </Tabs>
 
      
      
      {vistas.map(vista=>(
            <TabPanel key={`vista_${vista.nro}`} value={value} index={vista.nro}>
           <Grid item  md={12}>{vista.vista}</Grid>
          </TabPanel>
        ))}
      
    </Grid>
  );
}
