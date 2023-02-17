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
import SelectAlgoliaUserModColeccion from "@components/forms/selectAlgoliaUsermodColeccion";
import Form from "@components/cuentasCbu/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloCuentasCbu";
import SelectSocio from "../selectSocio";
export default function FormMensualizado({
  values,
  setFieldValue,
  showSelectSocio,
  socio,
}) {
  const [openEditarCbu, setOpenEditarCbu] = useState(false);
  const [openNuevoCbu, setOpenNuevoCbu] = useState(false);
  const [actividadSeleccion, setActividadSeleccion] = useState();
  useEffect(() => {
    if (socio) {
      setFieldValue("apellido", socio.apellido);
      setFieldValue("nombre", socio.nombre);
      setFieldValue("dni", socio.dni);
      setFieldValue("idSocio", socio.id);
    }
  }, [socio]);
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
      <Grid item container>
        <Grid item md={12}>
          <Typography variant="caption">
            ** IMPORTANTE: a partir del campo FECHA INICIO se comenzara a
            generar la deuda
          </Typography>
        </Grid>
        <Grid item md={12}>
          {values.suspendida && (
            <Typography variant="caption">
              ** IMPORTANTE: el campo FECHA FIN (en caso de suspencion determina
              la fecha del ultima vez que va a tener que abonar este servicio)
            </Typography>
          )}
        </Grid>
      </Grid>
      {showSelectSocio && (
        <Grid item md={12}>
          <SelectSocio
            callbackchange={cambiaSocio}
            initLabel={`${values.apellido} ${values.nombre}`}
          />
        </Grid>
      )}
      <Grid item md={3}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>

      <Grid item md={3}>
        <SelectFecha label="Fecha Inicio/Prox. cuota" campo="fechaInicio" />
      </Grid>
      {/* <Grid item md={2}>
        <Switch label="Suspendida" campo="suspendida" />
      </Grid> */}
      <Grid item md={4}>
        <SelectEstaticFormik
          callbackchange={cambiaEstado}
          items={["ALTA", "BAJA (ultimo mes)", "BAJA DEFINITIVA", "SUSPENDIDO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      {/* {values.estado === "BAJA" && (
        <Grid item md={3}>
        <Switch label="Cobrar Mes actual" campo="cobrarMesActual" />
      </Grid>
      
      )}
       {values.estado === "BAJA" && (
        <Grid item md={2}>
        <Switch label="Baja Definitiva" campo="bajaDefinitiva" />
      </Grid>
      
      )} */}
      <Grid item md={4}>
        <Switch label="Es Debito Automatico?" campo="esPorDebitoAutomatico" />
      </Grid>

      {values.esPorDebitoAutomatico && (
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
      )}
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
      <Grid item md={6}>
        <SelectTipoPeriodo callbackchange={cambiaTipoPeriodo} />
      </Grid>
      <Grid item md={12}>
        <SelectProducto />
      </Grid>
      <Grid item md={3}>
        <Switch label="Enviar a Actividad" campo="agregarActividad" />
      </Grid>
      {values.agregarActividad && (
        <Grid item md={4}>
          <SelectActividades callbackchange={cambiaActividad} />
        </Grid>
      )}
      {values.agregarActividad && (
        <Grid item md={5}>
          <SelectGrupos idActividad={values.idActividad} />
        </Grid>
      )}
      <Grid item md={2}>
        <Switch label="Promocion" campo="promocion" />
      </Grid>
      {values.promocion && (
        <Grid item md={5}>
          <SelectPromocion callbackchange={cambiaPromocion} />
        </Grid>
      )}
      <Grid item md={10}>
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
