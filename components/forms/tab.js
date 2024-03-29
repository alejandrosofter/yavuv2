import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <span
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid sx={{ p: 2 }} container>
          {children}
        </Grid>
      )}
    </span>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsFormik({ vistas, hide, label }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12}>
      <Tabs value={value} onChange={handleChange} aria-label={`tab_${label}`}>
        {vistas.map((vista) =>
          !vista.hide ? (
            <Tab
              key={vista.nro}
              label={
                !vista.icono ? (
                  <Typography variant="h6">{vista.label}</Typography>
                ) : (
                  <Typography variant="h6">
                    <Icon className={vista.icono} /> {vista.label}
                  </Typography>
                )
              }
              {...a11yProps(vista.nro)}
            />
          ) : (
            ""
          )
        )}
      </Tabs>

      {vistas.map((vista) =>
        !vista.hide ? (
          <TabPanel key={`vista_${vista.nro}`} value={value} index={vista.nro}>
            <Grid item md={12}>
              {vista.vista}
            </Grid>
          </TabPanel>
        ) : (
          ""
        )
      )}
    </Grid>
  );
}
