import { Stack, Typography } from "@mui/material";

export default function ItemTurno({ item, consultorio }) {
  return (
    <Stack direction="row">
      <Typography variant="caption">{item.label}</Typography>
      <Typography
        sx={{ color: item.estado === "OCUPADO" ? "GREY" : "green" }}
        variant="overline"
      >
        {item.estado === "OCUPADO"
          ? item.turnoOcupado?.label_paciente
          : item.estado}
      </Typography>
    </Stack>
  );
}
