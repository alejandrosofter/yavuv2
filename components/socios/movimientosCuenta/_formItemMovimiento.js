import Grid from '@mui/material/Grid';
import Input from "../../forms/input";


import  SelectFormik  from "../../forms/select";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { Formik,Form } from "formik";
import { Icon } from "@mui/material";

export default function FormItemMovimientoCuenta({mod}){
  
    return(
      <Grid>
         <Grid container spacing={2}>
              <Grid item md={5}><SelectFormik campo='tipo' label="Tipo Item" lista={mod.config.itemsTipos} campoLabel="detalle" campoId="id" /></Grid>
              <Grid item md={6}><Input campo='importe' label="Importe" /></Grid>
              <Grid item md={12}><Input campo='detalle' label="Detalle" /></Grid>
          </Grid>
          <DialogActions>  <Button type="submit"><Icon className="fas fa-check"/> ACEPTAR</Button> </DialogActions>
          
      </Grid>
    )
}