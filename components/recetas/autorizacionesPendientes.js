import { getFechaString } from "@helpers/dates";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";

export function AutorizacionesPendientes({ onAccept, onCancel, paciente }) {
  const { data } = useCollection("recetasAutorizacion", {
    where: [
      ["estado", "==", "PENDIENTE"],
      ["idPaciente", "==", paciente?.id],
    ],
    listen: true,
  });
  return (
    <Box sx={{ p: 2 }}>
      {data?.length > 0 && (
        <Typography variant="h6">
          Este paciente tiene autorizaciones pendientes!{" "}
        </Typography>
      )}
      {data?.map((item) => {
        return (
          <Alert key={item.id} variant="outlined" severity="warning">
            <Typography variant="caption">
              FECHA: {getFechaString(item.fechaReceta)} CANT:({item.cantidad})
              DETALLE: {item.label_idPrestacion}{" "}
            </Typography>

            <Box sx={{ p: 3 }}>
              {" "}
              <Button variant="contained" onClick={onAccept?.bind(this, item)}>
                Aceptar
              </Button>
              <Button onClick={onCancel?.bind(this, item)}>Cancelar</Button>
            </Box>
          </Alert>
        );
      })}
    </Box>
  );
}
