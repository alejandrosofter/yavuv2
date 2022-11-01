import { pageScroll } from "@helpers/screen";
import {
  Backdrop,
  Button,
  Divider,
  Drawer,
  Grid,
  Icon,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ColeccionTable({
  coleccion,
  where,
  columns,
  orderBy,
  limit,
  acciones,
  getRowClassName,
  onSelectionModelChange,
  callbackclick,
  checkboxSelection,

  initialValuesChecks,
  callbackchangedata,
  rowsPerPage = 10,
  hidePaginador = false,
}) {
  const { data, mutate } = useCollection(coleccion, {
    revalidateOnFocus: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    refreshInterval: 0,
    where,
    limit: rowsPerPage,
    parseDates: [
      "fecha",
      "fechaVto",
      "fechaDesde",
      "fechaHasta",
      "fechaNacimiento",
      "fechaInicio",
      "fechaFin",
    ],
    orderBy,

    listen: true,
  });

  const [accionSeleccion, setAcccionSeleccion] = useState(null);
  const [rowSeleccion, setRowSeleccion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBtnMasResultados, setShowBtnMasResultados] = useState(false);
  const [selectionModel, setSelectionModel] = useState(
    initialValuesChecks ? initialValuesChecks : []
  );
  const [columnas, setColumnas] = useState([]);
  const clickMenu = ({ accion, params }) => {
    setRowSeleccion(params.row);
    setAcccionSeleccion(accion);
    if (accion.esFuncion) {
      accion.fn(params.row);
    } else
      router.push(accion.url, {
        shallow: true,
      });
  };
  const setInitial = () => {
    if (!localStorage.getItem(`id_table_state_${coleccion}`)) return;
    setLoading(true);
    fuego.db
      .collection(coleccion)
      .doc(localStorage.getItem(`id_table_state_${coleccion}`))
      .get()
      .then((refAfter) => {
        getRef()
          .startAfter(refAfter)
          .limit(rowsPerPage)
          .get()
          .then((d) => {
            const docs = [];
            d.docs.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
            mutate((state) => [...docs], false);
            setCurrentPage(
              Number(localStorage.getItem(`currentPage_${coleccion}`))
            );
            setShowBtnMasResultados(docs.length === rowsPerPage);
            setLoading(false);
          });
      });
  };

  useEffect(() => {
    // setInitial();
  }, []);
  useEffect(() => {
    if (callbackchangedata) callbackchangedata(data);
  }, [data]);
  useEffect(() => {
    const aux = columns;
    const actions = (params) => {
      let arr = [];
      if (acciones)
        acciones.map((accion) => {
          arr.push(
            accion.label === "" ? (
              <Divider />
            ) : (
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
            )
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
  }, [acciones, columns]);
  const cambiaSelectCheck = (ids) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = data.filter((row) =>
      selectedIDs.has(row.id.toString())
    );
    if (onSelectionModelChange) onSelectionModelChange(selectedRowData, ids);
    setSelectionModel(ids);
  };
  const clickProx = () => {
    localStorage.setItem(`currentPage_${coleccion}`, currentPage + 1);
    setCurrentPage(currentPage + 1);
    paginate();
  };
  const clickPrev = () => {
    if (currentPage > 0) {
      localStorage.setItem(`currentPage_${coleccion}`, currentPage - 1);
      setCurrentPage(currentPage - 1);
      paginate(true);
    }
  };
  // const cambiaPagina = async (e) => {
  //   setPaginaSeleccion(e.target.value);
  //   const ref = fuego.db.collection(coleccion);

  //   paginate();
  // };
  const saveState = async () => {
    localStorage.setItem(`id_table_state_${coleccion}`, data[0].id);
  };
  const getState = () => {
    return localStorage.getItem(`id_table_state_${coleccion}`);
  };
  const getRef = () => {
    const orderField = Array.isArray(orderBy) ? orderBy[0] : orderBy;
    const orderDirection = Array.isArray(orderBy) ? orderBy[1] : null;
    console.log(orderField, orderDirection);
    let ref = fuego.db
      .collection(coleccion)
      .orderBy(orderField, orderDirection ? orderDirection : "asc");
    ref = addsWheres(ref, where);
    return ref;
  };
  const addsWheres = (ref, where) => {
    if (!ref) return ref;
    if (where) {
      if (Array.isArray(where)) {
        where.map((w) => {
          ref = ref.where(w[0], w[1], w[2]);
        });
      } else {
        ref = ref.where(where[0], where[1], where[2]);
      }
    }
    return ref;
  };

  const paginate = async (atras, initialId) => {
    if (!data?.length) return;
    setLoading(true);
    let ref = getRef();
    if (atras) {
      ref = ref
        .endBefore(await fuego.db.collection(coleccion).doc(data[0].id).get())
        .limitToLast(rowsPerPage);
    } else {
      ref = ref
        .startAfter(
          await fuego.db
            .collection(coleccion)
            .doc(data[data.length - 1].id)
            .get()
        )
        .limit(rowsPerPage);
    }

    ref.get().then((d) => {
      const docs = [];
      d.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
      mutate((state) => [...docs], false);

      setLoading(false);
    });
    // mutate our local cache, adding the docs we just added
    // set revalidate to false to prevent SWR from revalidating on its own
  };

  const masResultados = async () => {
    if (!data?.length) return;
    setLoading(true);
    let ref = getRef();

    ref = ref
      .startAfter(
        await fuego.db
          .collection(coleccion)
          .doc(data[data.length - 1].id)
          .get()
      )
      .limit(rowsPerPage);

    ref.get().then((d) => {
      const docs = [];
      d.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
      mutate((state) => [...state, ...docs], false);
      setShowBtnMasResultados(docs.length === rowsPerPage);
      pageScroll();
      setLoading(false);
      // saveState();
    });
    // mutate our local cache, adding the docs we just added
    // set revalidate to false to prevent SWR from revalidating on its own
  };
  if (!data) return "Cargando...";
  //set container drawer mui

  return (
    <Grid spacing={2} container>
      <Grid item xs={10}></Grid>
      {/* {hidePaginador ? null : (
        <Grid item container spacing={0} xs={2}>
          <Grid item xs={5}>
            <IconButton
              disabled={currentPage <= 0}
              color="secondary"
              onClick={clickPrev}
              size="small"
              variant="outlined"
            >
              <Icon className="fas fa-arrow-left" />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            {currentPage + 1}
          </Grid>
          <Grid item xs={5}>
            <IconButton
              disabled={data.length < rowsPerPage}
              color="secondary"
              onClick={clickProx}
              size="small"
              variant="outlined"
            >
              <Icon className="fas fa-arrow-right" />
            </IconButton>
          </Grid>
        </Grid>
      )} */}

      <Grid sx={{ mb: 10 }} item xs={12}>
        <DataGrid
          autoHeight
          columns={columnas}
          rows={data ? data : []}
          rowsPerPageOptions={[]}
          hideFooter={true}
          showCellRightBorder={false}
          onFilterModelChange={(params) => {
            console.log(params);
          }}
          onSortModelChange={(params) => {
            console.log(params);
          }}
          disableSelectionOnClick
          getRowClassName={getRowClassName}
          onSelectionModelChange={cambiaSelectCheck}
          checkboxSelection={checkboxSelection}
          selectionModel={selectionModel}
          onRowClick={(params) => {
            if (callbackclick) callbackclick(params);
          }}
        />
      </Grid>
      <div id="finGrid" />
      {hidePaginador ? null : (
        <Drawer
          sx={{ zIndex: 300 }}
          variant="persistent"
          anchor={"bottom"}
          open={true}
        >
          {showBtnMasResultados && (
            <Button
              size="small"
              sx={{ display: "flex" }}
              variant="outlined"
              onClick={masResultados}
            >
              Mas resultados...
            </Button>
          )}
        </Drawer>
      )}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />
    </Grid>
  );
}
