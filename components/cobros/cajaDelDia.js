import SelectorFechaSimple from "@components/forms/selectorFechaSimple";
import Tabla from "@components/forms/tabla";
import {
  contador,
  getSubArray,
  groupBy,
  parseMaptoArray,
} from "@helpers/arrays";
import { getFechaString, getFechasWhere } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { Drawer, Grid, Icon, Typography } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import * as React from "react";
export default function CajaDelDia({ open, setOpen, parentData }) {
  const [fecha, setFecha] = React.useState(new Date());
  const close = () => {
    setOpen(false);
  };
  const [fechaDesde, fechaHasta] = getFechasWhere(fecha);

  const { data, error } = useCollection("cobros", {
    where: [
      ["fecha_timestamp", ">", fechaDesde.getTime()],
      ["fecha_timestamp", "<=", fechaHasta.getTime()],
      parentData
        ? ["idUsuario", "==", localStorage.getItem("usermod")]
        : ["usermod", "==", fuego.auth().currentUser?.uid],
    ],
    orderBy: ["fecha_timestamp", "desc"],
    listen: true,
  });
  if (!data) return "..";
  const dataGroup = groupBy(
    getSubArray(data, "formasDePago").flat(),
    (item) => item?.label_formaPago,
    true
  );

  //cast object to array
  console.log(dataGroup);
  const dataFormaPagos = Object.keys(dataGroup).map((key) => {
    return {
      label_formaPago: key,
      items: dataGroup[key],
      importe: dataGroup[key].reduce((a, b) => a + b?.importe, 0),
    };
  });
  console.log(dataFormaPagos);
  const cambiaFecha = (fecha) => {
    setFecha(fecha);
  };
  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Grid sx={{ p: 3, width: 400 }} container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom component="div">
            <Icon className="fas fa-money-bill" /> CAJA DIARIA{" "}
            <SelectorFechaSimple callbackChange={cambiaFecha} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">COBROS</Typography>
          <Tabla
            data={data}
            cols={[
              {
                field: "label_cliente",
                label: "Cliente",
                fn: (data) => {
                  return String(data).toUpperCase();
                },
              },
              {
                field: "importePaga",
                label: "Importe",
                align: "right",
                fn: (row) => {
                  return formatMoney(row);
                },
              },
            ]}
          />
          <Typography variant="h6">FORMAS DE PAGO</Typography>
          <Tabla
            data={dataFormaPagos}
            cols={[
              {
                field: "label_formaPago",
                label: "Forma de Pago",
                fn: (data) => {
                  return String(data).toUpperCase();
                },
              },
              {
                field: "importe",
                label: "Importe",
                align: "right",
                fn: (row) => {
                  return formatMoney(row);
                },
              },
            ]}
          />
        </Grid>
      </Grid>
    </Drawer>
  );
}
