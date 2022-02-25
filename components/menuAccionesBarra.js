import {  Button, Icon, Stack } from '@mui/material';
import Link from 'next/link'
import randomId from 'random-id';
import { getLinkUrl } from '../helpers/Strings';

export default function MenuAccionesBarra({mod})
    {
     const acciones=mod?.acciones?mod.acciones:[]
     
        return <Stack direction="row" spacing={2}>
          
          {acciones && acciones.map(item=>{
             
              if(!item.esRegistro)return (
                
                <Link key={randomId(2)} passHref href={getLinkUrl(item.url,mod,null)}>
                    
                    <Button sx={{color:"white"}}>
                       <Icon sx={{fontSize:15,mr:1}} className={item.icono}/> {item.label}
                    </Button>
                        
                        
                    
                </Link>
                
               
              )
            }
              )}
         
  
         </Stack>
          
            

    }