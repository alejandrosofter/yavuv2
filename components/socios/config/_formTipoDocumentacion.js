import Grid from '@mui/material/Grid';
import Input from "../../forms/input";


import SwitchFormik from "../../forms/switch";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";

export default function FormTipoDocumentacionSocios({dataModulo,modelo,clickAceptar,valoresIniciales}){
  
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

            <Grid item md={6}><Input campo='nombreTipoDocumentacion' label="Tipo Documentacion" /></Grid>
            
          </Grid>
          <DialogActions>  <Button type="submit"><Icon className="fas fa-check"/> ACEPTAR</Button> </DialogActions>
            </Form>
            </Formik>
       
    )
}