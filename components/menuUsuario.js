import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Icon, Stack } from '@mui/material';
export default function MenuUsuario({auth,dataCuenta}){

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
  
if(auth && dataCuenta)
    return(<div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar sx={{ width: 30, height: 30 }} alt={`mail: ${auth.displayName}`} src={auth.photoURL} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
          <Link href={`/cuentas/editar/${dataCuenta.id}`}>
            <Stack sx={{ alignContent: 'center'}} direction="row" spacing={2}> <Icon  className="fas fa-user"/> <div>Perfil</div></Stack>
          </Link>
          </MenuItem>
          <MenuItem onClick={clickSalir}><Stack sx={{ alignContent: 'center'}} direction="row" spacing={2}><Icon  className="fas fa-sign-out-alt"/> <div>Salir</div></Stack></MenuItem>
        </Menu>
      </div>
        
    )
    return <div>Sin cuenta</div>
}