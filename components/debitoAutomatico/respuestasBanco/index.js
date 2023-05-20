import { useState, useCallback } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { Icon, Grid } from "@mui/material";

import { formatMoney } from "@helpers/numbers";

import { useRouter } from "next/router";
import ListadoRespuestasBanco from "./_listadoRespuestasBancos";
import ListadoItemsBanco from "./_listadoItemsRespuestaBancos";
import { QueryApi } from "@helpers/queryApi";

export const columns = [
  {
    field: "titular",
    headerName: "Cuenta Banco",
    width: 250,
    renderCell: (params) => params.value,
  },
  {
    field: "label_socio",
    headerName: "Socio",
    width: 250,
  },

  {
    field: "importe",
    headerName: "$ Importe",
    width: 110,
    renderCell: (params) => `${formatMoney(params.value)}`,
  },
  {
    field: "importeBonificado",
    headerName: "$ Bonif.",
    width: 110,
    renderCell: (params) => formatMoney(params.value),
  },
  {
    field: "cbu",
    headerName: "CBU/CVU",
    width: 165,
    renderCell: (params) => params.value,
  },
];
export default function CuentaSocio({}) {
  const router = useRouter();
  const idDebito = router.query.idItem;
  const [respuestaBanco, setRespuestaBanco] = useState(null);
  const accionesExtra = (params) => {
    return [
      <GridActionsCellItem
        key={params.row.id}
        icon={<Icon fontSize="10" className="fas fa-print" />}
        label="imprimir"
        onClick={clickImprimir(params.row)}
        showInMenu
      />,
    ];
  };

  const successQuery = (data) => {};
  return (
    <Grid container>
      <Grid item md={3}>
        <ListadoRespuestasBanco
          callbackcambia={(item) => setRespuestaBanco(item)}
          idDebito={idDebito}
        />
      </Grid>
      <Grid item md={9}>
        <ListadoItemsBanco
          respuestaBanco={respuestaBanco}
          idDebito={idDebito}
        />
      </Grid>
    </Grid>
  );
}
