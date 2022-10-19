import {
  contador,
  getSubArray,
  groupBy,
  parseMaptoArray,
} from "@helpers/arrays";
import { getFechasWhere } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { Drawer, Grid, Icon, Typography } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import * as React from "react";
export default function CajaDelDia({ open, setOpen, parentData }) {
  const close = () => {
    setOpen(false);
  };
  const [fechaDesde, fechaHasta] = getFechasWhere(new Date());

  const { data, error } = useCollection("cobros", {
    where: [
      ["fecha_timestamp", ">", fechaDesde.getTime()],
      ["fecha_timestamp", "<=", fechaHasta.getTime()],
      parentData
        ? ["idUsuario", "==", localStorage.getItem("usermod")]
        : ["usermod", "==", fuego.auth().currentUser?.uid],
    ],
    orderBy: ["fecha_timestamp", "desc"],
    // limit: 10,
  });

  const dataGroup = parseMaptoArray(
    groupBy(getSubArray(data, "formasDePago").flat(), (item) => item.formaPago)
  );
  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Grid sx={{ p: 3, width: 400 }} container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom component="div">
            <Icon className="fas fa-money-bill" /> CAJA DIARIA{" "}
            {`${fechaDesde.getDate()}/${
              fechaDesde.getMonth() + 1
            }/${fechaDesde.getFullYear()}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">COBROS</Typography>
          {data &&
            data.map((item) => {
              return (
                <Typography
                  key={item.id}
                  variant="body"
                  gutterBottom
                  component="div"
                >
                  {item.label_cliente} - {formatMoney(item.importe)}
                </Typography>
              );
            })}
          <Typography variant="h6">FORMAS DE PAGO</Typography>
          {dataGroup.map(function ({ key, value }) {
            const importeTotal = contador(value, "importe");
            const label = value[0].label_formaPago;
            return (
              <Typography key={key} variant="body" gutterBottom component="div">
                {label} - {formatMoney(importeTotal)}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </Drawer>
  );
}
