import {  Button, Icon, Stack } from '@mui/material';
import Link from 'next/link'
import { getLinkUrl } from '../helpers/Strings';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
export default function MenuAccionesBarra({acciones,modulo,data})
    {
      if(!acciones) return<></>
      if(acciones.length==0) return<></>
    
        return <Stack direction="row" spacing={2}>
          
          {acciones && acciones.map(item=>{
             
              if(!item.esRegistro)return (
                
                <Link passHref href={getLinkUrl(item.url,modulo,data)}>
                    
                    <Button sx={{color:"white"}}>
                       <Icon sx={{fontSize:15,mr:1}} className={item.icono}/> {item.label}
                    </Button>
                        
                        
                    
                </Link>
                
               
              )
            }
              )}
         
  
         </Stack>
          
            

    }