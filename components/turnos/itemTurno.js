import { Icon, Stack, Typography } from "@mui/material";

export default function ItemTurno({ item, consultorio }) {
  console.log(item);
  const iconoConfirmado = (data) => {
    if (item.estado !== "OCUPADO") return <></>;
    if (data.turnoOcupado?.estaConfirmado) {
      return (
        <Icon
          title="Turno CONFIRMADO por paciente "
          sx={{ color: "green" }}
          className="fas fa-check-circle"
        />
      );
    }
    if (data.turnoOcupado?.estaSuspendido)
      return (
        <Icon
          title="Turno SUSPENDIDO por el paciente"
          sx={{ color: "red" }}
          className="fas fa-times-circle"
        />
      );
    //return time wait icon
    return (
      <Icon
        title="No se ha tomado accion del paciente"
        sx={{ color: "gray" }}
        className="fas fa-stop-circle"
      />
    );
  };
  return (
    <Stack direction="row">
      <Typography variant="caption">
        {`${item.label} `} {iconoConfirmado(item)} {` `}
      </Typography>
      <Typography
        sx={{ color: item.estado === "OCUPADO" ? "GREY" : "green", pl: 1 }}
        variant="overline"
      >
        {`${
          item.estado === "OCUPADO"
            ? item.turnoOcupado?.label_paciente
            : item.estado
        } `}
      </Typography>
    </Stack>
  );
}
