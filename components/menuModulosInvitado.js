import { Icon, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import useSWR from 'swr';
import Link from 'next/link';

export default function MenuModulosInvitado({}){
    const {data} = useSWR(`/api/usuariosInvitados/getInvitaciones/`);
  
    if(!data)return "Cargando Menu invitaciones..."
    return(
        <div>
            
            <List component="div" disablePadding>
            {data && data.map(items=>(
             
                   

    <Link passHref  key={`link_${items.idMod}`}  href={"/mod/"+items.idMod}>
        <Tooltip title={`Del usuario ${items.usuario.email}`}>
                <ListItem button>
                    
                    <ListItemIcon>
                        <Icon  className={items.icono}/>
                    </ListItemIcon>
                    
                    <ListItemText primary={items.label}/>
                    
                    
                </ListItem>
                </Tooltip>
                </Link>
                
           
        ))}
            
            </List>
          
        </div>
    )
    
}