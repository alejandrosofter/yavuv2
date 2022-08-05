import { useState, useCallback } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";

import {
  Button,
  Stack,
  Icon,
  Grid,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import ImpresionDialog from "@components/forms/impresion";

import { formatMoney } from "@helpers/numbers";
import { useRouter } from "next/router";
import ColeccionTable from "@components/forms/coleccionTable";

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

  const clickImprimir = useCallback(
    (data) => () => {
      setDatosClick(data);
      setOpenImpresion(new Date().getTime()); //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
    },
    []
  );
  console.log(`idDebito: ${idDebito}`);
  return (
    <Grid container>
      <Grid item md={12}>
        <ColeccionTable
          columns={columns}
          coleccion={`debitoAutomatico/${idDebito}/deudas`}
        />
      </Grid>
    </Grid>
  );
}
