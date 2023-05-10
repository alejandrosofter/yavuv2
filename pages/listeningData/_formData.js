import { findPath, getPath } from "@helpers/objects";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
export default function FormData({
  campo,

  values,
  seleccion,
  path,
  callbackacepta,
}) {
  const field = path;
  // const field = !seleccion ? `${campo}.root` : `${seleccion.path}`;

  // const field =
  //   findPath(values, seleccion ? seleccion.path : "root") === campo
  //     ? `${campo}.root.children`
  //     : `${campo}.${findPath(
  //         values,
  //         seleccion ? seleccion.path : "root"
  //       )}.children`;

  return (
    <Grid spacing={2} container>
      <Grid item md={4}>
        <Input label="Nombre" campo={`${field}.nombre`} />
      </Grid>

      <Grid item md={4}>
        <Input label="Path" campo={`${field}.path`} />
      </Grid>
      <Grid item md={4}>
        <Input label="Campo Valor" campo={`${field}.campoValue`} />
      </Grid>
      <Grid item md={4}>
        <Input label="Campo Label" campo={`${field}.campoLabel`} />
      </Grid>
      <Grid item md={8}>
        <Input label="Agrupa por..." campo={`${field}.agrupa`} />
        <Typography variant="caption"></Typography>
      </Grid>
      <Grid item md={12}>
        <Input
          label="On Create (operacion asignacion)"
          campo={`${field}.onCreate`}
        />
      </Grid>
      <Grid item md={12}>
        <Input
          label="On Delete (operacion asignacion)"
          campo={`${field}.onDelete`}
        />
      </Grid>
      <Grid item md={12}>
        <Input
          label="On Update (operacion asignacion)"
          campo={`${field}.onUpdate`}
        />
      </Grid>
      <Grid item md={12}>
        <Button variant="contained" onClick={callbackacepta} color="primary">
          ACEPTAR
        </Button>
      </Grid>
    </Grid>
  );
}
