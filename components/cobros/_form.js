import { Button, Grid } from "@mui/material";
import SelectFecha from "../forms/selectorFecha";

import Input from "../forms/input";

import Switch from "../forms/switch";

import SelectEstaticFormik from "../forms/selectEstaticFormik";
import { useEffect, useState } from "react";

import SeleccionDeuda from "./seleccionDeuda";
import ItemsCobro from "./_items";
import SelectFormikAlgolia from "../forms/selectAlgoliaFormik";
import PersonalizarComprobante from "./_personalizarComprobante";
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
  const [openPersonalizar, setOpenPersonalizar] = useState();
  const cambiaPersonalizar = (value) => {
    setOpenPersonalizar(value);
  };
  const cambianItemsDeuda = (items) => {
    let auxDeuda = values.deudas ? values.deudas : [];
    auxDeuda = auxDeuda.concat(items);
    console.log(auxDeuda);
    setFieldValue("deudas", auxDeuda);
    setDeudas(auxDeuda);
  };
  const cambiaSocio = (socio) => {
    setClienteSeleccion(socio);
  };

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
          <SelectFormikAlgolia
            coleccionAlgolia={"socios"}
            label="Socio"
            callbackchange={cambiaSocio}
            labelItems={(opt) =>
              `${opt.apellido} ${opt.nombre} - ${opt.dni} - ${opt.nroSocio}`
            }
            campo="cliente"
          />
        </Grid>

        <Grid item md={3}>
          <SeleccionDeuda
            enabled={clienteSeleccion}
            fnChange={cambianItemsDeuda}
            abre={openDeuda}
            cliente={clienteSeleccion}
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent="flex-end"
        alignItems="flex-start"
        item
        container
        spacing={2}
        xs={6}
      >
        <Grid item md={3}>
          <SelectFecha label="Fecha" campo="fecha" />
        </Grid>
        <Grid item md={3}>
          <Switch label="Es Fiscal?" campo="esFiscal" />
        </Grid>
        {values.esFiscal && (
          <Grid item md={5}>
            <Button onClick={() => setOpenPersonalizar(true)}>
              {values.comprobante_razonSocial}
            </Button>
          </Grid>
        )}
      </Grid>

      <PersonalizarComprobante
        open={openPersonalizar}
        setOpen={setOpenPersonalizar}
      />
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
