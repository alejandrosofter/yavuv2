import { Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import useSWR from 'swr';
import Link from 'next/link';
import Loader from './loader';
import { useEffect } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function MenuModulos({auth,dataCuenta}){
  
    const {data} = useSWR(`/api/planes/getPlan/${dataCuenta.plan}/${auth.id}/`,fetcher);
    
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