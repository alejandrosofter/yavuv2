import { Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import useSWR from 'swr';
import Link from 'next/link';
import Loader from './loader';
import { useEffect } from 'react';

export default function MenuModulos({}){
  
    const {data} = useSWR(`/api/planes/getplan/`);
    
    if(!data)return <Loader texto="Cargando menu"/>
    return(
        
        <List component="div" disablePadding>
        {data && data.map(items=>(

<Link passHref  key={`link_${items.idMod}`}  href={"/mod/"+items.idMod}>
            <ListItem button>
                
                <ListItemIcon>
                    <Icon  className={items.icono}/>
                </ListItemIcon>
                <ListItemText primary={items.label}/>
                
            </ListItem>
            </Link>
        
    ))}
        
        </List>
    )
    
}