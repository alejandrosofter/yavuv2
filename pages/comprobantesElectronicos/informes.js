import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { Grid } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { useState } from "react";
import FiltroInformeCobros from "@components/cobros/_filterInforme";
import Dialogo from "@components/forms/dialogo";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getSetPermiso } from "@hooks/useUser";

export default function InformesCobros({}) {
  const coleccion = "comprobantesElectronicos";
  const config = UseConfigModulo("comprobantesElectronicos");
  const [dataConsulta, setDataConsulta] = useState();
  const { add } = useCollection(`descargas`);

  const [openDialogo, setOpenDialogo] = useState();
  const permisos = getSetPermiso("comprobantesElectronicos");
  const buscar = (values) => {
    const data = {
      ...values,
      ...permisos,
      token: permisos.idUsuario,
      usermod: fuego.auth().currentUser?.uid,
      coleccion,
      titulo: "INFORME DE COMPROBANTES ELECTRONICOS",
      tk: new Date().getTime(),
    };
    console.log(data);
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
          subTitulo="de comprobantes electronicos"
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
