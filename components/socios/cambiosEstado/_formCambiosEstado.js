import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";
import SelectFormik from "@components/forms/select2Formik";
import SelectStaticFormik from "@components/forms/selectEstaticFormik";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";

export default function FormCambioEstadoSocio(props) {
  const { values, setFieldValue, mod } = props;
  console.log(props);
  useEffect(() => {
    cambiaEstado(values.estado);
  }, []);
  useEffect(() => {
    cambiaEstado(values.estado);
  }, [values.estado]);
  const [itemsMotivos, setItemsMotivos] = useState();
  const cambiaEstado = (valor) => {
    setItemsMotivos(
      mod?.config?.itemsMotivosEstados.filter((n) => n.estado === valor)
    );
  };

  return (
    <Grid sx={{ p: 2 }} spacing={2} container>
      <Grid item md={6}>
        <SelectStaticFormik
          label="estado"
          campo="estado"
          items={["ALTA", "BAJA", "SUSPENDIDO"]}
        />
      </Grid>
      <Grid item md={4}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>
      <Grid item md={12}>
        <SelectFormik
          lista={itemsMotivos}
          campoId="id"
          campoLabel={"detalle"}
          label="Motivo"
          campo={`motivo`}
        />
      </Grid>

      <Grid item md={12}>
        <Input label="Detalle " campo="detalle" />
      </Grid>
    </Grid>
  );
}
