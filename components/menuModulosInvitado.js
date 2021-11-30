import { Icon, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import useSWR from 'swr';
import Link from 'next/link';
import Loader from './loader';
import { useEffect } from 'react';
import { ListSubheader } from '@material-ui/core';

const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function MenuModulosInvitado({auth,dataCuenta}){
    if(!dataCuenta)return <>no hay</>
    const {data} = useSWR(`/api/usuariosInvitados/getInvitaciones/${auth.id}/`,fetcher);
    
    if(!data)return <Loader texto="Cargando menu"/>
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