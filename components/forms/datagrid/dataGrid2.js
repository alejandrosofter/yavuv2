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
import { useCollection, deleteDocument, fuego } from "@nandorojo/swr-firestore";
import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";

export default function DataGrid2({
  rowClassName,
  fnAcciones = {},
  coleccion,
  where,
  limit,
  orderBy,
  listen,
  columns,
  acciones,
}) {
  const { data: datos, error } = useCollection(coleccion, {
    where,
    limit,
    orderBy,
    listen,
  });

  const router = useRouter();

  const [columnas, setColumnas] = useState([]);
  // const [contadorTotalRegistros,setContadorTotalRegistros]=useState(0)
  // const [rows, setRows] = React.useState([]);

  const [rtaServer, setRtaServer] = useState("");
  const [openRta, setOpenRta] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [accionSeleccion, setAcccionSeleccion] = useState(null);
  const [data, setData] = useState(null);
  const [pathComponente, setPathComponente] = useState(null);
  const ComponenteForm = pathComponente
    ? dynamic(() => import(`${opcion}`), {
        loading: ({ error, timedOut, isLoading }) => {
          if (isLoading) return "cargando...";
          if (error) return <p>{`Error al cargal el componente (${error})`}</p>;
          if (timedOut) return <p>Tiempo de espera agotado</p>;
        },
      })
    : null;
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
        if (accion.conConfirmacion) setdialog(true);
        else ejecutaFuncion(accion.method, params.row);
      } else
        router.push(getLinkUrl(accion.url, params.row), undefined, {
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
    console.log(aux);
    setColumnas(aux);
  }, [acciones, columns, router]);

  fnAcciones["quitar"] = async (dataRow) => {
    return deleteDocument(`${coleccion}/${dataRow.id}`);
  };
  fnAcciones["openEditar"] = async (dataRow, opcion) => {
    console.log(dataRow, opcion);
    setPathComponente(opcion);
    setOpenEditar(true);
  };

  //FUNCIONES CALL DESDE INTERFAZ con EVAL

  //********************************/
  const ejecutaFuncion = (accion, dataRow) => {
    const fnString = accion ? accion : accionSeleccion.method;
    if (fnString.indexOf("(") > -1) {
      const funcion = fnString.split("(")[0];
      const parametro = fnString.split("(")[1].split(")")[0];
      fnAcciones[funcion](dataRow ? dataRow : data, parametro);
    } else fnAcciones[fnString](dataRow ? dataRow : data);
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

  return (
    <div
      className={classes.root}
      style={{ height: screen.height - 100, width: "100%" }}
    >
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
      {/* <DialogContenido titulo="EDITAR" open={openEditar} setOpen={setOpenEditar}>
      <EditarGenerico callbackSuccess={callbackSuccess} valoresIniciales={valoresIniciales} 
      mod={mod} modelo={Modelo}>
          <ComponenteForm  />
      </EditarGenerico>
        
      </DialogContenido> */}
    </div>
  );
}
