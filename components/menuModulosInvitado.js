import { Icon, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useCollection, fuego} from '@nandorojo/swr-firestore'
export default function MenuModulosInvitado({}){
    const { data, update, error } = useCollection("usuariosInvitados",{
        where:["idUsuario","==",fuego.auth().currentUser?fuego.auth().currentUser.uid:""]
    })
  
    if(!data)return "Cargando Menu invitaciones..."

    return(
        <div>
            
            <List component="div" disablePadding>
            {(data.mods?data.mods:[]).map(items=>(
             
                   

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