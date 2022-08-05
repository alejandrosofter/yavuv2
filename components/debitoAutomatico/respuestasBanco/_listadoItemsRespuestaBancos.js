import ListaSimple from "@components/forms/listaSimple";
import Tabla from "@components/forms/tabla";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Icon from "react-multi-date-picker/components/icon";
import NuevaRespuestaBanco from "./nuevo";

export default function ListadoItemsBanco({ idDebito, respuestaBanco }) {
  const coleccion = `debitoAutomatico/${idDebito}/respuestasBanco/${respuestaBanco?.id}/items`;
  const { data } = useCollection(coleccion, {
    orderBy: "referencia",
    listen: true,
  });

  const [openNew, setOpenNew] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const clickAdd = async () => {
    setOpenNew(true);
  };

  const clickLista = (item) => {
    if (callbackcambia) callbackcambia(item);
    setSeleccion(item);
  };
  const cols = [
    {
      label: "CBU",
      field: "cbu",
    },
    {
      label: "Referencia",
      field: "referencia",
      // fn: (valor, row) => {

      // },
    },
    {
      label: "Socio/s",
      field: "dataMach",
      fn: (data) => {
        return data.data
          .map((item) => `${item.label_socio} ${formatMoney(item.importe)}`)
          .join(", ");
      },
    },
    {
      // align: "right",
      label: "ESTADO",
      field: "estado",
    },
  ];
  return (
    <Grid container>
      <Grid item md={8}>
        <Typography variant="h6">ITEMS</Typography>
      </Grid>

      <Grid item xs={12}>
        <Tabla data={data} cols={cols} />
      </Grid>
    </Grid>
  );
}
