import TitulosFormularios from "./forms/tituloFormularios";
import _FormGenerico from "./_formGenerico";
import { useCollection } from '@nandorojo/swr-firestore'
import { Grid } from "@mui/material";
export default function NuevoGenerico({mod,modelo,valoresIniciales,children}){
  const { add, error } = useCollection(mod.coleccion)
    return(
      <Grid container>
        <TitulosFormularios titulo={"NUEVO"} subTitulo={mod.label} icono={mod.icono}/>
        <_FormGenerico fnUpdate={add} modelo={modelo} mod={mod} valoresIniciales={valoresIniciales} >
              {children}
        </_FormGenerico>
      </Grid>
    )
}