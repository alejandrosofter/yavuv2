import { useEffect, useMemo, useState } from "react";

import useLayout from "@hooks/useLayout";
import {
  Backdrop,
  CircularProgress,
  Grid,
  ListItemIcon,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AcordeonForm from "@components/forms/acordeon";
import {
  useCollection,
  useCollectionGroup,
  useDocument,
} from "@nandorojo/swr-firestore";
import FacturacionPendiente from "@components/facturadorPacientes/pendientes";
import { groupBy } from "@helpers/arrays";
import { formatMoney } from "@helpers/numbers";
import ListadoFacturacionOs from "@components/facturadorPacientes/listado";
import OrdenDelDia from "@components/facturadorPacientes/ordenDelDia";

import ConfirmDialog from "@components/forms/confirmDialog";
import { QueryApi } from "@helpers/queryApi";
import { CerrarFacturacionDialog } from "@components/facturadorPacientes/cerrarFacturacion";
import { useRouter } from "next/router";
import ListaSimple from "@components/forms/listaSimple";
import { getFechaString } from "@helpers/dates";
import MaterialReactTable from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import EditFacturacionItem from "@components/facturadorPacientes/edit";

export default function Modulo({}) {
  const order = ["fecha", "desc"];
  const [dataConsulta, setDataConsulta] = useState();
  const [dataSelect, setDataSelect] = useState([]);
  const [openConfirmCerrar, setConfirmCerrar] = useState(false);
  const router = useRouter();
  const [osSelect, setOsSelect] = useState();
  const [dataItems, setDataItems] = useState([]);

  const { data, update } = useDocument(
    `recetasLiquidaciones/${router.query.id}`,
    {
      listen: true,
    }
  );
  useEffect(() => {
    if (data) {
      setDataItems(data.items);
    }
  }, [data]);

  const onChangeData = (newData, isDelete) => {
    console.log(`CAMBIO DATA!`, newData);
    const items = data.items
      .map((item) => {
        if (item.id === newData.id) {
          if (isDelete) return null;
          return newData;
        }
        return item;
      })
      .filter((item) => item !== null);

    const dataUpdate = {
      ...data,
      items,
    };
    // console.log("OLD DATA:", data);
    console.log("NEW DATA:", dataUpdate);
    delete dataUpdate.__snapshot;
    update(dataUpdate);
  };

  // useEffect(() => {
  //   if (data) {
  //     let group = groupBy(
  //       data.items,
  //       (item) => {
  //         return item.label_obraSocial;
  //       },
  //       true
  //     );
  //     let aux = [];

  //     for (const [key, value] of Object.entries(group)) {
  //       const importeTotal = value.reduce(
  //         (n, p) => n + Number(p.importe ? p.importe : 0),
  //         0
  //       );
  //       const label_obraSocial = key;
  //       const obraSocial = value[0]?.obraSocial;

  //       aux.push({
  //         id: obraSocial,
  //         label_obraSocial,
  //         obraSocial,
  //         importeTotal,
  //         titulo:
  //           !key || key == "undefined"
  //             ? `Sin O.S(${value.length}) $ ${formatMoney(importeTotal)}`
  //             : `${key} (${value.length})  $ ${formatMoney(importeTotal)}`,
  //         children: (

  //         ),
  //       });
  //     }

  //     setDataConsulta(aux);

  //     //   for (let i = 0; i < data.length; i++) {
  //     //     //vista que contiene las practicas pendientes
  //     //     const children = <FacturacionPendiente enteFacturador={data[i]} />;
  //     //     aux.push({ id: data[i].id, titulo: data[i].nombre, children });
  //     //     setDataConsulta(aux);
  //     //   }
  //   }
  // }, [data]);
  useLayout({
    label: "Detalle Liquidacion",
    titulo: "Detalle Liquidacion",
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
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    ],
  });
  if (!data) return "";
  return (
    <Grid container sx={{ p: 2 }} rowSpacing={2} spacing={2}>
      <Grid item xs={3}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }} variant="h4">
            LISTADO O.S
            <Typography variant="caption">{data?.detalle}</Typography>
          </Typography>
        </Grid>
      </Grid>
      <DetalleOsLiquidacion data={dataItems} changeData={onChangeData} />
      {/* <CerrarFacturacionDialog
        open={openConfirmCerrar}
        setOpen={setConfirmCerrar}
        data={selectCerrar}
      /> */}
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
export function DetalleOsLiquidacion({ data, changeData }) {
  //   const order = ["fecha", "desc"];
  const [dataOs, setDataOs] = useState([]);
  const [selected, setSelected] = useState();
  //   const { data } = useCollection("recetasFacturacion", {
  //     where: [
  //       ["estado", "==", "PENDIENTE"],
  //       ["idEnteFacturador", "==", enteFacturador.id],
  //     ],
  //   });

  useEffect(() => {
    if (data) {
      const dataGroup = groupBy(data, (item) => item.label_obraSocial, true);
      const arrGroup = Object.entries(dataGroup);
      setDataOs(
        arrGroup.map((item) => ({
          nombre: item[0],
          id: `ID_${item[0]}`,
          cantidad: item[1].length,
          valores: item[1],
          importe: item[1].reduce((n, p) => n + Number(p.importe ?? 0), 0),
        }))
      );
    }
  }, [data]);
  const clickItem = (item) => {
    console.log(item);
    if (!item) {
      console.log(`no hay item`);
      return;
    }
    setSelected(item);
  };

  return (
    <Grid container spacing={0}>
      {/* <Grid sx={{ p: 0, m: 0 }} item md={12}>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={onCerrar?.bind(this, data, idEnteFacturador)}
          >
            <LockOpenOutlined />{" "}
            <Typography variant=" caption">cerrar facturacion </Typography>
          </Button>
        </Stack>
      </Grid> */}
      <Grid item md={3}>
        <ListaSimple
          items={dataOs}
          label="LISTADO O.S"
          onClick={clickItem}
          fnRender={(item) => (
            <Stack direction={"row"} spacing={1}>
              <Typography color={item.color} variant="h6">
                {`${item.nombre}  `}
              </Typography>
              <Typography color={item.color} variant="caption">
                {`(${item.cantidad})`}
              </Typography>
              <Typography color={item.color} variant="body">
                {`${formatMoney(item.importe)}`}
              </Typography>
            </Stack>
          )}
        />
      </Grid>
      <Grid item md={9}>
        <Typography variant="h4">{selected?.nombre}</Typography>
        <ItemsObraSocial changeData={changeData} data={selected?.valores} />
      </Grid>
    </Grid>
  );
}
export function ItemsObraSocial({ data, changeData }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [select, setSelect] = useState({});
  const onEdit = (aux) => {
    // const newData = data.map((item) => {
    //   if (item.id === aux.id) {
    //     item = aux;
    //   }
    //   return item;
    // });
    if (changeData) changeData(aux);
  };
  const callbackAcepta = () => {
    setOpenConfirm(false);
    // const newData = data.filter((item) => item.id !== select.id);
    if (changeData) changeData(select, true);
    // setData(newData);
    // if (changeData) changeData(select, osSelect);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "fecha_timestamp",
        header: "Fecha",
        size: 80,
        accessorFn: (row) => {
          const fecha = new Date(row.fecha_timestamp);
          return getFechaString(fecha, "DD/MM | HH:mm");
        },
      },
      {
        accessorKey: "paciente",
        header: "Paciente",
        size: 135,
        accessorFn: (row) =>
          `${row.paciente?.apellido}, ${row.paciente?.nombre}`,
        Cell: ({ cell }) => (
          <Tooltip title={cell.row.original.nroAfiliado}>
            <span>{`${cell.row.original.paciente?.apellido}, ${cell.row.original.paciente?.nombre}`}</span>
          </Tooltip>
        ),
      },

      {
        accessorKey: "codigo",
        header: "Codigo",
        size: 60,
        filterVariant: "autocomplete",
        accessorFn: (row) => `${row.codigo}`,
        Cell: ({ cell }) => (
          <Tooltip title={cell.row.original.label_idPrestacion}>
            <span>{cell.row.original.codigo}</span>
          </Tooltip>
        ),
      },
      {
        accessorKey: "cantidad",
        header: "Cant.",
        size: 60,
        // accessorFn: (row) => `${formatMoney(row.importe)}`,
      },
      {
        accessorKey: "importe",
        header: "Importe",
        filterVariant: "autocomplete",
        size: 60,
        accessorFn: (row) => `${formatMoney(row.importe)}`,
      },
      {
        accessorKey: "observaciones",
        header: "Observaciones",
        size: 150,
        accessorFn: (row) => `${row.observaciones}`,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 80,
        accessorFn: (row) => `${row.estado}`,
      },
    ],
    []
  );
  if (!data)
    return <Typography variant="h6">No se encontraron items</Typography>;
  return (
    <Grid container>
      <Grid item md={12}>
        <MaterialReactTable
          enableRowActions
          initialState={{ showColumnFilters: true }}
          // enableRowSelection
          positionActionsColumn="last"
          renderRowActionMenuItems={({ closeMenu, row }) => [
            <MenuItem
              key={0}
              onClick={() => {
                setSelect(row.original);
                closeMenu();
                setOpenEdit(true);
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Editar
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => {
                // setOpenConfirm(true);
                // setSelect(row.original);
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Quitar
            </MenuItem>,
          ]}
          columns={columns}
          data={data}
        />
      </Grid>
      <EditFacturacionItem
        open={openEdit}
        setOpen={setOpenEdit}
        data={select}
        onEdit={onEdit}
      />
      <ConfirmDialog
        mensaje={"Estas seguro/a de quitar este item de factura?"}
        open={openConfirm}
        setOpen={setOpenConfirm}
        callbacksuccess={callbackAcepta}
      />
    </Grid>
  );
}
