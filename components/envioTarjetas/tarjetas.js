import CardSimple from "@components/forms/cardSimple";
import Dialogo from "@components/forms/dialogo";
import MuestraImagen from "@components/forms/muestraImagen";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { QueryApi } from "@helpers/queryApi";
import { capitalize } from "@helpers/Strings";
import {
  Typography,
  Grid,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
  Menu,
  MenuItem,
  Icon,
  IconButton,
} from "@mui/material";
import { useCollection, fuego, useDocument } from "@nandorojo/swr-firestore";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import EditarTarjeta from "./editarCredencial";
import Paginador from "./paginador";
import VerCredencial from "./verCredencial";

export default function TarjetasEnvio({ mod }) {
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openVerCredencial, setOpenVerCredencial] = useState(false);
  const [paginaActual, setPaginaActual] = useState();
  const [campoClave, setCampoClave] = useState("idTarjeta");
  const [openConfirmaElimina, setOpenConfirmaElimina] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const CANTIDAD_PAGINA = 27;

  const router = useRouter();
  const { data: envioTarjeta } = useDocument(
    `/envioTarjetas/${router.query.idItem}`
  );
  const { data } = useCollection(
    `/envioTarjetas/${router.query.idItem}/tarjetas`,
    {
      orderBy: [campoClave],
      startAfter: paginaActual,
      limit: CANTIDAD_PAGINA,
      listen: true,
      ignoreFirestoreDocumentSnapshotField: false,
    }
  );

  const aceptaElimina = () => {
    if (seleccion)
      fuego.db
        .collection(`/envioTarjetas/`)
        .doc(router.query.idItem)
        .collection("tarjetas")
        .doc(seleccion.idTarjeta)
        .delete();
  };

  const [contextMenu, setContextMenu] = useState(null);
  const [seleccion, setSeleccion] = useState();
  const handleContextMenu = (item, event) => {
    setSeleccion(item);
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };
  const refrescarTodos = () => {
    setDataConsulta({
      url: "/api/tarjetas/refrescarTodos",
      data: { idEnvio: router.query.idItem },
    });
  };
  const clickEditar = () => {
    setContextMenu(null);
    setOpenEditar(true);
  };
  const clickElimina = () => {
    setContextMenu(null);
    setOpenConfirmaElimina(true);
  };
  const clickVerCredencial = () => {
    setContextMenu(null);

    setOpenVerCredencial(true);
  };
  const clickRefrescar = () => {
    setContextMenu(null);
    setDataConsulta({
      url: "/api/tarjetas/refrescarData",
      data: { ...seleccion, idEnvio: router.query.idItem },
    });
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  if (!envioTarjeta) return "";
  return (
    <Grid spacing={1} container>
      <Grid item md={6}>
        <TitulosFormularios
          titulo={`${envioTarjeta.cantidad} CREDENCIALES`}
          subTitulo="para el envio"
          icono="fas fa-credit-card"
        />
      </Grid>
      <Grid item md={1}>
        <IconButton
          title="REFRESCAR INFO TODOS LOS SOCIOS"
          onClick={refrescarTodos}
        >
          <Icon className="fas fa-refresh" />
        </IconButton>
      </Grid>
      <Paginador
        cantidadPorPagina={CANTIDAD_PAGINA}
        cantidadTotal={envioTarjeta?.cantidad}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        setCampoClave={setCampoClave}
        campoClave={campoClave}
        data={data}
        md={5}
        sx={{ m: 300 }}
      />
      <Grid sx={{ p: 7 }} spacing={3} container>
        {data &&
          data.map((item) => (
            <Grid
              key={item.id}
              onContextMenu={handleContextMenu.bind(this, item)}
              style={{ cursor: "context-menu" }}
              justifyContent="center"
              item
            >
              <MuestraImagen w={80} h={80} pathImagen={item.foto} />
              <Grid item sx={{ width: 100 }}>
                <Typography variant="caption">{`${item.apellido.toUpperCase()} ${capitalize(
                  item.nombre
                )}`}</Typography>
              </Grid>
            </Grid>
          ))}
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <Typography
            sx={{ p: 3 }}
            variant="caption"
          >{`${seleccion?.apellido.toUpperCase()} ${capitalize(
            seleccion?.nombre
          )}`}</Typography>
          <MenuItem spacing={2} onClick={clickVerCredencial}>
            <Icon sx={{ mr: 1 }} className="fas fa-credit-card" />
            Ver Credencial
          </MenuItem>
          <MenuItem spacing={2} onClick={clickRefrescar}>
            <Icon sx={{ mr: 1 }} className="fas fa-refresh" />
            Refrescar Info Socio
          </MenuItem>
          <MenuItem spacing={2} onClick={clickEditar}>
            <Icon sx={{ mr: 1 }} className="fas fa-pencil" />
            Editar
          </MenuItem>
          <MenuItem sx={{ color: "red" }} onClick={clickElimina}>
            <Icon sx={{ mr: 1 }} className="fas fa-trash" /> Quitar
          </MenuItem>
        </Menu>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialogo
        titulo="QUITAR CREDENCIAL"
        detalle="Realmente deseas eliminar esta tarjeta?.. Solo la quitaras de este envio"
        open={openConfirmaElimina}
        setOpen={setOpenConfirmaElimina}
        callbackAcepta={aceptaElimina}
      />
      <EditarTarjeta
        data={seleccion}
        idEnvio={router.query.idItem}
        setOpen={setOpenEditar}
        open={openEditar}
      />
      <VerCredencial
        data={seleccion}
        idEnvio={router.query.idItem}
        setOpen={setOpenVerCredencial}
        open={openVerCredencial}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
