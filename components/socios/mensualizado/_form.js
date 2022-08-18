import { Grid, IconButton, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectProducto from "@components/productos/selectProducto";
import SelectPromocion from "@components/promociones/selectPromocion";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";
import { useEffect, useState } from "react";
import EditarDialogCbu from "@components/cuentasCbu/editarDialog";
import SelectTipoPeriodo from "./selectorTipoPeriodos";
import SelectActividadGrupo from "@components/actividades/selectActividadGrupo";
import SelectActividades from "@components/actividades/selectActividad";
import SelectGrupos from "@components/actividades/grupos/select";
import NuevoDialogCbu from "@components/cuentasCbu/nuevoDialog";

export default function FormMensualizado({ values, setFieldValue }) {
  const [openEditarCbu, setOpenEditarCbu] = useState(false);
  const [openNuevoCbu, setOpenNuevoCbu] = useState(false);
  const [actividadSeleccion, setActividadSeleccion] = useState();
  useEffect(() => {}, [values.esPorDebitoAutomatico]);
  const clickEditarCbu = () => {
    setOpenEditarCbu(true);
  };
  const clickNuevoCbu = () => {
    setOpenNuevoCbu(true);
  };
  const cbSuccessCbus = (item) => {
    setOpenEditarCbu(false);
    setOpenNuevoCbu(false);
    setItemsCuenta(item);
  };
  const setItemsCuenta = (item) => {
    setFieldValue(`banco`, item.banco);
    setFieldValue(`cbu`, item.cbu);
    setFieldValue(`titular`, item.titular);
    setFieldValue(`nroCuenta`, item.nroCuenta);
    setFieldValue(`tipoCuenta`, item.tipoCuenta);
    setFieldValue(`label_tipoCuenta`, item.label_tipoCuenta);
  };
  const cambiaCuenta = (item) => {
    if (item) setItemsCuenta(item);
  };
  const cambiaTipoPeriodo = (value, item) => {
    if (item) {
      setFieldValue(
        `esConAsistencia`,
        item.esConAsistencia ? item.esConAsistencia : false
      );
      setFieldValue(
        `cantidadAsistenciasMinimas`,
        item.cantidadMinimaAsistencias
      );
    }
  };

  const cambiaActividad = (valor, item) => {
    if (item) setActividadSeleccion(item);
  };
  const cambiaPromo = (valor, registro) => {
    let importe = 0;
    if (registro)
      registro.items.map((item) => {
        console.log(item, values.idProducto);
        if (item.idProducto === values.idProducto.value) {
          importe = importe + Number(item.importe);
          importe =
            importe +
            Number(values.idProducto_importe) * Number(item.porcentaje / 100);
        }
      });
    setFieldValue("importePromocion", importe.toFixed(2));
  };

  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item md={12}>
        <Typography variant="caption">
          ** IMPORTANTE: a partir del campo FECHA INICIO se comenzara a generar
          la deuda
        </Typography>
      </Grid>
      <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>

      <Grid item md={3}>
        <SelectFecha label="Fecha Inicio" campo="fechaInicio" />
      </Grid>
      <Grid item md={2}>
        <Switch label="Suspendida" campo="suspendida" />
      </Grid>
      {values.suspendida && (
        <Grid item md={7}>
          <Input label="Motivo" campo="motivoSuspencion" />
        </Grid>
      )}
      <Grid item md={4}>
        <Switch label="Es Debito Automatico?" campo="esPorDebitoAutomatico" />
      </Grid>

      {values.esPorDebitoAutomatico && (
        <Grid item md={8}>
          <SelectFormikAlgolia
            coleccionAlgolia={"cuentasCbu"}
            label="Cuenta CBU"
            labelItems={(opt) =>
              `${opt.titular} ${opt.dniTitular ? opt.dniTitular : "(sin dni)"}`
            }
            campo="idCuentaCbu"
            callbackchange={cambiaCuenta}
          />
          <Typography variant="caption">
            {`CBU: ${values.cbu} BANCO: ${
              values.tipoCuenta ? values.label_tipoCuenta : "-"
            }`}{" "}
            <IconButton
              size="small"
              onClick={clickEditarCbu}
              className="fas fa-pencil"
              title="Editar"
            ></IconButton>
            <IconButton
              size="small"
              onClick={clickNuevoCbu}
              className="fas fa-plus"
              title="Agregar Cuenta"
            ></IconButton>
          </Typography>
        </Grid>
      )}
      <Grid item md={5}>
        <SelectTipoPeriodo callbackchange={cambiaTipoPeriodo} />
      </Grid>
      {values.esConAsistencia && (
        <Grid item md={3}>
          <SelectActividades callbackchange={cambiaActividad} />
        </Grid>
      )}
      {values.esConAsistencia && (
        <Grid item md={3}>
          <SelectGrupos idActividad={values.idActividad} />
        </Grid>
      )}
      <Grid item md={7}>
        <SelectProducto />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
      <EditarDialogCbu
        idItem={values.idCuentaCbu}
        open={openEditarCbu}
        setOpen={setOpenEditarCbu}
        callbackSuccess={cbSuccessCbus}
      />
      <NuevoDialogCbu
        open={openNuevoCbu}
        setOpen={setOpenNuevoCbu}
        callbackSuccess={cbSuccessCbus}
      />
    </Grid>
  );
}
