import TitulosFormularios from "@components/forms/tituloFormularios";
import _FormGenerico from "./_formGenerico";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { Grid } from "@mui/material";
export default function NuevoGenerico({
  preData,
  removeTitle,
  coleccion,
  callbackSuccess,
  titulo,
  subTitulo,
  label,
  icono,
  modelo,
  valoresIniciales,
  children,
}) {
  const { add, error } = useCollection(coleccion);
  if (error) return error;
  return (
    <Grid container>
      {!removeTitle && (
        <TitulosFormularios
          titulo={titulo ? titulo : "NUEVO/A"}
          subTitulo={subTitulo ? subTitulo : label}
          icono={icono}
        />
      )}
      <_FormGenerico
        preData={preData}
        callbackSuccess={callbackSuccess}
        fnUpdate={add}
        modelo={modelo}
        isNew={true}
        valoresIniciales={valoresIniciales}
      >
        {children}
      </_FormGenerico>
    </Grid>
  );
}
