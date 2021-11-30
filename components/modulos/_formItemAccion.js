import { Grid } from "@material-ui/core";
import Input from "../forms/input";
import Select from "../forms/select"
import ColorPickerFormik from "../forms/colorPickerForm"
import SwitchFormik from "../forms/switch";
import Button from '@mui/material/Button';
import CheckboxForm from "../forms/checkbox";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";

export default function _FormItemAccion({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
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
         <Grid container spacing={2}>

            <Grid item md={6}><Input campo='nombre' label="Nombre" /></Grid>
            <Grid item md={6}><Input campo='label' label="Label" /></Grid>
            <Grid item md={3}><Input campo='icono' label="Icono" /></Grid>
            <Grid item md={6}><Input campo='descripcion' label="Descripcion" /></Grid>
            <Grid item md={6}><Input campo='url' label="Url" /></Grid>
            <Grid item md={6}><ColorPickerFormik campo='color' label="Color" /></Grid>
            <Grid item md={3}><SwitchFormik label="Es Registro? " campo="esRegistro"/></Grid>
            <Grid item md={3}><SwitchFormik label="Es Funcion? " campo="esFuncion"/></Grid>
            
          </Grid>
          <DialogActions>  <Button type="submit"><Icon className="fas fa-check"/> ACEPTAR</Button> </DialogActions>
            </Form>
            </Formik>
       
    )
}