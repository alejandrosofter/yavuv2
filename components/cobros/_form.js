import { Grid } from "@mui/material";
import SelectFecha from "../forms/selectorFecha";

import Input from "../forms/input";

import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectAlgoliaFormik from "../forms/selectAlgoliaFormik";
import { useEffect, useState } from "react";

import SeleccionDeuda from "./seleccionDeuda";
import ItemsCobro from "./_items";
import SelectFormikAlgolia from "../forms/selectAlgoliaFormik";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
export default function Modulo({ setFieldValue, values, mod }) {
  const [clienteSeleccion, setClienteSeleccion] = useState();
  const [deudas, setDeudas] = useState([]);

  const [openDeuda, setOpenDeuda] = useState();
  useEffect(() => {
    if (clienteSeleccion || clienteSeleccion !== undefined) {
      setOpenDeuda(!openDeuda);
    }
  }, [clienteSeleccion]);

  const cambianItemsDeuda = (items) => {
    setFieldValue("deudas", items);
    setDeudas(items);
  };
  const cambiaSocio = (socio) => {
    setClienteSeleccion(socio);
  };

  return (
    <Grid sx={{ pt: 2 }} container>
      <Grid item spacing={2} container>
        <Grid item md={3}>
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
        <Grid item md={1}>
          <SeleccionDeuda
            fnChange={cambianItemsDeuda}
            abre={openDeuda}
            cliente={clienteSeleccion}
          />
        </Grid>
        <Grid item md={2}>
          <SelectFecha label="Fecha" campo="fecha" />
        </Grid>
        <Grid item md={2}>
          <SelectEstaticFormik
            items={["PENDIENTE", "CANCELADA"]}
            label="ESTADO"
            campo="estado"
          />
        </Grid>
      </Grid>
      <Grid item md={8}>
        {" "}
        <ItemsCobro
          values={values}
          setFieldValue={setFieldValue}
          deudas={deudas}
        />
      </Grid>
      <Grid spacing={2} item container direction="column" md={1}>
        <Grid item md={2}>
          <Input label="$ Importe" campo="importe" />
        </Grid>
        <Grid item md={2}>
          <Input label="$ Bonif" campo="importeBonificacion" />
        </Grid>
        <Grid item md={2}>
          <Input label="$ Total" campo="importeTotal" />
        </Grid>
        <Grid item md={2}>
          <Input label="$ PAGA" campo="importePaga" />
        </Grid>
      </Grid>
    </Grid>
  );
}
