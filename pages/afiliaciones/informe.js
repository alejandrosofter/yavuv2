import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { Grid } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { useState } from "react";
import FiltroInformeCobros from "@components/cobros/_filterInforme";
import Dialogo from "@components/forms/dialogo";
import { UseConfigModulo } from "@helpers/useConfigModulo";

export default function InformesAfiliaciones({}) {
  const coleccion = "afiliaciones";
  const [dataConsulta, setDataConsulta] = useState();
  const config = UseConfigModulo("afiliaciones");
  const { add } = useCollection(`descargas`);
  const [openDialogo, setOpenDialogo] = useState();

  const buscar = (values) => {
    const data = {
      ...values,
      coleccion,
      titulo: "INFORME DE AFILIACIONES",
      token: fuego.auth().currentUser.uid,
      usermod: config.idUsuario,
      tk: new Date().getTime(),
    };
    add(data).then((res) => {
      setOpenDialogo(true);
    });
  };

  const callbackQuery = (data, response) => {
    setOpenDialogo(true);
  };
  return (
    <Grid container>
      <Grid item md={12}>
        <TitulosFormularios
          icono={"fas fa-scroll"}
          titulo="INFORMES"
          subTitulo="de afiliaciones"
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
