import { useState } from "react";
import Input from "../../forms/input"
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
import { Formik,Form } from "formik";
import { LoadingButton } from "@mui/lab";
import Fab from '@mui/material/Fab';
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { Icon } from "@material-ui/core";
import _FormItemsUsuarios from "./_form";

export default function BotonDialogForm({clickAceptar,valoresIniciales,modelo, mods,form})
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NUEVO MOD</DialogTitle>
        <DialogContent>
        <DialogContentText  sx={{pb:3}}>
          Seleccione el Módulo que desea compartir con este usuario y qué información desea ofrecerle.
          </DialogContentText>
          {React.cloneElement(
      form,
      {clickAceptar:handleAceptar,valoresIniciales:valoresIniciales,modelo:modelo,mods:mods}
    )}
        </DialogContent>
       
      </Dialog>
    </div>
        
    )
}