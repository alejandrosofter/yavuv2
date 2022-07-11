import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Icon, Typography, Grid, Stack } from "@mui/material/";
import { useRouter } from "next/router";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getLinkUrl } from "../../../helpers/Strings";
import Dialogo from "../dialogo";
import DialogContenido from "../dialogContenido";
import Fetcher from "../../../helpers/Fetcher";
import { cantidadColeccion, getPrimeroPagina } from "../../../config/db";
import { useCollection, deleteDocument, fuego } from "@nandorojo/swr-firestore";
import { makeStyles } from "@mui/styles";

import FormBuscador from "../inputBuscador";
import TitulosFormularios from "../tituloFormularios";
import { useDataModulo } from "@hooks/useDataModulo";
export default function DataGridFirebase({
  rowClassName,
  fnAcciones = {},
  condiciones,
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
  mod,
}) {
  const {
    data: datos,
    update,
    error,
    where,
  } = useDataModulo({ mod, allUsers, condiciones, coleccion, limit, orderBy });

  const router = useRouter();

  const [columnas, setColumnas] = useState([]);
  // const [contadorTotalRegistros,setContadorTotalRegistros]=useState(0)
  // const [rows, setRows] = React.useState([]);

  const [rtaServer, setRtaServer] = useState("");
  const [openRta, setOpenRta] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [accionSeleccion, setAcccionSeleccion] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const busca = async () => {
      // const cant=await cantidadColeccion({coleccion})
      // setCantidadPaginas(Math.floor(cant/limit))
    };
    busca();
  }, []);
  useEffect(() => {
    const clickMenu = ({ accion, mod, params }) => {
      setData(params.row);
      setAcccionSeleccion(accion);
      if (accion.esFuncion) {
        if (accion.conConfirmacion) setdialog(true);
        else ejecutaFuncion(accion.method, params.row);
      } else
        router.push(getLinkUrl(accion.url, mod, params.row), undefined, {
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
              onClick={clickMenu.bind(this, { accion, mod, params })}
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
  }, [acciones, columns, router, mod]);

  fnAcciones["quitar"] = async (dataRow) => {
    return deleteDocument(`${mod.coleccion}/${dataRow.id}`);
  };

  //FUNCIONES CALL DESDE INTERFAZ con EVAL

  //********************************/
  const ejecutaFuncion = (accion, dataRow) => {
    const fnString = accion ? accion : accionSeleccion.method;
    const res = fnAcciones[fnString](dataRow ? dataRow : data);
  };
  const clickAceptaMenu = async (e) => {
    try {
      ejecutaFuncion();
    } catch (err) {
      console.error(err);
    }
  };

  const useStyles = makeStyles({
    root: {
      "& .error": {
        backgroundColor: "#d13333",
      },
    },
  });
  const classes = useStyles();

  if (!mod) return "Cargando mod...";

  return (
    <div
      className={classes.root}
      style={{ height: screen.height - 100, width: "100%" }}
    >
      <Stack direction="row">
        <Grid item flex={1}>
          <TitulosFormularios
            titulo={titulo}
            subTitulo={subTitulo}
            icono={icono}
          />
        </Grid>
      </Stack>

      <DataGrid
        // hideFooterPagination={true}
        columns={columnas}
        rows={datos ? datos : []}
        getRowClassName={rowClassName}
        // {...rowsState}
        // paginationMode="server"
        // onPageChange={(page) =>
        //   setRowsState((prev) => ({ ...prev, page }))
        // }
      />

      <Dialogo
        open={dialog}
        icon="fas fa-exclamation-triangle"
        setOpen={setdialog}
        titulo=""
        detalle={`Realmente deseas realizar ${accionSeleccion?.label}?`}
        callbackAcepta={clickAceptaMenu}
      />
      <DialogContenido titulo="Rta Server" open={openRta} setOpen={setOpenRta}>
        {rtaServer}
      </DialogContenido>
    </div>
  );
}
