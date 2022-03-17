import TitulosFormularios from "./forms/tituloFormularios";
import _FormGenerico from "./_formGenerico";
import { useCollection,fuego } from '@nandorojo/swr-firestore'
import { Grid } from "@mui/material";
export default function NuevoGenerico({removeTitle,mod,callbackSuccess,modelo,valoresIniciales,children}){
  const { add, error } = useCollection(mod.coleccion)
    return(
      <Grid container>
        {!removeTitle && <TitulosFormularios titulo={"NUEVO/A"} subTitulo={mod.label} icono={mod.icono}/> }
        <_FormGenerico callbackSuccess={callbackSuccess} fnUpdate={add} modelo={modelo} 
        mod={mod} valoresIniciales={valoresIniciales} >
              {children}
        </_FormGenerico>
      </Grid>
    )
}