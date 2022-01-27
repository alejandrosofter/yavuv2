import { Grid, Stack} from "@mui/material";
import Input from "../forms/input"
import Titulo from "../forms/tituloFormularios"
export default function FormProfesores({titulo,subTitulo,icono}){

    return(
        <Grid >
            <Stack>
                <Titulo titulo={titulo} subTitulo={subTitulo} icono={icono}/>
                <Grid container sx={{pt:1,pb:1}} md={12} rowSpacing={2} spacing={2}>
                    <Grid item md={3}><Input label="Apellido"  campo="apellido"/></Grid>
                    <Grid item md={3}><Input label="Nombre " campo="nombre"/></Grid>
                    <Grid item md={1}><Input label="DNI " campo="dni"/></Grid>
                    <Grid item md={1}><Input label="Telefono " campo="telefono"/></Grid>
                    <Grid item md={3}><Input label="Domicilio " campo="domicilio"/></Grid>
                </Grid>
            </Stack>           
                </Grid>
    )
}