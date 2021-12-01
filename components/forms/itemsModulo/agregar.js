import { useState } from "react";
import React from "react";
import Input from "../../forms/input"
import Button from '@mui/material/Button';
import CheckboxForm from "../../forms/checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import randomId from "random-id"
import Icon from '@mui/material/Icon';


export default function ItemsModulo_agregar({fullWidth,maxWidth,textoAgregar,clickAceptar,nombreModulo,valoresIniciales,modelo,form,dataModulo})
{
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      const handleAceptar= (values) => {
               
            values.id=randomId(20)
            clickAceptar(values)
            setOpen(false);
        
       
      };
     
    return(
            <div>
     
     
<Button variant="text" onClick={handleClickOpen}><Icon className="fas fa-plus"/> Agregar</Button>
      <Dialog fullWidth={fullWidth}
        maxWidth={maxWidth}  open={open} onClose={handleClose}>
        <DialogTitle>{`NUEVO ${nombreModulo}`}</DialogTitle>
        <DialogContent>
        <DialogContentText  sx={{pb:3}}>
        {`${textoAgregar}`}
          </DialogContentText>
          
          {React.cloneElement(
      form,
      {clickAceptar:handleAceptar,nombreModulo:nombreModulo,valoresIniciales:valoresIniciales,modelo:modelo,mods:dataModulo,titulo:"AGREGAR NUEVO MOD"}
    )}
           
            
        </DialogContent>
       
      </Dialog>
    </div>
        
    )
}