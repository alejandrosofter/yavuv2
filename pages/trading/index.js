import { useState } from "react";
import { Grid } from "@mui/material";

import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloEstrategiasTrading";
import Form from "@components/trading/_form";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { formatMoney } from "@helpers/numbers";
import LinkTradingView from "@components/trading/linkTradingView";
import TradingsEstrategia from "@components/trading/tradingsEstrategia";
export default function ListaGrupos({ actividad, callbackchange }) {
  const order = ["nombreGrupo", "asc"];
  const [seleccion, setSeleccion] = useState(null);
  const [dataConsulta, setDataConsulta] = useState();
  const [openLink, setOpenLink] = useState();
  const [openTradings, setOpenTradings] = useState();
  const callbackclick = (params) => {
    cambiaSeleccion(params.row);
  };

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };

  const columns = [
    {
      field: "estado",
      headerName: "Estado",
      width: 130,
    },
    {
      field: "mercado",
      headerName: "Mercado",
      width: 100,
    },
    {
      field: "evento",
      headerName: "Evento",
      width: 100,
    },

    {
      field: "posicionCerrada",
      headerName: "Close ant?",
      width: 100,
      renderCell: (params) => {
        if (params.value) {
          return "Si";
        } else {
          return "No";
        }
      },
    },
    {
      field: "posicionAbierta",

      headerName: "Open new?",
      width: 100,
      renderCell: (params) => {
        if (params.value) {
          return "Si";
        } else {
          return "No";
        }
      },
    },

    {
      field: "pendienteCambioPosicion",
      headerName: "Pendiente Cambio?",
      width: 150,
      renderCell: (params) => {
        return params.value ? "Si" : "No";
      },
    },
    {
      field: "importe",
      headerName: "$ Operacion",
      width: 110,
    },

    {
      field: "unRealizedProfit",
      headerName: "$ Ganancia",
      width: 100,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "porcentualGanancia",
      headerName: "% Ganancia",
      width: 100,
      renderCell: (params) => (params.value ? params.value.toFixed(2) : "-"),
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-angle-up",
    //   label: "Ir LONG",

    //   fn: (row) => {
    //     setSeleccion(row);
    //     setDataConsulta({
    //       url: "/api/trading/long",
    //       data: { ...row, evento: "long", token: `piteroski1984**` },
    //     });
    //   },
    // },
    // {
    //   esFuncion: true,
    //   icono: "fas fa-angle-down",
    //   label: "Ir SHORT",

    //   fn: (row) => {
    //     setSeleccion(row);
    //     setDataConsulta({
    //       url: "/api/trading/short",
    //       data: { ...row, evento: "short", token: `piteroski1984**` },
    //     });
    //   },
    // },
    {
      esFuncion: true,
      icono: "fas fa-database",
      label: "Registros",

      fn: (row) => {
        setSeleccion(row);
        setOpenTradings(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-redo",
      label: "Refresh Data",

      fn: (row) => {
        setSeleccion(row);
        setDataConsulta({
          url: "/api/trading/refreshData",
          data: { ...row, token: `piteroski1984**` },
        });
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-link",
      label: "Link Trading View",

      fn: (row) => {
        setSeleccion(row);
        setOpenLink(true);
      },
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12}>
        <TitulosFormularios
          icono="fas fa-dollar"
          subTitulo="estrategias"
          titulo="TRADING"
        />{" "}
      </Grid>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`estrategiasTrading`}
          columns={columns}
          acciones={acciones}
          order={order}
          callbackclick={callbackclick}
          icono={"fas fa-users"}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          titulo={``}
          Form={Form}
        />
      </Grid>
      <LinkTradingView row={seleccion} open={openLink} setOpen={setOpenLink} />
      <TradingsEstrategia
        row={seleccion}
        open={openTradings}
        setOpen={setOpenTradings}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
