import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";
import Form from "@pages/socios/mensualizado/_form";
import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectMotivo from "./selectMotivos";
import ItemsModulo from "@components/forms/itemsModulo";
import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { cols } from "@pages/socios/mensualizado/index";
import { fuego } from "@nandorojo/swr-firestore";
export default function FormCambioEstadoSocio({
  values,
  setFieldValue,
  mod,
  idSocio,
  socio,
  isNew,
}) {
  const field = `mensualizaciones`;
  const [hideAgregar, setHideAgregar] = useState(false);

  const [initDone, setInitDone] = useState(isNew);
  const agregarMensualizacionesActivas = () => {
    fuego.db
      .collection(`socios/${idSocio}/mensualizado`)
      .where("estado", "in", ["ALTA", "SUSPENDIDO"])
      .get()
      .then((querySnapshot) => {
        let items = [];

        querySnapshot.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id });
        });
        setFieldValue(field, items);
      });
  };
  const cambiaEstado = (valor) => {
    if (initDone && valor)
      if (valor.value === "ALTA") {
        setHideAgregar(true);
        setFieldValue(field, []);
      } else {
        setHideAgregar(false);
        setFieldValue(field, []);
        agregarMensualizacionesActivas();
      }
    setInitDone(true);
  };

  return (
    <Grid sx={{ p: 2 }} spacing={2} container>
      <Grid item md={12}>
        <Typography variant="caption"></Typography>
      </Grid>
      <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>

      <Grid item md={4}>
        <SelectEstaticFormik
          callbackchange={cambiaEstado}
          items={["ALTA", "BAJA (ultimo mes)", "BAJA DEFINITIVA", "SUSPENDIDO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      {/* {values.estado === "BAJA" && (
        <Grid item md={4}>
          <Switch label="Cobrar Mes actual" campo="cobrarMesActual" />
        </Grid>
      )} */}
      <Grid item md={5}>
        <SelectMotivo estado={values.estado} />
      </Grid>

      <Grid item md={12}>
        <ItemsModulo
          height={180}
          hideAgregar={!hideAgregar}
          setFieldValue={setFieldValue}
          labelBtnAgregar="AGREGAR MENSUALIZACION"
          campo={field}
          data={values[field]}
          modelo={ModeloMensualizado}
          nombreModulo={`Mensualizaciones`}
          fullWidth={true}
          dataModulo={{ socio }}
          maxWidth={"md"}
          textoEditar={`Puedes cambiar las acciones del registro:`}
          textoAgregar={`Ingrese los datos del registro`}
          valoresIniciales={valoresMensualizado}
          form={<Form mod={mod} values={values} />}
          columnas={cols}
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle (opcional)" campo="detalle" />
      </Grid>
    </Grid>
  );
}
