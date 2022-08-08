import TitulosFormularios from "./forms/tituloFormularios";
import _FormGenerico from "./_formGenerico";
import { useCollection, fuego, useDocument } from "@nandorojo/swr-firestore";
import { Grid } from "@mui/material";
export default function EditarGenerico2({
  preData,
  removeTitle,
  callbackSuccess,
  titulo,
  subTitulo,
  coleccion,
  modelo,
  label,
  children,
  dataForm,
  icono,
}) {
  const { data, update, error } = useDocument(coleccion);
  if (error) return error;
  if (!data) return "Cargando..";

  return (
    <Grid container>
      {!removeTitle && (
        <TitulosFormularios
          titulo={titulo ? titulo : "EDITAR"}
          subTitulo={subTitulo ? subTitulo : label}
          icono={icono}
        />
      )}
      <_FormGenerico
        preData={preData}
        callbackSuccess={callbackSuccess}
        fnUpdate={update}
        modelo={modelo}
        datos={data}
        dataForm={dataForm}
      >
        {children}
      </_FormGenerico>
    </Grid>
  );
}
