import Grid from '@mui/material/Grid';
import Input from "../../forms/input";


import SwitchFormik from "../../forms/switch";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";

export default function FormTipoDocumentacionSocios({}){
  
    return(
       
         <Grid container spacing={2}>

            <Grid item md={6}><Input campo='nombreTipoDocumentacion' label="Tipo Documentacion" /></Grid>
            
          </Grid>
          
       
    )
}