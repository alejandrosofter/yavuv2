import Dialogo from "@components/forms/dialogo";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { Grid } from "@mui/material";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import FiltroInformeCobros from "@components/cobros/_filterInforme";
import useLayout from "@hooks/useLayout";

export default function InformesCobros({}) {
  useLayout({
    label: "Cobros",
    titulo: "COBROS",
    icon: "fas fa-bill-dollar",
    acciones: [
      { label: "Cobros", icono: "fas fa-home", url: "/cobros" },
      { label: "Informes", icono: "fas fa-newspaper", url: "/cobros/informes" },
    ],
    components: <MenuCajaDiaria />,
  });
  const { add } = useCollection(`descargas`);
  const coleccion = "cobros";
  const [dataConsulta, setDataConsulta] = useState();
  const [openDialogo, setOpenDialogo] = useState();
  const buscar = (values) => {
    const data = {
      ...values,
      coleccion,
      token: fuego.auth().currentUser.uid,
      titulo: "INFORME DE COBROS",
      usermod: localStorage.getItem("usermod"),
      tk: new Date().getTime(),
    };
    add(data).then((res) => {
      setOpenDialogo(true);
    });
    // setDataConsulta({
    //   url: "/api/colecciones/informes",
    //   data,
    // });
  };

  const callbackQuery = (data, response) => {
    // window.open(response.data?.url, "_blank");
    setOpenDialogo(true);
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
      <Dialogo
        open={openDialogo}
        setOpen={setOpenDialogo}
        icon="fas fa-file-excel"
        titulo={"GENERANDO INFORME"}
        detalle="Aguarde, se esta realizando el informe en segundo plano.. Una vez generado, podra descargarlo DESDE EL MENU NOTIFICACIONES -icono superior derecha- (dependiendo de la cantidad de registros puede tardar mas o menos)"
      />
    </Grid>
  );
}
