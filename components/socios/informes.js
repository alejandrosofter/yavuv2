import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import FiltroInformeCobros from "@components/cobros/_filterInforme";

export default function InformesCobros({ mod }) {
  const coleccion = "socios";
  const [dataConsulta, setDataConsulta] = useState();
  const listarSocios = (values) => {
    setDataConsulta({
      url: "/api/colecciones/informes",
      data: {
        coleccion,
        token: fuego.auth().currentUser.uid,
        usermod: localStorage.getItem("usermod"),
        tk: new Date().getTime(),
      },
    });
  };
  const cambiosEstado = (values) => {
    setDataConsulta({
      url: "/api/colecciones/informes",
      data: {
        ...values,
        coleccion: "cambiosEstado",
        token: fuego.auth().currentUser.uid,
        usermod: localStorage.getItem("usermod"),
        tk: new Date().getTime(),
      },
    });
  };

  const callbackQuery = (data, response) => {
    window.open(response.data?.url, "_blank");
  };
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <TitulosFormularios
          icono={"fas fa-scroll"}
          titulo="INFORMES"
          subTitulo="de socios"
        />
      </Grid>
      <Grid item md={2}>
        <Typography variant="h6" gutterBottom component="div">
          LISTADO total de socios
        </Typography>
      </Grid>
      <Grid item md={10}>
        <Button variant="contained" onClick={() => listarSocios({})}>
          {" "}
          <Icon sx={{ mr: 2 }} className="fas fa-scroll" /> Listado TOTAL de
          SOCIOS
        </Button>
      </Grid>

      <Grid item md={2}>
        <Typography variant="h6" gutterBottom component="div">
          ALTAS/BAJAS (cambios estado)
        </Typography>
      </Grid>
      <Grid item md={10}>
        <FiltroInformeCobros
          callbackBuscar={cambiosEstado}
          valoresIniciales={{ fechaDesde: new Date(), fechaHasta: new Date() }}
        />
      </Grid>
      <QueryApi callbackSuccess={callbackQuery} dataConsulta={dataConsulta} />
    </Grid>
  );
}
