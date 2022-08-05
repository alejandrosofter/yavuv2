import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material";

import Input from "../forms/input";
import { useEffect, useState } from "react";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { getItemArray, getIndexItemArray } from "../../helpers/arrays";
import { useRouter } from "next/router";
const getItemsConceptos = (id, arr) => {
  const item = getItemArray({ data: arr, valor: id, campoId: "id" });

  if (item && item.config && item.config.itemsTipos)
    return item.config.itemsTipos;
  return [];
};
export default function FormGeneracionDeudas({
  setFieldValue,
  values,
  titulo,
  subTitulo,
  icono,
}) {
  const router = useRouter();
  const { data: modsDeuda } = useCollection(`mods`, {
    where: [
      ["generaDeuda", "==", true],
      ["idUsuario", "==", fuego.auth().currentUser.uid],
    ],
  });
  const [itemsConceptos, setItemsConceptos] = useState([]);
  const [conceptoSeleccion, setConceptoSeleccion] = useState([]);
  useEffect(() => {
    setItemsConceptos(getItemsConceptos(values.modDeuda, modsDeuda));
    setFieldValue("modOrigen", router.query.id);
    // cambiaConcepto(values.concepto)
  }, [modsDeuda, values.modDeuda]);
  if (!modsDeuda) return "carga mods";

  const cambiaMod = (id) => {
    setItemsConceptos(getItemsConceptos(id, modsDeuda));
  };
  const getDataObj = (obj, campo) => {
    if (obj) return campo in obj ? obj[campo] : "";
    return "";
  };
  const cambiaConcepto = (id) => {
    const itemMod = getItemArray({
      data: modsDeuda,
      valor: values.modDeuda,
      campoId: "id",
    });
    const itemConcepto = getItemArray({
      data: itemMod.config.itemsTipos,
      valor: id,
      campoId: "id",
    });

    if (itemConcepto) {
      setConceptoSeleccion(itemConcepto);

      setFieldValue(
        "conjunto",
        getDataObj(itemConcepto, "aplicaDeudaConjunto")
      );
      setFieldValue(
        "calculoImporte",
        getDataObj(itemConcepto, "calculoImporte")
      );
      setFieldValue(
        "fnDetalleConcepto",
        getDataObj(itemConcepto, "fnDetalleConcepto")
      );
      setFieldValue(
        "fnDetalleExtra",
        getDataObj(itemConcepto, "fnDetalleExtra")
      );
      setFieldValue(
        "fnLabelElemento",
        getDataObj(itemConcepto, "fnLabelElemento")
      );
    }
  };
  return (
    <Grid sx={{ pt: 1, mb: 2 }} container rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "PROCESADA", "PROCESANDO", "ENVIADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha Vto Debito" campo="fechaVto" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha Vto Otros" campo="fechaVtoOtros" />
      </Grid>
      <Grid item md={3}>
        <SelectFormik
          label="Modulo Genera Deuda"
          lista={modsDeuda}
          campoId="id"
          campoLabel="nombre"
          campo="modDeuda"
        />
      </Grid>

      <Grid item md={6}>
        <Input label="Detalle Agregado (opcional)" campo="detalle" />
      </Grid>
    </Grid>
  );
}
