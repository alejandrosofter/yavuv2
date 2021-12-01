import Grid from '@mui/material/Grid';
import Input from "../forms/input"
import Select from "../forms/select"
import SwitchFormik from "../forms/switch";
import Button from '@mui/material/Button';
import CheckboxForm from "../forms/checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";


export default function _FormItemsUsuarios({textoEditar,textoAgregar,tituloModulo,mods,modelo,clickAceptar,valoresIniciales,titulo}){
  
    return(
        <Formik enableReinitialize={true}
       initialValues={valoresIniciales}
       validationSchema={modelo}
       onSubmit={async (values) => {
        clickAceptar(values)
      }}
       validateOnChange={true}
        validateOnBlur={true}
       validateOnMount={true}
     >
         <Form>
            <Grid item md={12}><Select label="Modulo " lista={mods} campoLabel="label" campoId="idMod" campo="idMod"/></Grid>
            <Grid item md={3}><SwitchFormik label="Habilitado " campo="habilitado"/></Grid>
            <DialogActions>  <Button type="submit">ACEPTAR</Button> </DialogActions>
            
            </Form>
            </Formik>
       
    )
}