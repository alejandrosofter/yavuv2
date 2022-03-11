import { Avatar, IconButton, Icon, Stack } from '@mui/material';
import BtnAcciones from './btnAcciones';
export default function MenuCuenta({auth,acciones}){
    if(!auth)return ""
    const clickSalir=()=>{
        auth.signOut()
    }
    return(
        <Stack direction="row">
        
          <Avatar sx={{ width: 30, height: 30,mt:1 }} alt={`mail: ${auth.displayName}`} src={auth.photoURL} />
          <IconButton color="secondary" onClick={clickSalir}><Icon color="secondary"  className="fas fa-sign-out-alt"/> Salir</IconButton>
      </Stack>
    )
}