import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button, Grid, Icon } from "@mui/material";
import { useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import Dialogo from "../dialogo";

import { useDocument } from "@nandorojo/swr-firestore";

import FormItem from "./_formItem";
import { getIndexItemArray } from "../../../helpers/arrays";
export default function Modulo({
  sortModel,
  maxWidth,
  fullWidth,
  mod,
  callbackSuccess,
  titulo,
  accionesExtra,
  icono,
  registro,
  campo,
  columns,
  auth,
  callbackchange,
  labelAgregar,
  pathFormulario,
  getRowClassName,
  modelo,
  valoresIniciales,
  coleccion,
}) {
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [openDialogQuita, setOpenDialogQuita] = useState(false);
  const [seleccionGrid, setSeleccionGrid] = useState();
  const [columnas, setColumnas] = useState();

  const { update } = useDocument(`${coleccion}/${registro.id}`, {
    listen: true,
  });

  useEffect(() => {
    const aux = columns;
    const acciones = (params) => {
      let arr = [
        <GridActionsCellItem
          key={params.row.id}
          icon={
            <Icon
              sx={{ color: "red" }}
              fontSize="10"
              className="fas fa-trash"
            />
          }
          label={<Typography color="red">Quitar</Typography>}
          onClick={clickQuitar(params.row)}
          showInMenu
        />,

        <GridActionsCellItem
          key={params.row.id}
          icon={<Icon fontSize="10" className="fas fa-pencil" />}
          label="Modificar"
          onClick={clickEditar(params.row)}
          showInMenu
        />,
      ];

      if (accionesExtra) {
        const extra = accionesExtra(params);
        extra.map((item) => {
          arr.push(item);
        });
      }

      return arr;
    };
    aux.push({
      field: "actions",
      type: "actions",
      width: 70,
      getActions: acciones,
    });
    setColumnas(aux);
  }, [accionesExtra, clickEditar, clickQuitar, columns]);

  const clickAgregar = (e) => {
    setMostrarNuevo(true);
  };
  const clickEditar = useCallback(
    (data) => () => {
      setSeleccionGrid(data);
      setMostrarEditar(true);
    },
    []
  );
  const callbackElimina = async () => {
    // const res=await Fetch(urlAcepta,"DELETE",seleccionGrid,token)

    const i = getIndexItemArray({
      data: registro[campo],
      valor: seleccionGrid.id,
      campoId: "id",
    });
    let listaAux = registro[campo];
    listaAux.splice(i, 1);

    await update({ [campo]: listaAux });
    if (callbackchange) callbackchange(seleccionGrid, "delete");
    setOpenDialogQuita(false);
    setSeleccionGrid(null);
  };

  const clickQuitar = useCallback(
    (data) => () => {
      setSeleccionGrid(data);
      setOpenDialogQuita(true);
    },
    [registro.id]
  );
  const handleClose = () => {
    setMostrarNuevo(false);
  };
  const callbackSuccess_ = (vals) => {
    setMostrarNuevo(false);
    if (callbackSuccess) callbackSuccess(vals);
    if (callbackchange) callbackchange(vals, "nuevo");
  };
  ///////////////////////
  const handleCloseEditar = () => {
    setMostrarEditar(false);
  };
  const callbackSuccessEditar = (vals) => {
    setMostrarEditar(false);
    if (callbackSuccess) callbackSuccess(vals);
    if (callbackchange) callbackchange(vals, "editar");
  };
  const ComponenteForm = dynamic(() => import(`../../${pathFormulario}`), {
    loading: ({ error, timedOut, isLoading }) => {
      if (isLoading) return "cargando...";
      if (error)
        return <span>{`Error al cargal el componente (${error})`}</span>;
      if (timedOut) return <span>Tiempo de espera agotado</span>;
    },
  });
  const fnRows = () => {
    //ALGUNOS CAMPOS VIENEN STRING y con el _ID que para datagrid tiene que ser id

    if (Array.isArray(registro[campo]))
      return registro[campo].map((item) => {
        item.id = item.id ? item.id : item._id;
        return item;
      });
    return [];
  };

  return (
    <Grid
      item
      flex={1}
      sx={{
        "& .disabled": {
          bgcolor: (theme) => "text.disabled",
          "& .warning": {
            bgcolor: (theme) => "text.secondary",
          },
        },
      }}
    >
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
          <Icon className={"fas fa-plus"}></Icon>{" "}
          {labelAgregar ? labelAgregar : "AGREGAR"}
        </Button>
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        {columnas && (
          <DataGrid
            sortModel={sortModel}
            rows={fnRows()}
            columns={columnas}
            pageSize={10}
            getRowClassName={getRowClassName}
          />
        )}
      </div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={mostrarNuevo}
        onClose={handleClose}
      >
        <DialogTitle>
          <Icon className="fas fa-plus" /> NUEVO
        </DialogTitle>
        <DialogContent>
          <FormItem
            registro={registro}
            mod={mod}
            datos={seleccionGrid}
            coleccion={coleccion}
            campo={campo}
            callbackSuccess={callbackSuccess_}
            esNuevo={true}
            modelo={modelo()}
            valoresIniciales={valoresIniciales}
          >
            <ComponenteForm auth={auth} mod={mod} />
          </FormItem>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={mostrarEditar}
        onClose={handleCloseEditar}
      >
        <DialogTitle>
          <Icon className="fas fa-pencil" /> EDITAR
        </DialogTitle>
        <DialogContent>
          <FormItem
            registro={registro}
            mod={mod}
            datos={seleccionGrid}
            coleccion={coleccion}
            campo={campo}
            callbackSuccess={callbackSuccessEditar}
            modelo={modelo()}
            valoresIniciales={valoresIniciales}
          >
            <ComponenteForm auth={auth} mod={mod} />
          </FormItem>
        </DialogContent>
      </Dialog>
      <Dialogo
        icon="fas fa-exclamation-triangle"
        open={openDialogQuita}
        setOpen={setOpenDialogQuita}
        titulo="Deseas eliminar este elemento?"
        callbackAcepta={callbackElimina}
      />
    </Grid>
  );
}
