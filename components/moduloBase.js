import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from "next/link"
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Icon, Stack } from '@mui/material';
import BotonAcciones from './botonAcciones';
export default function ModuloBase({auth,modulo}){

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const token=await auth.getIdToken()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const clickSalir=e=>{
      auth.signOut()
    setAnchorEl(null)
}
const clickPerfil=e=>{
    setAnchorEl(null);
}
const handleClose=e=>{
    setAnchorEl(null);
}
const data={}
if(auth && modulo)
    return(
      <Stack direction="row">
        
          <Avatar sx={{ width: 30, height: 30,mt:1 }} alt={`mail: ${auth.displayName}`} src={auth.photoURL} />
          <BotonAcciones color="#fff" modulo={modulo}/>
    
       
          
           
          
       
      </Stack>
        
    )
    return <div>Sin cuenta</div>
}