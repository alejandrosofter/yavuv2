import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectPrestaciones from "@components/prestaciones/selectPrestacion";
import { getFechaString } from "@helpers/dates";
import { useDocument } from "@nandorojo/swr-firestore";
import SelectOsPaciente from "./selectOs";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import { useEffect, useState } from "react";
import { set } from "date-fns";

export default function FormPrestaciones({
  mod,
  setFieldValue,
  values,
  paciente,
}) {
  const [obraSocialSeleccion, setObraSocialSeleccion] = useState({});
  const { data: refObraSocialPaciente } = useDocument(
    `pacientes/${paciente?.id}/obrasSociales/${paciente?.obraSocial}`,
    {
      listen: true,
    }
  );

  useEffect(() => {
    if (refObraSocialPaciente?.exists) {
      console.log(`refObraSocialPaciente`, refObraSocialPaciente);
      setFieldValue("obraSocial", refObraSocialPaciente.obraSocial);
    }
  }, [refObraSocialPaciente]);
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
  const cambiaOs = (valor, item) => {
    if (item) setObraSocialSeleccion(item);
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <SelectObraSocial callbackchange={cambiaOs} />
      </Grid>
      <Grid item md={2}>
        <Input label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={8}>
        {values.obraSocial && (
          <Typography variant="caption" sx={{ mt: 1, mb: 1 }}>
            ULTIMA ACTUALIZACION:{" "}
            {getFechaString(obraSocialSeleccion.lastUpdateNomencladores)}
          </Typography>
        )}
        <SelectPrestaciones
          callbackchange={cambiaPrestacion}
          obraSocial={values.obraSocial}
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
