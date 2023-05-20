import { Grid, IconButton, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectProducto from "@components/productos/selectProducto";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { useEffect, useState } from "react";
import EditarDialogCbu from "@components/cuentasCbu/editarDialog";
import NuevoDialogCbu from "@components/cuentasCbu/nuevoDialog";
export default function FormDeudaSocio({
  values,
  setFieldValue,
  showSelectSocio,
  socio,
}) {
  const [openEditarCbu, setOpenEditarCbu] = useState(false);
  const [openNuevoCbu, setOpenNuevoCbu] = useState(false);
  const [actividadSeleccion, setActividadSeleccion] = useState();
  useEffect(() => {}, []);
  const clickEditarCbu = () => {
    setOpenEditarCbu(true);
  };
  const clickNuevoCbu = () => {
    setOpenNuevoCbu(true);
  };
  const cbSuccessCbus = (item, res) => {
    setOpenEditarCbu(false);
    setOpenNuevoCbu(false);
    setItemsCuenta(item);
  };
  const cambiaPromocion = (valor, item) => {
    if (item) {
      setFieldValue("bonificacionImporte", item.importe);
      setFieldValue("bonificacionPorcentaje", item.porcentaje);
    }
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

      // setFieldValue(`agregarActividad`, item.esConAsistencia);
    }
  };
  const cambiaSocio = (item) => {
    setFieldValue("apellido", item.apellido);
    setFieldValue("nombre", item.nombre);
  };
  const cambiaEstado = (valor, item) => {
    if (item) setFieldValue("fechaCambioEstado", new Date());
  };
  const cambiaActividad = (valor, item) => {
    if (item) setActividadSeleccion(item);
  };

  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fechaInicio" />
      </Grid>

      <Grid item md={4}>
        <SelectEstaticFormik
          callbackchange={cambiaEstado}
          items={["PENDIENTE", "CANCELADA"]}
          label="Estado"
          campo="estado"
        />
      </Grid>

      <Grid item md={4}>
        <Switch label="Es Debito Automatico?" campo="esPorDebitoAutomatico" />
      </Grid>

      {/* {values.esPorDebitoAutomatico && (
        <Grid item md={12}>
          <SelectAlgoliaUserModColeccion
            coleccionAlgolia={"cuentasCbu"}
            label="Cuenta CBU"
            Form={Form}
            values={values}
            Modelo={Modelo}
            valoresIniciales={valoresIniciales}
            coleccion="cuentasCbu"
            labelItems={(opt) =>
              `${opt.titular} - ${opt.cbu} - ${
                opt.dniTitular ? opt.dniTitular : ""
              }`
            }
            campo="idCuentaCbu"
            callbackchange={cambiaCuenta}
          />
          <Typography variant="caption">
            {`CBU: ${values.cbu} BANCO: ${
              values.tipoCuenta ? values.label_tipoCuenta : "-"
            }`}{" "}
          </Typography>
        </Grid>
      )} */}
      {/* {values.suspendida && (
        <Grid item md={7}>
          <Input label="Motivo" campo="motivoSuspencion" />
        </Grid>
      )} */}
      {/* <Grid item md={3}>
        <Switch label="Baja Servicio" campo="bajaServicio" />
      </Grid>
      {values.bajaServicio && (
        <Grid item md={3}>
          <SelectFecha label="Fecha Baja" campo="fechaBaja" />
        </Grid>
      )} */}
      {/* <Grid item md={5}>
        <SelectTipoPeriodo callbackchange={cambiaTipoPeriodo} />
      </Grid> */}
      {/* <Grid item md={2}>
        <Switch label="Promocion" campo="promocion" />
      </Grid>
      {values.promocion && (
        <Grid item md={5}>
          <SelectPromocion callbackchange={cambiaPromocion} />
        </Grid>
      )} */}

      <Grid item md={9}>
        <SelectProducto />
      </Grid>
      <Grid item md={3}>
        <Input label="Importe" campo="importeFinal" />
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
