import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';



export default function MenuRapido({label,direccion,actions,icono}) {
  return (

      <SpeedDial
        FabProps={{ size: "small",color:"secondary" }}
        direction={direccion}
        ariaLabel={label?label:"manuRapido"}
        // sx={{ position: 'absolute', bottom: posX?posX:0, right: posY?posY:0 }}
        icon={icono?icono:<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.fn}
          />
        ))}
      </SpeedDial>

  );
}