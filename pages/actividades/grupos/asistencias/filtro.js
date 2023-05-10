import FormGenerico2 from "@components/formGenerico2";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import { getFechaString } from "@helpers/dates";
import { Button, Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
//parse timestamp firestore
import { parseTimestamp } from "@helpers/dates";
import { useEffect, useState } from "react";
const oneday = +86400000;
export default function FiltroAsistencias({ setWhere }) {
  const onSubmit = (data) => {
    setWhere([
      ["fecha_timestamp", ">=", data.fechaDesde.getTime()],
      ["fecha_timestamp", "<=", data.fechaHasta.getTime() + oneday],
    ]);
  };
  const cambiaDesde = (data) => {
    localStorage.setItem("fechaDesde", data);
  };
  const cambiaHasta = (data) => {
    localStorage.setItem("fechaHasta", data);
  };

  return (
    <FormGenerico2
      onSubmit={onSubmit}
      initialValues={{
        fechaDesde: new Date(localStorage.getItem("fechaDesde")),
        fechaHasta: new Date(localStorage.getItem("fechaHasta")),
      }}
    >
      <Grid sx={{ p: 3 }} spacing={2} container>
        <Grid item md={4}>
          <SelectFecha
            callbackChange={cambiaDesde}
            campo="fechaDesde"
            label="Fecha Desde"
          />{" "}
        </Grid>
        <Grid item md={4}>
          <SelectFecha
            callbackChange={cambiaHasta}
            campo="fechaHasta"
            label="Fecha Hasta"
          />{" "}
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
