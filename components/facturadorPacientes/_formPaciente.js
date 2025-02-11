import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectPrestaciones from "@components/prestaciones/selectPrestacion";
import { getFechaString } from "@helpers/dates";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";

import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import { useEffect, useState } from "react";
import Switch from "@components/forms/switch";

export default function FormPrestaciones({
  mod,
  setFieldValue,
  values,
  paciente,
}) {
  const [obraSocialSeleccion, setObraSocialSeleccion] = useState({});
  const [alertas, setAlertas] = useState("");
  const { data: refObraSocialPaciente } = useDocument(
    `pacientes/${paciente?.id}/obrasSociales/${paciente?.obraSocial}`,
    {
      listen: true,
    }
  );
  const { data: codigosFacturados } = useCollection(`recetasFacturacion`, {
    where: [
      ["idPaciente", "==", paciente.id],
      ["obraSocial", "==", obraSocialSeleccion.id],
      ["codigo", "==", values.codigo],
      ["estado", "==", "FACTURADO"],
    ],
    listen: true,
  });
  useEffect(() => {
    if (codigosFacturados?.length > 0) {
      console.log(`codigosFacturados`, codigosFacturados);
      let alerta = "";
      codigosFacturados.map((item) => {
        alerta += `${getFechaString(item.fecha)}, `;
      });
      setAlertas(alerta);
    } else setAlertas("");
  }, [codigosFacturados]);

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
      setFieldValue("importe", `${item.importe ? item.importe : 0}`);
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
      <Grid item md={2}>
        <Switch label="Es Facturable?" campo="facturable" />
      </Grid>
      <Grid item md={8}>
        {values.obraSocial && (
          <>
            <Typography variant="caption" sx={{ mt: 1, mb: 1 }}>
              ULTIMA ACTUALIZACION NOMENCLADOR:{" "}
              {getFechaString(obraSocialSeleccion.lastUpdateNomencladores)}
            </Typography>
          </>
        )}
        <SelectPrestaciones
          callbackchange={cambiaPrestacion}
          obraSocial={values.obraSocial}
        />
        {alertas != "" && (
          <>
            <Typography variant="caption" sx={{ mt: 1, mb: 1, color: "red" }}>
              ULTIMAS FACTURACIONES: {alertas}
            </Typography>
          </>
        )}
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
