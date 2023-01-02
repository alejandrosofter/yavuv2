import { Button, Grid } from "@mui/material";
import SelectFecha from "@components/forms/selectorFecha";
import { useEffect, useState } from "react";

import SeleccionDeuda from "./seleccionDeuda";
import ItemsCobro from "./_items";
import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";
import PersonalizarComprobante from "./_personalizarComprobante";
import { capitalize } from "@helpers/Strings";
import NuevoCliente from "@components/clientes/nuevo";
import DataNotificacionCliente from "./notificacionCliente";
export default function Modulo({ setFieldValue, values, mod, banderaReset }) {
  useEffect(() => {
    // setFieldValue("deudas", []);
    // setFieldValue("formasDePago", []);
    setDeudas([]);
    setClienteSeleccion(null);
  }, [banderaReset]);
  const [clienteSeleccion, setClienteSeleccion] = useState();
  const [deudas, setDeudas] = useState([]);

  const [openDeuda, setOpenDeuda] = useState();

  const cambianItemsDeuda = (items) => {
    let auxDeuda = values.deudas ? values.deudas : [];
    auxDeuda = auxDeuda.concat(items);
    console.log(auxDeuda);
    setFieldValue("deudas", auxDeuda);
    setDeudas(auxDeuda);
  };
  const cambiaSocio2 = (val, socio) => {
    setClienteSeleccion({ socio, obejctID: socio.id });
  };
  const cambiaSocio = (socio) => {
    setClienteSeleccion(socio);
  };
  const coleccionClientes = mod.config?.coleccionClientes
    ? mod.config?.coleccionClientes
    : "socios";

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
            labelItems={(opt) =>
              coleccionClientes === "socios"
                ? `${opt.apellido} ${opt.nombre} - ${opt.dni} - ${opt.nroSocio}`
                : `${opt.nombre} - ${opt.apellido}`
            }
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
          <DataNotificacionCliente mod={mod} dataCliente={clienteSeleccion} />
        </Grid>
      </Grid>
      {mod.config?.mostrarAddCliente && (
        <Grid item md={1}>
          <NuevoCliente mod={mod} />
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
