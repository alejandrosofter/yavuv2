import {  Button, Fab, Icon, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import Link from 'next/link'
import NavigationIcon from '@mui/icons-material/Navigation';
import SpeedDial from '@mui/material/SpeedDial';
import { getLinkUrl } from '../helpers/Strings';
import { Box } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
export default function MenuAccionesSpeed({acciones,modulo,data})
    {
      if(!acciones) return<></>
      if(acciones.length==0) return<></>
   
        return <Box sx={{ height: 0,pt:0  }}>
        <SpeedDial
          ariaLabel="Acciones"
          direction="down"
          sx={{ bottom: 0, right: 0 }}
          icon={<SpeedDialIcon />}
        >
          {acciones && acciones.map(item=>{
              if(!item.esRegistro)return (
                
                  <SpeedDialAction
                  key={item.label}
                  icon={<Link passHref href={getLinkUrl(item.url,modulo,data)}><Button><Icon sx={{ fontSize: 13 }} className={item.icono}/></Button></Link>}
                  tooltipTitle={item.label}>
                    <Link passHref href={getLinkUrl(item.url,modulo,data)}>ss</Link>
                  </SpeedDialAction>
                
               
              )
            }
              )}
         
        </SpeedDial>
      </Box>
          
            

    }