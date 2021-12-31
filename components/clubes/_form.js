import {  Grid } from "@mui/material"
import Input from "../forms/input"
import FileUploadFormik from "../forms/fileUpload";
import FileUpload2Formik from "../forms/fileUpload2";
import FileUpload3Formik from "../forms/fileUpload3Formik";

export default function FormClub({auth})
{
    return(
        <Grid sx={{mb:3}} md={12} container rowSpacing={2} spacing={2}>
                
                    <Grid item md={8}><Input label="Nombre "  campo="nombre"/></Grid>
                    <Grid item md={8}><Input label="Razon Social " campo="razonSocial"/></Grid>
                    <Grid item md={5}><Input label="Domicilio" campo="domicilio"/></Grid>
                    <Grid item md={5}><Input label="Cuit" campo="cuit"/></Grid>
                    <Grid item md={4}><Input label="Telefono Mobil " campo="telefonoMobil"/></Grid>
                    <Grid item md={4}><FileUpload3Formik auth={auth} label="Logo" campo="logo"/></Grid>
                </Grid>
    )
} 