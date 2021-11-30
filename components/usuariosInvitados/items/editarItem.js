import { useEffect, useState } from "react";
import Input from "../../forms/input";
import Button from '@mui/material/Button';
import CheckboxForm from "../../forms/checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material"
import randomId from "random-id"
import SwitchFormik from "../../forms/switch"

import { LoadingButton } from "@mui/lab";
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';
import { Icon } from "@material-ui/core";
import _FormItemsUsuarios from "./_form";

export default function EditarItemInvitados({clickAceptar,valoresIniciales,modelo,abierto,mods})
{
   

  
    return(
        
        
        
            <Grid sx={{my:3}} md={12} item xs={9}> 
            
      <Dialog open={abierto}>
        <DialogTitle>EDITAR MOD</DialogTitle>
        <DialogContent>
          <DialogContentText  sx={{pb:3}}>
              Puedes cambiar los datos del modulo a este usuario. Solo funcionara una vez que reinicie la sesion.
          </DialogContentText>
          <_FormItemsUsuarios  mods={mods} valoresIniciales={valoresIniciales} modelo={modelo} clickAceptar={clickAceptar} />
        </DialogContent>
        
      </Dialog>
 
            
            </Grid>
             
  
 
        
    )
}