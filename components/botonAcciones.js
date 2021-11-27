import { Icon, IconButton, Menu } from '@mui/material'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Link from "next/link"
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud'

import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Fade from '@mui/material/Fade';
import { useRouter } from 'next/router';
import { getLinkUrl } from '../helpers/Strings';
import Dialogo from './forms/dialogo';
import Fetcher from "../helpers/Fetcher"
import DialogContenido from './forms/dialogContenido';
export default function BotonAcciones({data,modulo,mutate,color}){
    //ACCIONES {nombreAccion, color, icono,url}
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setdialog] = useState(false);
    const [openRta, setOpenRta] = useState(false);
    const [rtaServer, setRtaServer] = useState("");
    const [dataMenuSeleccion,setdataMenuSeleccion]=useState()
    const open = Boolean(anchorEl);
    const router=useRouter();
    const clickMenu=e=>{
        // setOpen(!open)
        setAnchorEl(e.currentTarget);
    }
    const handleClose=e=>{
        setAnchorEl(null);
    }
    const getItemAccion=(nombreAccion)=>{
        let salida=null;
        modulo.acciones.map(item=>{
            if(item.nombre==nombreAccion)salida= item
        })
        return salida
    }
    const clickAceptaMenu=async e=>{
        const res= await Fetcher(dataMenuSeleccion.url,"POST",data)
        if(mutate)mutate()
        if(res){
            setRtaServer(JSON.stringify(res))
            setOpenRta(true)
        }
        
        
    }
    const clickAccion=e=>{
        
        setAnchorEl(null);
        const { myValue } = e.currentTarget.dataset;
        const itemAccion=getItemAccion(myValue);
        setdataMenuSeleccion(itemAccion)
        const funcAcepta=(e)=>{
            console.log("acepto",itemAccion)
        }
        if(itemAccion.esFuncion){
            e.preventDefault()
            setdialog(true)
        }
        // const url=itemAccion.url
        
        // if(url)router.push( cade,null, { shallow: true })
        // else itemAccion.funcion(itemAccion)
        
    }

return (
    <>
    <Dialogo open={dialog} icon="fas fa-exclamation-triangle" setOpen={setdialog} 
             titulo="" detalle="Realmente deseas realizar esta operacion?" callbackAcepta={clickAceptaMenu} />
             <DialogContenido titulo="Rta Server" open={openRta} setOpen={setOpenRta}>
                 {rtaServer}
             </DialogContenido>
    <IconButton sx={{color:color?color:""}} aria-expanded={open ? 'true' : undefined} onClick={clickMenu}>
        <MoreVertIcon/>
     </IconButton>
     <Menu anchorEl={anchorEl} onClose={handleClose} TransitionComponent={Fade} open={open}>
        
        {
                modulo.acciones && modulo.acciones.map(item=>{
                    if(item.esRegistro)return (
                        <Link passHref href={getLinkUrl(item.url,modulo,data,item.esFuncion)}>
                        <MenuItem  data-my-value={item.nombre} onClick={clickAccion}>
                            <ListItemIcon>
                                <Icon sx={{color:item.color}} fontSize="small" className={item.icono}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography color={item.color?item.color:""} >{item.label}</Typography>
                            </ListItemText>
                        </MenuItem>
                    </Link>
                    )
                }
                    
                    
                )
            }
            
        
      </Menu>
     </>
)
}