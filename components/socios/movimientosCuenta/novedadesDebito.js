import { Grid, Typography } from "@mui/material";

import { getFechaString } from "@helpers/dates";
import DialogContenido from "@components/forms/dialogContenido";

import Tabla from "@components/forms/tabla";
import { formatMoney } from "@helpers/numbers";
export default function ListaStatusDebitos({ data, setOpen, open }) {
  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const cols = [
    {
      label: "Fecha",
      field: "fecha",
      fn: (valor) => {
        return getFechaString(valor);
      },
    },
    {
      label: "Estado",
      field: "estado",
    },
    {
      label: "Titular",
      field: "titular",
    },
    {
      label: "Detalle",
      field: "detalle",
    },
    {
      label: "Importe",
      field: "importe",
      fn: (valor) => {
        return formatMoney(valor);
      },
    },
  ];

  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h6">Historial de DEBITO AUTOMATICO</Typography>
        </Grid>
        <Grid item md={12}>
          <Tabla data={data ? data : []} cols={cols} />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
