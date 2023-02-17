import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Icon, Typography, Button, Grid, Stack } from "@mui/material/";
import { useRouter } from "next/router";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getLinkUrl } from "../../../helpers/Strings";
import Dialogo from "../dialogo";
import DialogContenido from "../dialogContenido";
import Fetcher from "../../../helpers/Fetcher";
import { cantidadColeccion, getPrimeroPagina } from "../../../config/db";
import { useCollection, deleteDocument, fuego } from "@nandorojo/swr-firestore";

import FormBuscador from "../inputBuscador";
import TitulosFormularios from "../tituloFormularios";
import NuevoGenerico from "@components/NuevoGenerico";
export default function DgFirebaseABM({
  where,
  FormNew,
  hideTitle,
  hideSearchBox,
  allUsers,
  coleccion,
  titulo,
  subTitulo,
  icono,
  pageSize,
  orderBy,
  limit,
  columns,
  acciones,
}) {
  const auxWhere = (
    allUsers ? [] : ["idUsuario", "==", fuego.auth().currentUser?.uid]
  ).concat(where);

  const [filtro, setFiltro] = useState({
    where: auxWhere,
    limit: limit,
    orderBy: orderBy,
    startAt: null,
    endAt: null,
    listen: true,
  });

  const { data: datos, update, error } = useCollection(coleccion, filtro);

  const router = useRouter();
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: pageSize ? pageSize : 5,
    loading: false,
  });

  const pagesNextCursor = React.useRef({});
  const [columnas, setColumnas] = useState([]);
  const [contadorTotalRegistros, setContadorTotalRegistros] = useState(0);
  // const [rows, setRows] = React.useState([]);

  const [rtaServer, setRtaServer] = useState("");
  const [openRta, setOpenRta] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [accionSeleccion, setAcccionSeleccion] = useState(null);
  const [data, setData] = useState(null);
  const [cantidadPaginas, setCantidadPaginas] = useState(10);
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    const busca = async () => {
      // const cant=await cantidadColeccion({coleccion})
      // setCantidadPaginas(Math.floor(cant/limit))
    };
    busca();
  }, []);
  useEffect(() => {
    const clickMenu = ({ accion, params }) => {
      setData(params.row);
      setAcccionSeleccion(accion);
      if (accion.esFuncion) {
        setdialog(true);
      } else
        router.push(getLinkUrl(accion.url, {}, params.row), undefined, {
          shallow: true,
        });
    };
    const aux = columns;
    const actions = (params) => {
      let arr = [];
      acciones.map((accion) => {
        if (accion.esRegistro)
          arr.push(
            <GridActionsCellItem
              icon={
                <Icon
                  sx={{ color: accion.color }}
                  fontSize="10"
                  className={accion.icono}
                />
              }
              label={
                <Typography color={accion.color}>{accion.label}</Typography>
              }
              onClick={clickMenu.bind(this, { accion, params })}
              showInMenu
            />
          );
      });

      return arr;
    };
    aux.push({
      field: "actions",
      type: "actions",
      width: 70,
      getActions: actions,
    });
    setColumnas(aux);
  }, [acciones, columns, router]);

  //FUNCIONES CALL DESDE INTERFAZ con EVAL
  const quitar = async (id) => {
    deleteDocument(`${coleccion}/${id}`);
  };
  const clickAgregar = () => {
    setOpenNew(true);
  };
  //********************************/
  const clickAceptaMenu = async (e) => {
    const res = eval(accionSeleccion.method);

    if (res) {
      setRtaServer(JSON.stringify(res));
      setOpenRta(false);
    }
  };

  const cambiaBuscador = (tx) => {
    // const startDoc =datos? datos[datos.length - 1].__snapshot:null
    if (tx !== "") {
      let aux = {
        startAt: tx,
        limit: limit,
        orderBy: orderBy,
        endAt: tx + "\uf8ff",
      };
      setFiltro(aux);
    } else {
      setFiltro({ limit: limit, orderBy: orderBy, startAt: null, endAt: null });
    }
  };

  const actualizaRegistros = async (pagina) => {
    const primero = await getPrimeroPagina({ coleccion, filtro, pagina });
    let aux = {
      limit: limit,
      orderBy: orderBy,
      startAt: tx,
      endAt: tx + "\uf8ff",
    };
    setFiltro(aux);
  };
  const cargoNuevo = () => {
    setOpenNew(false);
  };
  const marks = [
    {
      value: 0,
      label: "Primera",
    },

    {
      value: cantidadPaginas,
      label: "Ultima",
    },
  ];
  if (!fuego.auth().currentUser) return "Sin login";
  if (error) return `${error}`;
  if (!datos) return "cargando...";

  return (
    <div style={{ height: screen.height - 300, width: "100%" }}>
      <Stack direction="row">
        {!hideTitle && (
          <Grid item flex={1}>
            <TitulosFormularios
              titulo={titulo}
              subTitulo={subTitulo}
              icono={icono}
            />
          </Grid>
        )}
        {!hideSearchBox && (
          <Grid item>
            <FormBuscador fnCambia={cambiaBuscador} label="Buscar" />
          </Grid>
        )}
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack flex={1} direction="row" spacing={1}>
          <Typography variant="h5"> {titulo}</Typography>
          <Icon className={icono} />
        </Stack>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={clickAgregar}
        >
          <Icon className={"fas fa-plus"}></Icon> AGREGAR
        </Button>
      </Stack>
      <DataGrid
        hideFooterPagination={true}
        columns={columnas}
        rows={datos ? datos : []}
        pagination
        rowCount={contadorTotalRegistros}
        {...rowsState}
        paginationMode="server"
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
      />

      <Dialogo
        open={dialog}
        icon="fas fa-exclamation-triangle"
        setOpen={setdialog}
        titulo=""
        detalle="Realmente deseas realizar esta operacion?"
        callbackAcepta={clickAceptaMenu}
      />
      <DialogContenido titulo="Rta Server" open={openRta} setOpen={setOpenRta}>
        {rtaServer}
      </DialogContenido>
      <DialogContenido
        maxWidth={"md"}
        fullWidth={true}
        titulo="NUEVO"
        open={openNew}
        setOpen={setOpenNew}
      >
        {React.cloneElement(FormNew, { callbackSuccess: cargoNuevo })}
      </DialogContenido>
    </div>
  );
}
