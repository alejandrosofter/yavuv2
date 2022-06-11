import { Typography, Icon, Stack } from "@mui/material";

export default function TitulosFormularios({
  titulo,
  color = "#000",
  subTitulo,
  icono,
}) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography sx={{ fontWeight: "bold", color }} variant="h3">
        {" "}
        <Icon className={icono} /> {titulo}
      </Typography>
      <Typography sx={{ color }} variant="h4">
        {" "}
        {subTitulo}
      </Typography>
    </Stack>
  );
}
