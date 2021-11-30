
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material"
import React from 'react';

export default function ItemsModulo_editar({fullWidth,maxWidth,textoEditar,nombreModulo,clickAceptar,valoresIniciales,modelo,abierto,dataModulo,form})
{
    return(
        
        <Grid sx={{my:3}} md={12} item xs={9}> 
             <Dialog fullWidth={fullWidth}
        maxWidth={maxWidth} open={abierto}>
                <DialogTitle>{`EDITAR ${nombreModulo}`}</DialogTitle>
                <DialogContent>
                <DialogContentText  sx={{pb:3}}>
                {` ${textoEditar}`}
                </DialogContentText>
               
                {React.cloneElement(
      form,
      {clickAceptar:clickAceptar,nombreModulo:nombreModulo,valoresIniciales:valoresIniciales,modelo:modelo,mods:dataModulo}
    )}
                </DialogContent>
        
             </Dialog>
        </Grid>
             
  
 
        
    )
}