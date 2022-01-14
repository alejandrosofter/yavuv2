import dynamic from 'next/dynamic'
import  { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Dialog from '@mui/material/Dialog';
import {Box,Icon,Stack} from '@mui/material/';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ImpresionMovimientoCuenta from "../socios/movimientosCuenta/impresion"
import Slide from '@mui/material/Slide';
import * as React from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ImpresionDialog({datos,ComponenteItem,abrir,titulo}){
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      if(datos) setOpen(true)
    },[abrir])
  
    // const ComponenteItem = dynamic(
    //   () => import(`./${pathForm}`),
    //   { loading: ({error,timedOut,isLoading}) => {
    //     if(isLoading)return "cargando..."
    //     if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
    //     if(timedOut)return <p>Tiempo de espera agotado</p> 
        
    //   }}
    // )
    const handleClose = () => {
      setOpen(false);
    };
  
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
    return(
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="secondary" sx={{ position: 'relative' }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {titulo} 
            </Typography>
            <Button autoFocus color="inherit" onClick={handlePrint}>
              <Icon sx={{mr:1}} className="fas fa-print"/> Imprimir
            </Button>
          </Toolbar>
        </AppBar>
       <Box sx={{m:5}}>
         <ComponenteItem datos={datos} ref={componentRef}/>
         </Box>
        
      </Dialog>
        
    )
}