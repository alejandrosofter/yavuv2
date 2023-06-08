import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectPrestaciones from "@components/prestaciones/selectPrestacion";
import { getFechaString } from "@helpers/dates";
import { useDocument } from "@nandorojo/swr-firestore";

export default function FormPrestaciones({
  mod,
  setFieldValue,
  values,
  obraSocial,
}) {
  console.log(`obraSocial`, obraSocial);
  const { data: refObraSocial } = useDocument(
    `obrasSociales/${obraSocial?.obraSocial}`,
    {
      listen: true,
    }
  );
  const cambiaPrestacion = (valor, item) => {
    if (item) {
      setFieldValue("codigo", `${item.codigoInterno}`);
      setFieldValue(
        "nombre",
        `${item.nombreCorto ? item.nombreCorto : item.nombre}`
      );
      setFieldValue("cantidad", `${item.cantidad ? item.cantidad : 1}`);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <Input label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={8}>
        {refObraSocial && refObraSocial.exists && (
          <Typography variant="caption" sx={{ mt: 1, mb: 1 }}>
            ULTIMA ACTUALIZACION:{" "}
            {getFechaString(refObraSocial.lastUpdateNomencladores)}
          </Typography>
        )}
        <SelectPrestaciones
          callbackchange={cambiaPrestacion}
          obraSocial={obraSocial?.obraSocial}
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
