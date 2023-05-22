import { Button, Grid } from "@mui/material";
import SelectFecha from "@components/forms/selectorFecha";

import Input from "@components/forms/input";

import Switch from "@components/forms/switch";

import { useEffect, useState } from "react";

import SeleccionDeuda from "./seleccionDeuda";
import ItemsCobro from "./_items";
import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";
import PersonalizarComprobante from "./_personalizarComprobante";
import SelectSocioSimple from "@components/socios/selectSocioSimple";
import { capitalize } from "@helpers/Strings";
import NuevoCliente from "@components/clientes/nuevo";
import DataNotificacionCliente from "./notificacionCliente";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function Modulo({ setFieldValue, values, banderaReset, isNew }) {
  useEffect(() => {
    // setFieldValue("deudas", []);
    // setFieldValue("formasDePago", []);
    setDeudas([]);
    setClienteSeleccion(null);
  }, [banderaReset]);
  useEffect(() => {
    // setFieldValue("esFiscal", values.esFiscal ? "true" : "false");
  }, [values.esFiscal]);

  const [clienteSeleccion, setClienteSeleccion] = useState();
  const [deudas, setDeudas] = useState([]);

  const [openDeuda, setOpenDeuda] = useState();

  const cambianItemsDeuda = (items) => {
    let auxDeuda = values.deudas ? values.deudas : [];
    auxDeuda = auxDeuda.concat(items);
    setFieldValue("deudas", auxDeuda);
    setDeudas(auxDeuda);
  };
  const cambiaSocio2 = (val, socio) => {
    setClienteSeleccion({ socio, obejctID: socio.id });
  };
  const cambiaSocio = (socio) => {
    setClienteSeleccion(socio);
  };
  const config = UseConfigModulo("cobros");
  const coleccionClientes = config?.coleccionClientes
    ? config?.coleccionClientes
    : "socios";
  const cambiaFiscal = () => {
    console.log();
    localStorage.setItem("cobros_esFiscal", values.esFiscal);
  };
  const labelItems = (option) =>
    `${option.apellido} ${option.nombre}  ${option.nroSocio} (${option.dni}) | ${option.estado}`;
  return (
    <Grid sx={{ pt: 2, p: 3 }} spacing={2} container>
      <Grid
        item
        container
        justifyContent="center"
        direction="row"
        alignItems="center"
        md={6}
      >
        <Grid item md={8}>
          {/* <SelectSocioSimple campo="cliente" callbackchange={cambiaSocio2} /> */}
          <SelectFormikAlgolia
            coleccionAlgolia={coleccionClientes}
            label={capitalize(coleccionClientes)}
            callbackchange={cambiaSocio}
            labelItems={labelItems}
            campo="cliente"
          />
        </Grid>

        <Grid item md={1}>
          <SeleccionDeuda
            coleccionClientes={coleccionClientes}
            enabled={clienteSeleccion}
            fnChange={cambianItemsDeuda}
            abre={openDeuda}
            cliente={clienteSeleccion}
          />
        </Grid>
        <Grid item md={1}>
          <DataNotificacionCliente dataCliente={clienteSeleccion} />
        </Grid>
      </Grid>
      {config?.mostrarAddCliente && (
        <Grid item md={1}>
          <NuevoCliente />
        </Grid>
      )}

      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={4}>
        <PersonalizarComprobante
          setFieldValue={setFieldValue}
          values={values}
        />
      </Grid>
      <Grid item md={12}>
        <ItemsCobro
          values={values}
          setFieldValue={setFieldValue}
          deudas={deudas}
        />
      </Grid>
    </Grid>
  );
}
