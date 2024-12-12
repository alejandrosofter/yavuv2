import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectPrestaciones from "@components/prestaciones/selectPrestacion";
import { getFechaString } from "@helpers/dates";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import SelectOsPaciente from "./selectOs";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import { useEffect, useState } from "react";
import Switch from "@components/forms/switch";
import RadioButtons from "@components/forms/radioButtons";

export default function FormPrestaciones({
  mod,
  setFieldValue,
  values,
  paciente,
}) {
  const [obraSocialSeleccion, setObraSocialSeleccion] = useState({});
  const [alertas, setAlertas] = useState("");
  const { data: refObraSocialPaciente, update } = useDocument(
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
      const cantidad = item.cantidad ? item.cantidad.replace(/\D/g, "") : 1;
      const importeUnitario = item.importe ? item.importe : 0;
      setFieldValue("codigo", `${item.codigoInterno}`);
      setFieldValue(
        "nombre",
        `${item.nombreCorto ? item.nombreCorto : item.nombre}`
      );
      setFieldValue("cantidad", `${cantidad}`);
      setFieldValue("importe", `${(importeUnitario * cantidad).toFixed(2)}`);
      setFieldValue("importeUnitario", `${importeUnitario}`);
    }
  };
  const cambiaOs = (valor, item) => {
    if (item) {
      setObraSocialSeleccion(item);
      update({
        obraSocial: item.id,
      });
    }
  };
  const cambiaCantidad = (e) => {
    const cant = Number(e.target.value);

    setFieldValue("importe", cant * values.importeUnitario);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <SelectObraSocial callbackchange={cambiaOs} />
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
      <Grid item md={2}>
        <Input onChange={cambiaCantidad} label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe" campo="importe" />
      </Grid>
      <Grid item md={3}>
        <RadioButtons
          options={[
            { id: "facturar", label: "Facturar" },
            { id: "autorizar", label: "Autorizar" },
          ]}
          row={true}
          // defaultValue={"facturar"}
          label="Enviar a ..."
          campo="sendTo"
        />
      </Grid>

      <Grid item md={5}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
      <Grid item md={3}>
        <Switch label="Volver a crear" campo="volver" />
      </Grid>
    </Grid>
  );
}
