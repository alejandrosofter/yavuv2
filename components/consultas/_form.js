import { Button } from "@mui/material";
import Input from "../forms/input";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import TextArea from "../forms/textarea";

export default function FormConsultas({formik,load}){
    return(
      <form onSubmit={formik.handleSubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        
      <Grid item xs={3}><Input formik={formik} label="Nombre de Consulta" campo="nombreConsulta"/></Grid>
      <Grid item xs={2}><Input formik={formik} label="Coleccion" campo="coleccion"/></Grid>
      <Grid item xs={4}><Input formik={formik} label="Descripcion" campo="descripcion"/></Grid>
      <Grid item xs={5}><TextArea formik={formik} label="Funcion" filas={5} campo="funcion"/></Grid>

      
      </Grid>
      <Grid sx={{my:3}} item xs={10}> 
      <LoadingButton loading={load} color="primary" variant="contained" fullWidth type="submit">
          ACEPTAR
        </LoadingButton></Grid>
      </form>
    )
}