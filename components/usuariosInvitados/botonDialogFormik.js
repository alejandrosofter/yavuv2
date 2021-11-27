import { useState } from "react";
import Input from "../forms/input"
import Button from '@mui/material/Button';
import CheckboxForm from "../forms/checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material"
import randomId from "random-id"
import SwitchFormik from "../forms/switch"
import { Formik,Form } from "formik";
import { LoadingButton } from "@mui/lab";
export default function BotonDialogForm({clickAceptar,valoresIniciales,modelo})
{
    const [load,setLoad]=useState();

  const clickForm=async (values)=>{
    setLoad(true)
    // router.back({ shallow: true })
  }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
     
     
    return(
        <Formik
       initialValues={valoresIniciales}
       validationSchema={modelo().fields.mods.innerType}
       onSubmit={clickForm}
       validateOnChange={true}
        validateOnBlur={true}
       validateOnMount={true}
     >
        
         {({handleSubmit,values,errors,setFieldValue,validateForm})=>{
            const handleAceptar= () => {
                console.log(errors,Object.keys(errors).length)
                if( Object.keys(errors).length === 0){
                    // values.id=randomId(20)
                    clickAceptar(values)
                    setOpen(false);
                }
               
              };
           return ( 
            <Grid sx={{my:3}} md={12} item xs={9}> 
            <Form onSubmit={handleSubmit} >
            <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        NUEVO
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NUEVO MOD</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Seleccione el Módulo que desea compartir con este usuario y qué información desea ofrecerle.
          </DialogContentText>
          <Grid item md={12}><Input label="Modulo "  campo="idMod"/></Grid>
          <Grid item md={2}><Input label="Id "  campo="id"/></Grid>
          <Grid item md={3}><SwitchFormik label="Habilitado " campo="habilitado"/></Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAceptar}>ACEPTAR</Button>
        </DialogActions>
      </Dialog>
    </div>
                  
                    
               
                
            </Form>
            </Grid>
             )
         } }
    </Formik>
        
    )
}