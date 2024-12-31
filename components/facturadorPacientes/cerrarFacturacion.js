import DialogContenido from "@components/forms/dialogContenido";
import Dialogo from "@components/forms/dialogo";
import SelectorFechaSimple from "@components/forms/selectorFechaSimple";
import { getFechaString } from "@helpers/dates";
import { Backdrop, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import Typography from "@mui/material/Typography";
import { useCollection } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
export function CerrarFacturacionDialog({ open, setOpen, data }) {
  const [loading, setLoading] = useState(false);
  const { add } = useCollection(`recetasLiquidaciones`);
  const [hastaFecha, setHastaFecha] = useState(new Date());
  const [cantidadFacturada, setCantidadFacturada] = useState(0);
  useEffect(() => {
    setCantidadFacturada(
      data?.item
        .map((item) => {
          delete item.__snapshot;
          delete item.usermod;
          return item;
        })
        .filter((item) => {
          return item.fechaReceta.seconds <= hastaFecha.getTime() / 1000;
        }).length
    );
  }, [hastaFecha, data]);
  const cambiaFecha = (data) => {
    setHastaFecha(data);
  };
  const confirmCerrar = () => {
    setLoading(true);
    const newData = {
      fecha: new Date(),
      hastaFecha,
      cantidadItems: data?.item?.length,

      idEnteFacturador: data?.idEnteFacturador,
      label_idEnteFacturador: data?.item[0]?.label_idEnteFacturador,
      items: data?.item
        .map((item) => {
          delete item.__snapshot;
          delete item.usermod;
          return item;
        })
        .filter((item) => {
          return item.fechaReceta <= hastaFecha;
        }),
    };
    console.log(newData);
    add(newData).then(() => {
      setLoading(false);
      setOpen(false);
    });
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom>
            Cierre de Facturacion
          </Typography>
        </Grid>
        <Grid item md={5}>
          <SelectorFechaSimple
            label="Fecha Tope de Facturacion"
            callbackChange={cambiaFecha}
          />

          <Typography variant="caption" color="textSecondary">
            Se cerrara la facturacion con esta fecha como tope para la
            facturacion pendiente
          </Typography>
          <Typography variant={"h6"}>
            Con tope de fecha {getFechaString(hastaFecha, "DD/MM/YY")} existen{" "}
            {cantidadFacturada} facturas pendientes
          </Typography>
        </Grid>
        {/* <Grid item md={7}>
          <Input label="Periodo" campo="periodo" />
        </Grid> */}
        <Grid item md={12}>
          <Button fullWidth variant="contained" onClick={confirmCerrar}>
            Aceptar
          </Button>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </DialogContenido>
  );
}
