import { useState, useCallback } from "react";

import moment from "moment";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { Icon } from "@mui/material";
import SubColeccionColeccion from "@components/forms/subColeccion/";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import { formatMoney } from "../../../helpers/numbers";
import ImpresionDialog from "@components/forms/impresion";
import {
  ModeloMovimientoCuenta,
  valoresInicialesMovimiento,
} from "../../../modelos/ModeloSocios";
import ImpresionMovimientoCuenta from "./impresion";
import { useRouter } from "next/router";

export default function MovimientosCuentaSocio({ mod, data, token }) {
  const router = useRouter();
  const campo = "movimientosCuenta";
  const idMod = router.query.id;
  const labelCampo = "MOVIMIENTOS CUENTA";
  const icono = "fas fa-file-invoice-dollar";
  const pathForm = "socios/movimientosCuenta/_formMovimientoCuenta";
  const urlAcepta = `/api/socios/abmItem?subColeccion=${campo}&idMod=${idMod}`;
  const [datosClick, setDatosClick] = useState();
  const [openImpresion, setOpenImpresion] = useState();

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

  const fnRender = (row) => {
    let sal = "";
    if (row.itemsTipos)
      row.itemsTipos.map((item) => {
        if (item.label_tipo)
          sal += `${item.label_tipo} (${formatMoney(item.importe)})`;
      });
    if (sal == "") return "-";
    return sal;
  };
  const renderImporte = (row) => {
    let total = 0;
    if (row.itemsTipos)
      row.itemsTipos.map((item) => {
        if (item.importe) total += Number(item.importe);
      });
    return formatMoney(total);
  };
  const clickImprimir = useCallback(
    (data) => () => {
      setDatosClick(data);
      setOpenImpresion(new Date().getTime()); //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
    },
    []
  );

  const cols = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      type: "date",
      valueGetter: (params) => {
        const d = new Date(params.value.seconds * 1000);

        return moment(d).format("DD/MM/YY");
      },

      // renderCell: (params) => {
      //   const d=new Date(params.value.seconds * 1000);

      //   return( //en params.row tengo los otros datos
      //     <i>{`${moment(d).format('DD/MM/YY')}`}</i>
      // )
      // }
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 350,
      renderCell: (params) => renderCellExpandData(params, fnRender),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
      // renderCell:(params) =>renderCellExpandData(params,fnRender)
    },
    {
      field: "importe",
      headerName: "$ TOTAL",
      width: 90,
      renderCell: (params) => renderImporte(params.row),
    },
  ];
  return (
    <div>
      <SubColeccionColeccion
        fullWidth={true}
        maxWidth="lg"
        mod={mod}
        sortModel={[{ field: "fecha", sort: "desc" }]}
        campoId="_id"
        accionesExtra={accionesExtra}
        token={token}
        modelo={ModeloMovimientoCuenta}
        valoresIniciales={valoresInicialesMovimiento}
        urlAcepta={urlAcepta}
        titulo={`${labelCampo}`}
        pathFormulario={pathForm}
        columns={cols}
        registro={data}
        campo={campo}
        icono={`${icono}`}
      />
      <ImpresionDialog
        titulo="IMPRESION DE MOVIMIENTO DE CUENTA"
        abrir={openImpresion}
        datos={datosClick}
        ComponenteItem={ImpresionMovimientoCuenta}
      />
    </div>
  );
}
