import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { useState } from "react";

import SwitchFormik from "@components/forms/switch";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import SelectFormik from "@components/forms/select2Formik";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function FormModulo({ values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <SelectEstaticFormik items={["SOCIOS"]} label="Modulo" campo="modulo" />
      </Grid>
      <Grid item md={6}>
        <SelectEstaticFormik
          items={[
            "SOLO ACTIVOS",
            "SOLO INACTIVOS",
            "TODOS",
            "SOLO SOCIOS PERSONALES",
            "SOLO SOCIOS EMPRESA",
          ]}
          label="Destino"
          campo="destino"
        />
      </Grid>
    </Grid>
  );
}
