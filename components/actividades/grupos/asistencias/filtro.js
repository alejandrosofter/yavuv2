import FormGenerico2 from "@components/formGenerico2";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import { getFechaString } from "@helpers/dates";
import { Button, Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
//parse timestamp firestore
import { parseTimestamp } from "@helpers/dates";
import { useState } from "react";

export default function FiltroAsistencias({ setWhere }) {
  const onSubmit = (data) => {
    const start = new Date("2021-01-01T00:00:00.000z");
    setWhere([["fecha.seconds", ">", 432432]]);
  };
  return (
    <FormGenerico2
      onSubmit={onSubmit}
      initialValues={{ fechaDesde: new Date(), fechaHasta: new Date() }}
    >
      <Grid sx={{ p: 3 }} spacing={2} container>
        <Grid item md={4}>
          <SelectFecha campo="fechaDesde" label="Fecha Desde" />{" "}
        </Grid>
        <Grid item md={4}>
          <SelectFecha campo="fechaHasta" label="Fecha Hasta" />{" "}
        </Grid>
        <Grid item md={4}>
          <Button color="primary" variant="outlined" type="submit">
            BUSCAR
          </Button>
        </Grid>
      </Grid>
    </FormGenerico2>
  );
}
