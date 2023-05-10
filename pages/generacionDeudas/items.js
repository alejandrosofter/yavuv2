import ColeccionTable from "@components/forms/coleccionTable";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import DialogContenido from "@components/forms/dialogContenido";
import { getFechaString } from "@helpers/dates";
import { getModUsuario } from "@helpers/db";
import { formatMoney } from "@helpers/numbers";

import { Grid, Tooltip, Icon, Typography } from "@mui/material";

import { useRouter } from "next/router";
export default function ItemsGeneracionDeuda({ open, setOpen, generacion }) {
  const order = ["label_socio", "asc"];
  const router = useRouter();
  const modSocios = getModUsuario("socios");
  const callbackclick = (data) => {};
  const cols = [
    {
      field: "observacion",
      headerName: "",
      width: 0,
      renderCell: (params) =>
        params.value !== "" ? (
          <Icon
            title={`${params.value}`}
            className="fas fa-exclamation-circle"
          />
        ) : (
          ""
        ),
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={`CON VTO el ${getFechaString(params.row.fechaVto)}`}>
            <Typography>{`${getFechaString(params.row.fecha)}`}</Typography>
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      field: "label_socio",
      headerName: "Socio",
      width: 150,
      renderCell: (params) => (
        <Typography
          onClick={clickSocio.bind(this, params.row)}
          variant="caption"
          key={params.row.idSocio}
        >
          <a href={`#${params.row.id}`} id={params.row.id}>
            {params.value}
          </a>
        </Typography>
      ),
    },
    {
      field: "esPorDebitoAutomatico",
      headerName: "",
      width: 0,
      renderCell: (params) =>
        params.value ? (
          <Icon
            title={`${
              params.row.estadoDebito ? params.row.estadoDebito : "Sin novedad"
            }`}
            className="fas fa-credit-card"
          />
        ) : (
          ""
        ),
    },
    {
      field: "titular",
      headerName: "Titular Debito",
      width: 250,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.value ? params.value : "-"} -{" "}
          {params.row.label_tipoCuenta ? params.row.label_tipoCuenta : "-"}
        </Typography>
      ),
    },
    {
      field: "label_idProducto",
      headerName: "Servicio/Producto",
      width: 165,
      renderCell: (params) =>
        renderCellExpandData(
          params,
          (row) => `${row.label_idProducto} ${row.detalle ? row.detalle : ""}`
        ),
    },

    {
      field: "importe",
      headerName: "$ Importe",
      width: 90,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "importeBonificacion",
      headerName: "$ BONIF.",
      width: 90,
      renderCell: (params) => formatMoney(params.value ? params.value : 0),
    },
    {
      field: "total",
      headerName: "$ TOTAL",
      width: 90,
      renderCell: (params) => {
        const importe =
          (params.row.importe ? params.row.importe : 0) -
          (params.row.importeBonificacion ? params.row.importeBonificacion : 0);
        return formatMoney(importe);
      },
    },
  ];
  const clickSocio = (row) => {
    localStorage.setItem(
      "socioSeleccion",
      JSON.stringify({
        objectID: row.idSocio,
        apellido: row.apellido,
        nombre: row.nombre,
        dni: row.dni,
      })
    );
    //open new tab
    router.push("/mod/[id]", `/mod/${modSocios.id}`, {
      shallow: true,
    });
  };

  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="lg"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={9}>
          <Typography variant="h6" gutterBottom>
            {`GENERACION DE DEUDA / Deudas`}
          </Typography>
        </Grid>

        <Grid item md={12}>
          <ColeccionTable
            callbackclick={callbackclick}
            columns={cols}
            orderBy={order}
            coleccion={`/generacionDeudas/${generacion?.id}/deudas`}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
