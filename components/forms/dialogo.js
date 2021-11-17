import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Dialogo({icon,open,setOpen,titulo,detalle,callbackAcepta}){

    const handleClose = () => {
        setOpen(false);
      };
    const handleCloseAccept = () => {
        setOpen(false);
        if(callbackAcepta)callbackAcepta()
      };
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <Stack direction="row" spacing={2}>
         {icon && 
         <Typography className={icon} variant="h5" color="initial"></Typography>
        
        }
         <Typography variant="h5"  color="initial">{titulo}</Typography>
         </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {detalle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCloseAccept} autoFocus>
          <b>ACEPTAR </b>
          </Button>
        </DialogActions>
      </Dialog>
    )
}