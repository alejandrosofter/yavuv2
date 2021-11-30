
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, Grid } from "@mui/material"
import React from 'react';
import Button from '@mui/material/Button';
export default function ItemsModulo_eliminar({nombreModulo,textoQuitar,open,clickEliminar,handleClose}){
 
    return(
        <Dialog open={open}>
                <DialogTitle>{`QUITAR ${nombreModulo}`}</DialogTitle>
                <DialogContent>
                <DialogContentText  sx={{pb:3}}>
                {` ${textoQuitar?textoQuitar:'Estas seguro de quitar el registro?'}`}
                </DialogContentText>
               
               
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>CANCELAR</Button>
                <Button onClick={clickEliminar} autoFocus>
                    ACEPTAR
                </Button>
                </DialogActions>
             </Dialog>
    )
}