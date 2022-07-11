import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "../../forms/input";
import Switch from "../../forms/switch";

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectFormik from "../../forms/select2Formik";
import Productos from "../../productos/selectProducto";
import { getItemArray } from "../../../helpers/arrays";
import SelectEstaticFormik from "../../forms/selectEstaticFormik";
import { useRouter } from "next/router";
import AlgoliaAutocomplete from "@components/forms/algoliaSearch";
import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";

export default function FormDebitoAutomatico({ values, setFieldValue, mod }) {
  const cambiaCuenta = (valor, item) => {
    setFieldValue(`valor_idCuentaCbu`, item ? item.cbu : "");
  };

  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item sx={{ flex: 1 }} md={7}>
        <SelectFecha label="Fecha " campo="fecha" />
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
          labelItems={(opt) => `${opt.titular}`}
          campo="idCuentaCbu"
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
