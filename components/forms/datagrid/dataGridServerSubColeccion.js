import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Fetch from "../../../helpers/Fetcher";
import { Button, Icon, Typography } from "@mui/material/";
import { useRouter } from "next/router";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getLinkUrl } from "../../../helpers/Strings";
import Dialogo from "../dialogo";
import DialogContenido from "../dialogContenido";
import Fetcher from "../../../helpers/Fetcher";
import useSWR from "swr";

export default function DataGridServerSubColeccion({
  columns,
  pageSize,
  url,
  token,
  acciones,
  modulo,
}) {
  const router = useRouter();
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: pageSize,
    loading: false,
  });
  const { data: datos } = useSWR(
    () => `${url}?pageSize=${rowsState.pageSize}&page=${rowsState.page}`
  );

  const pagesNextCursor = React.useRef({});
  const [columnas, setColumnas] = useState([]);
  // const [rows, setRows] = React.useState([]);

  const [rtaServer, setRtaServer] = useState("");
  const [openRta, setOpenRta] = useState(false);
  const [dialog, setdialog] = useState(false);
  const [accionSeleccion, setAcccionSeleccion] = useState();
  const [data, setData] = useState();

  const clickAceptaMenu = async (e) => {
    const url = eval("`" + accionSeleccion.url + "`");
    const method = accionSeleccion.method ? accionSeleccion.method : "POST";

    const res = await Fetcher(url, method, data, token);

    if (res) {
      setRtaServer(JSON.stringify(res));
      setOpenRta(false);
    }
  };

  useEffect(() => {
    const clickMenu = ({ accion, params }) => {
      setData(params.row);
      setAcccionSeleccion(accion);
      if (accion.esFuncion) {
        setdialog(true);
      } else
        router.push(getLinkUrl(accion.url, modulo, params.row), undefined, {
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
  }, [acciones, columns, modulo, router]);

  const cambiaPagina = (page) => {
    return setRowsState((prev) => {
      const ultimo = datos.datos[0];
      return { ...prev, page, ultimo };
    });
  };
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        columns={columnas}
        pagination
        rows={datos ? datos.datos : []}
        rowCount={datos ? datos.cantidadRegistros : 0}
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
    </div>
  );
}
