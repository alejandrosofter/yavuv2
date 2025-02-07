import ListaSimple from "@components/forms/listaSimple";
import { groupBy } from "@helpers/arrays";
import { formatMoney } from "@helpers/numbers";
import { Close } from "@material-ui/icons";
import { LockOpen, LockOpenOutlined } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
export default function FacturacionPendiente({
  data,
  clickItem,
  onCerrar,
  idEnteFacturador,
  hideCerrar,
  dataOs,
}) {
  //   const order = ["fecha", "desc"];
  // const [dataOs, setDataOs] = useState([]);
  //   const { data } = useCollection("recetasFacturacion", {
  //     where: [
  //       ["estado", "==", "PENDIENTE"],
  //       ["idEnteFacturador", "==", enteFacturador.id],
  //     ],
  //   });
  // useEffect(() => {
  //   if (data) {
  //     const dataGroup = groupBy(data, (item) => item.label_obraSocial, true);
  //     const arrGroup = Object.entries(dataGroup);
  //     setDataOs(
  //       arrGroup.map((item) => ({
  //         nombre: item[0],
  //         id: `ID_${item[0]}`,
  //         cantidad: item[1].length,
  //         valores: item[1],
  //         importe: item[1].reduce((n, p) => n + Number(p.importe ?? 0), 0),
  //       }))
  //     );
  //   }
  // }, [data]);

  return (
    <Grid container spacing={0}>
      {!hideCerrar && (
        <Grid sx={{ p: 0, m: 0 }} item md={12}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={onCerrar?.bind(this, data, idEnteFacturador)}
            >
              <LockOpenOutlined />{" "}
              <Typography variant=" caption">cerrar facturacion </Typography>
            </Button>
          </Stack>
        </Grid>
      )}
      <Grid item md={12}>
        <ListaSimple
          items={dataOs}
          label="Obras Sociales"
          onClick={clickItem}
          fnRender={(item) => (
            <Typography color={item.color} variant="body">
              {`${item.nombre} (${item.cantidad}) ${formatMoney(item.importe)}`}
            </Typography>
          )}
        />
      </Grid>
    </Grid>
  );
}
