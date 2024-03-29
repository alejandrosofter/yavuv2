import { Card, CardHeader, Icon, Typography } from "@mui/material";
import BotonAcciones from "@components/botonAcciones";
import { CardContent } from "@mui/material";

export default function VistaItemCard({ data, mutate, dataUsuario, modulo }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        subheader={`${data.host} (defecto? ${data.esDefecto ? "si" : "no"})`}
        action={<BotonAcciones mutate={mutate} data={data} modulo={modulo} />}
      />

      <CardContent>
        <Typography variant="h5" color="initial">
          {data.nombre}
        </Typography>
      </CardContent>
    </Card>
  );
}
