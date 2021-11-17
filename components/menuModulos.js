import { Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import useSWR from 'swr';
import Link from 'next/link';
import Loader from './loader';
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function MenuModulos({}){
    const {data} = useSWR("/api/modulos/mods",fetcher);
    if(!data)return <Loader texto="Cargando menu"/>
    return(
        
        <List component="div" disablePadding>
        {data && data.map(items=>(

        <Link passHref key={`link_${items.id}`} href={"/mod/"+items.id}>
            <ListItem button  >
                
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