import TitulosFormularios from "@components/forms/tituloFormularios";
import _FormGenerico from "@components/_formGenerico";
import { useCollection, fuego, useDocument } from "@nandorojo/swr-firestore";
import { Grid, Typography } from "@mui/material";
export default function EditarGenerico2({
  preData,
  removeTitle,
  callbackSuccess,
  titulo,
  subTitulo,
  coleccion,
  modelo,
  label,
  id,
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
        <Grid item container xs={12}>
          <Grid item xs={10}>
            <TitulosFormularios
              titulo={titulo ? titulo : `EDITAR`}
              subTitulo={subTitulo ? subTitulo : label}
              icono={icono}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption">{`ref: ${id}`}</Typography>
          </Grid>
        </Grid>
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
