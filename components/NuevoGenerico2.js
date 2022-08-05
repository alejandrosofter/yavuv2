import TitulosFormularios from "./forms/tituloFormularios";
import _FormGenerico from "./_formGenerico";
import { useCollection, fuego, useDocument } from "@nandorojo/swr-firestore";
import { Grid } from "@mui/material";
export default function NuevoGenerico2({
  preData,
  removeTitle,
  callbackSuccess,
  titulo,
  subTitulo,
  coleccion,
  modelo,
  valoresIniciales,
  label,
  dataForm,
  children,
  icono,
}) {
  const { add, error } = useCollection(coleccion);
  const { update } = useDocument(coleccion);
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
        dataForm={dataForm}
        preData={preData}
        callbackSuccess={callbackSuccess}
        fnUpdate={add}
        modelo={modelo}
        valoresIniciales={valoresIniciales}
      >
        {children}
      </_FormGenerico>
    </Grid>
  );
}
