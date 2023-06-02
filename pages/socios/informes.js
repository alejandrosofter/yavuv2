import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { useState } from "react";
import FiltroInformeCobros from "@components/cobros/_filterInforme";
import Dialogo from "@components/forms/dialogo";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getSetPermiso } from "@hooks/useUser";

export default function Page({}) {
  const coleccion = "socios";
  const [dataConsulta, setDataConsulta] = useState();
  const [openDialogo, setOpenDialogo] = useState();
  const { add } = useCollection(`descargas`);
  const config = UseConfigModulo("socios");
  const permisos = getSetPermiso("socios");
  const listarSocios = (values) => {
    // setDataConsulta({
    //   url: "/api/colecciones/informes",
    //   data
    // });
    const data = {
      coleccion,
      token: fuego.auth().currentUser.uid,
      titulo: "INFORME DE SOCIOS",
      tk: new Date().getTime(),
    };
    add(data).then((res) => {
      setOpenDialogo(true);
    });
  };
  const cambiosEstado = (values) => {
    // setDataConsulta({
    //   url: "/api/colecciones/informes",
    //   data: {
    //     ...values,
    //     coleccion: "cambiosEstado",
    //     titulo: "INFORME ESTADOS SOCIOS",
    //     token: fuego.auth().currentUser.uid,
    //     usermod: localStorage.getItem("usermod"),
    //     tk: new Date().getTime(),
    //   },
    // });

    const data = {
      ...values,
      ...permisos,
      token: permisos.usermod,
      coleccion: "cambiosEstado",
      titulo: "INFORME ESTADOS SOCIOS",

      tk: new Date().getTime(),
    };
    add(data).then((res) => {
      setOpenDialogo(true);
    });
  };

  const callbackQuery = (data, response) => {
    setOpenDialogo(true);
    // window.open(response.data?.url, "_blank");
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
      <Grid item md={4}>
        <Typography variant="h6" gutterBottom component="div">
          EXCEL TODOS LOS SOCIOS
        </Typography>
        <Button variant="contained" onClick={() => listarSocios({})}>
          {" "}
          <Icon sx={{ mr: 2 }} className="fas fa-scroll" /> Descargar
        </Button>
      </Grid>
      <Grid item md={4}>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom component="div">
            ALTAS/BAJAS (cambios estado)
          </Typography>
        </Grid>
        <Grid item md={12}>
          <FiltroInformeCobros
            callbackBuscar={cambiosEstado}
            valoresIniciales={{
              fechaDesde: new Date(),
              fechaHasta: new Date(),
            }}
          />
        </Grid>
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
