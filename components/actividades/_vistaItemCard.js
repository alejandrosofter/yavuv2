import { Card, CardHeader, Icon, Typography } from "@mui/material";
import BotonAcciones from "@components/botonAcciones";
import { CardContent } from "@mui/material";

export default function VistaItemCard({ data, token, mutate, modulo }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        subheader={
          data.subActividades &&
          data.subActividades.map((item) => `${item.nombreActividad} | `)
        }
        action={
          <BotonAcciones
            mutate={mutate}
            token={token}
            data={data}
            modulo={modulo}
          />
        }
      />

      <CardContent>
        <Typography variant="h5" color="initial">
          {data.nombreActividad}
        </Typography>
        {}
      </CardContent>
    </Card>
  );
}
