import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import FiltroInformeCobros from "./_filterInforme";

export default function InformesCobros({ mod }) {
  const coleccion = "cobros";
  const [dataConsulta, setDataConsulta] = useState();
  const buscar = (values) => {
    setDataConsulta({
      url: "/api/colecciones/informes",
      data: {
        ...values,
        coleccion,
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
    <Grid container>
      <Grid item md={12}>
        <TitulosFormularios
          icono={"fas fa-scroll"}
          titulo="INFORMES"
          subTitulo="de cobros"
        />
      </Grid>
      <Grid item md={12}>
        <FiltroInformeCobros
          callbackBuscar={buscar}
          valoresIniciales={{ fechaDesde: new Date(), fechaHasta: new Date() }}
        />
      </Grid>
      <QueryApi callbackSuccess={callbackQuery} dataConsulta={dataConsulta} />
    </Grid>
  );
}
