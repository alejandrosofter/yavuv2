import TitulosFormularios from "./forms/tituloFormularios";
import _FormGenerico from "./_formGenerico";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { Grid } from "@mui/material";
export default function NuevoGenerico({
  preData,
  removeTitle,
  mod,
  callbackSuccess,
  titulo,
  subTitulo,
  modelo,
  valoresIniciales,
  children,
}) {
  const { add, error } = useCollection(mod.coleccion);
  if (error) return error;
  return (
    <Grid container>
      {!removeTitle && (
        <TitulosFormularios
          titulo={titulo ? titulo : "NUEVO/A"}
          subTitulo={subTitulo ? subTitulo : mod.label}
          icono={mod.icono}
        />
      )}
      <_FormGenerico
        preData={preData}
        callbackSuccess={callbackSuccess}
        fnUpdate={add}
        modelo={modelo}
        isNew={true}
        mod={mod}
        valoresIniciales={valoresIniciales}
      >
        {children}
      </_FormGenerico>
    </Grid>
  );
}
