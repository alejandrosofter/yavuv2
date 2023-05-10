import {
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import parse from "html-react-parser";
import { useState } from "react";
import moment from "moment";
import axios from "axios";

export default function AbrirAgendaMes({
  estilo,
  data,
  fechaBusca,
  consultorio,
  callbackSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const diaAbrible = (fecha, dia) => {
    if (fecha.getDay() === dia) {
      return true;
    }
    return false;
  };

  const getDias = (dias) => {
    return `${dias
      .map((dia) =>
        diaAbrible(fechaBusca, dia.value)
          ? `<b style='color:green'>${dia.label}</b>`
          : `<b style='color:grey'>${dia.label}</b>`
      )
      .join(",")}`;
  };
  const esAbrible = (horario) => {
    let diasCoincide = 0;
    if (horario && horario.length > 0)
      for (let i = 0; i < horario.length; i++)
        diasCoincide += horario[i].dias
          .map((dia) => (dia.value === fechaBusca.getDay() ? 1 : 0))
          .reduce((a, b) => a + b, 0);

    return diasCoincide > 0;
  };
  const abrirAgenda = async () => {
    setLoading(true);
    const dataSend = JSON.stringify({
      strFecha: moment(fechaBusca).format("Y-M-D"),
      idConsultorio: consultorio.id,
    });
    const options = {
      headers: { "content-type": "application/json" },
    };
    // ;

    await axios
      .post(`/api/turnos/abreAgenda`, dataSend, options)
      .then((res) => {
        if (callbackSuccess) callbackSuccess(res);
      })
      .catch((err) => {});

    setLoading(false);
    if (callbackSuccess) callbackSuccess();
  };
  if (!data) {
    return (
      <Grid
        sx={{
          ...estilo,
        }}
        item
        md={3}
      >
        <Stack>
          {esAbrible(consultorio.horarios) && (
            <>
              <Button onClick={abrirAgenda}>
                ABRIR AGENDA {consultorio.nombreCorto}
              </Button>
              <Typography variant="caption">
                (Debes abrir la agenda para poder programar un turno)
              </Typography>
            </>
          )}
          {!esAbrible(consultorio.horarios) && (
            <Typography color="red" variant="H5">
              NO ES UN DIA CONFIGURADO PARA ABRIR
            </Typography>
          )}

          <Typography
            sx={{ fontSize: 10, fontWeight: "bold", color: "primary" }}
            variant="caption"
            ht
          >
            HORARIOS CONFIGURADOS
          </Typography>
          {!consultorio.horarios && (
            <Typography variant="caption">
              No hay horarios configurados para este consultorio
            </Typography>
          )}

          {consultorio.horarios &&
            consultorio.horarios.map((horario) => (
              <Typography key={horario.id} variant="caption" ht>
                {horario.desde} - {horario.hasta} los dias{" "}
                {parse(getDias(horario.dias))}
              </Typography>
            ))}
        </Stack>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    );
  }
}
