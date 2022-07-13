import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "../../forms/input";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";

export default function FormDebitoAutomatico({ setFieldValue, mod }) {
  const cambiaCuenta = (item) => {
    if (item) {
      setFieldValue(`banco`, item.banco);
      setFieldValue(`cbu`, item.cbu);
      setFieldValue(`titular`, item.titular);
      setFieldValue(`nroCuenta`, item.nroCuenta);
    }
  };

  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item sx={{ flex: 1 }} md={5}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>
      <Grid item sx={{ flex: 1 }} md={5}>
        <SelectFecha label="Inicio del Debito" campo="fechaInicio" />
      </Grid>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={8}>
        <SelectFormikAlgolia
          coleccionAlgolia={"cuentasCbu"}
          label="Cuenta CBU"
          callbackchange={cambiaCuenta}
          labelItems={(opt) =>
            `${opt.titular} ${opt.dniTitular ? opt.dniTitular : "(sin dni)"}`
          }
          campo="idCuentaCbu"
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
