import { useEffect, useState } from "react";

import useLayout from "@hooks/useLayout";
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import AcordeonForm from "@components/forms/acordeon";
import { useCollection, useCollectionGroup } from "@nandorojo/swr-firestore";
import FacturacionPendiente from "@components/facturadorPacientes/pendientes";
import { groupBy } from "@helpers/arrays";
import { formatMoney } from "@helpers/numbers";
import ListadoFacturacionOs from "@components/facturadorPacientes/listado";
import OrdenDelDia from "@components/facturadorPacientes/ordenDelDia";

import ConfirmDialog from "@components/forms/confirmDialog";
import { QueryApi } from "@helpers/queryApi";
import { CerrarFacturacionDialog } from "@components/facturadorPacientes/cerrarFacturacion";

export default function Modulo({}) {
  const { data } = useCollection("recetasFacturacion", {
    where: [["estado", "==", "PENDIENTE"]],
    listen: true,
  });
  useLayout({
    label: "Facturacion Pendiente",
    titulo: "FACTURACION Pendiente",
    acciones: [
      {
        label: `facturacion`,
        icono: "fas fa-file-invoice-dollar",
        url: `/facturacion`,
      },
      {
        label: "Liquidaciones",
        icono: "fas fa-money-check",
        url: "/liquidaciones",
      },
      {
        label: "Reportes",
        icono: "fas fa-receipt",
        url: "/reporte",
      },
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    ],
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          FACTURACION{" "}
          <Typography variant="caption">ENTES FACTURADORES</Typography>
        </Typography>
      </Grid>
      <DataviewFacturacion data={data} />
    </Grid>
  );
}
export function DataviewFacturacion({
  data,
  hideCerrar,
  hideOrden,
  titleItems,
}) {
  const [dataSelect, setDataSelect] = useState([]);
  const [openConfirmCerrar, setConfirmCerrar] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const [osSelect, setOsSelect] = useState();
  const [selectCerrar, setSelectCerrar] = useState();
  const [refreshVal, setRefreshVal] = useState(0);

  useEffect(() => {
    if (data) {
      let group = groupBy(
        data,
        (item) => {
          return item.label_idEnteFacturador;
        },
        true
      );
      let aux = [];

      for (const [key, value] of Object.entries(group)) {
        const importe = value.reduce(
          (n, p) => n + Number(p.importe ? p.importe : 0),
          0
        );
        const idEnteFacturador =
          value[0] && value[0].idEnteFacturador
            ? value[0].idEnteFacturador
            : null;
        const color = value[0] && value[0].color ? value[0].color : null;
        aux.push({
          id: key,
          idEnteFacturador,
          color,
          importe,
          titulo:
            !key || key == "undefined"
              ? `Sin ente facturador (${value.length}) $ ${formatMoney(
                  importe
                )}`
              : `${key} (${value.length})  $ ${formatMoney(importe)}`,
          children: (
            <FacturacionPendiente
              clickItem={clickItem}
              onCerrar={onCerrar}
              hideCerrar={hideCerrar}
              idEnteFacturador={idEnteFacturador}
              data={value}
            />
          ),
        });
      }

      setDataConsulta(aux);

      //   for (let i = 0; i < data.length; i++) {
      //     //vista que contiene las practicas pendientes
      //     const children = <FacturacionPendiente enteFacturador={data[i]} />;
      //     aux.push({ id: data[i].id, titulo: data[i].nombre, children });
      //     setDataConsulta(aux);
      //   }
    }
  }, [data, refreshVal]);
  const onCerrar = (item, idEnteFacturador) => {
    setSelectCerrar({ item, idEnteFacturador });
    setConfirmCerrar(true);
  };
  const refresh = () => {
    setTimeout(() => {
      console.log(`refrescanbdo`, osSelect);
      clickItem(osSelect);
    }, 1000);
  };
  const clickItem = (item) => {
    if (!item) {
      console.log(`no hay item`);
      return;
    }
    setOsSelect(item);
    reloadOs(item);
  };

  const reloadOs = (item) => {
    const data = item?.valores ? item?.valores : [];
    setDataSelect(data.sort((a, b) => b.fecha_timestamp - a.fecha_timestamp));
  };
  const changeData = (dataDelete, dataOsSElect) => {
    // reloadOs(osSelect);
  };
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={3}>
        <AcordeonForm data={dataConsulta} />
        {!hideOrden && (
          <Grid item md={12}>
            <Typography
              sx={{ p: 4, color: "red", fontWeight: "bold" }}
              variant="h6"
            >
              TOTAL PENDIENTE
              {formatMoney(
                dataConsulta?.reduce(
                  (n, p) => n + Number(p.importe ? p.importe : 0),
                  0
                )
              )}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid item xs={7 + (hideCerrar ? 2 : 0)}>
        {titleItems}
        <ListadoFacturacionOs
          osSelect={osSelect}
          changeData={changeData}
          dataSelect={dataSelect}
          refresh={refresh}
        />
      </Grid>
      {!hideOrden && (
        <Grid item xs={2}>
          <OrdenDelDia />
        </Grid>
      )}
      {!hideCerrar && (
        <CerrarFacturacionDialog
          open={openConfirmCerrar}
          setOpen={setConfirmCerrar}
          data={selectCerrar}
        />
      )}

      {/* <ConfirmDialog
        open={openConfirmCerrar}
        setOpen={setConfirmCerrar}
        titulo="Cerrar receta"
        mensaje="¿Desea cerrar este Ente Facturador?"
        callbacksuccess={confirmCerrar}
      /> */}
    </Grid>
  );
}
