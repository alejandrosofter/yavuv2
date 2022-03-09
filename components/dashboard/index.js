import { Grid } from "@mui/material";
import TitulosFormularios from "../forms/tituloFormularios";

export default function Modulo({mod}){

    return(
        <Grid container >
            <TitulosFormularios titulo={mod.label} subTitulo="usuario" icono={mod.icono}/>
        </Grid>
    )
}