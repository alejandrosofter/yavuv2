import { Card, CardHeader, Icon, Typography } from "@mui/material";
import BotonAcciones from "@components/botonAcciones";
import { CardContent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
export default function VistaItemCard({ data, mutate, dataUsuario, modulo }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        subheader={
          <>
            <Avatar alt={data.name} src={data.image} />
            {data.name}
          </>
        }
        action={
          <BotonAcciones
            mutate={mutate}
            data={data}
            modulo={modulo}
            acciones={dataUsuario.acciones}
          />
        }
      />

      <CardContent>
        <Typography variant="h7" color="initial">
          {data.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
