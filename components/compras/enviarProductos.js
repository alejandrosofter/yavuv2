import ABMColeccion from "@components/forms/ABMcollection";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { Button, Grid, Icon } from "@mui/material";
import { useRouter } from "next/router";
import Form from "./_formStock";
import Modelo, { valoresIniciales } from "../../modelos/ModeloCompras";
import { formatMoney } from "@helpers/numbers";
import { useState } from "react";
import { QueryApi } from "@helpers/queryApi";
import ConfirmDialog from "@components/forms/confirmDialog";

export default function EnviarProductos({ mod }) {
  const router = useRouter();
  const [dataConsulta, setDataConsulta] = useState();
  const [openConfirmaAdd, setOpenConfirmaAdd] = useState();
  const [openConfirmaMinus, setOpenConfirmaMinus] = useState();
  const { idItem } = router.query;

  const columns = [
    {
      field: "cantidad",
      headerName: "Cantidad",
      editable: false,
      width: 100,
    },

    {
      field: "detalle",
      headerName: "Detalle",
      editable: false,
      width: 380,
    },
    {
      field: "importe",
      headerName: "$ Compra",
      width: 80,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "importeFlete",
      headerName: "$ Flete Unidad",
      width: 130,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "importeVenta",
      headerName: "$ Venta",
      width: 80,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "label_idCategoriaProducto",
      headerName: "Caetgoria",
      width: 150,
      renderCell: (params) =>
        `${
          params.row.label_idCategoriaProducto
            ? params.row.label_idCategoriaProducto
            : "-"
        }`,
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Inscriptos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenInscriptos(true);
    //   },
    // },
  ];
  const agregarStock = () => {
    setOpenConfirmaAdd(false);
    setDataConsulta({ url: "/api/compras/agregarStock", data: { idItem } });
  };
  const descontarStock = () => {
    setOpenConfirmaMinus(false);
    setDataConsulta({ url: "/api/compras/descontarStock", data: { idItem } });
  };
  const traerItems = () => {
    setDataConsulta({ url: "/api/compras/traerItems", data: { idItem } });
  };
  return (
    <Grid spacing={1} container>
      <Grid item xs={6}>
        <TitulosFormularios titulo={mod.label} subTitulo="Enviar Productos" />
      </Grid>
      <Grid item xs={1}>
        <Button
          title="Agregar Stock"
          variant="contained"
          sx={{ bgcolor: "green" }}
          onClick={() => setOpenConfirmaAdd(true)}
        >
          <Icon className="fas fa-cart-plus" />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          title="Descontar Stock"
          variant="contained"
          sx={{ bgcolor: "red" }}
          onClick={() => setOpenConfirmaMinus(true)}
        >
          <Icon className="fas fa-cart-arrow-down" />
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          title="Traer items del comprobante"
          variant="contained"
          color="secondary"
          onClick={traerItems}
        >
          <Icon className="fas fa-sync" />
        </Button>
      </Grid>
      <Grid item md={12}>
        <ABMColeccion
          coleccion={`compras/${idItem}/productosVenta`}
          columns={columns}
          acciones={acciones}
          order={"detalle"}
          maxWidth={"lg"}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          Form={Form}
        />
      </Grid>
      <QueryApi dataConsulta={dataConsulta} />
      <ConfirmDialog
        mensaje={"Esta seguro de AGREGAR los productos a su stock?"}
        callbacksuccess={agregarStock}
        open={openConfirmaAdd}
        setOpen={setOpenConfirmaAdd}
      />
      <ConfirmDialog
        mensaje={"Esta seguro de DESCONTAR los productos de stock?"}
        callbacksuccess={descontarStock}
        open={openConfirmaMinus}
        setOpen={setOpenConfirmaMinus}
      />
    </Grid>
  );
}
