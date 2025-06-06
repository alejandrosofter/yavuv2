import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DialogContenido from "@components/forms/dialogContenido";
import { useState } from "react";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getWherePermiso } from "@hooks/useUser";
import { getFechaString } from "@helpers/dates";
import ModeloTareas, { valoresIniciales } from "@modelos/ModeloTareas";
import Form from "../tareas/_form";
import moment from "moment";
import { useEffect } from "react";
//import collection nandorojo
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import ColeccionTable from "@components/forms/coleccionTable";
import ColeccionTable2 from "@components/forms/collectionTable2";
import ListaSimple from "@components/forms/listaSimple";
import { QueryApi } from "@helpers/queryApi";
import { addQueryApi } from "@helpers/db";
import Dialogo from "@components/forms/dialogo";
import firebase from "firebase/app";

export default function TareasWhatsapp({ fechaBusca }) {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPendientes, setOpenPendientes] = useState(false);

  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fechaDesde = moment(fechaBusca).startOf("day").toDate();

  const fechaHasta = moment(fechaDesde).add(1, "days").toDate();

  const { data, error } = useCollection(`whatsapps`, {
    listen: true,
    where: [
      ["fecha_timestamp", ">=", fechaDesde.getTime()],
      ["fecha_timestamp", "<", fechaHasta.getTime()],
      // ["idUsuario", "==", idUsuario],
    ],
  });
  console.log(moment(fechaBusca).startOf("day").toDate().getTime(), error);
  const getIcono = (data) => {
    if (data?.estado == "ENVIADO") {
      return (
        <Icon
          title="Mensaje Enviado"
          sx={{ color: "green" }}
          className="fas fa-check-circle"
        />
      );
    }
    return (
      <Icon
        title="PENDIENTE"
        sx={{ color: "gray" }}
        className="fas fa-hourglass-half"
      />
    );
  };

  const notificar = () => {
    setLoading(true);
    addQueryApi("notificarTurnos", { fechaBusca: fechaBusca })
      .then((data) => {
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };
  const enviarPendientes = () => {
    setLoading(true);
    addQueryApi("enviarPendientes", { fechaBusca: fechaBusca })
      .then((data) => {
        setLoading(false);
        setOpenPendientes(false);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };
  const acciones = [
    {
      // esFuncion: true,
      // icono: "fas fa-file-medical",
      // label: "Prestaciones",
      // fn: (row) => {
      //   setSeleccion(row);
      //   setOpen(true);
      // },
    },
  ];
  const closeDrop = () => {
    setLoading(false);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={() => setOpen(true)}>
          <WhatsAppIcon /> Notificaciones ({data && data.length})
        </Button>
      </Grid>
      <DialogContenido
        maxWidth={"sm"}
        fullWidth={true}
        open={open}
        setOpen={setOpen}
        titulo={
          <Stack spacing={1} direction="row">
            {/* <Button title="Refrescar" onClick={() => search(fechaBusca)}>
              <Icon className="fas fa-refresh" />{" "}
            </Button> */}
            <Typography variant="h4">
              <WhatsAppIcon /> Notificaciones
            </Typography>
            <Button onClick={() => setOpenConfirm(true)}>
              <Icon sx={{ p: 1 }} className="fas fa-paper" />
              Manual
            </Button>
            <Button onClick={enviarPendientes}>
              <Stack direction={"row"}>
                <Icon className="fas fa-paper-plane" />
                Enviar Pendientes
              </Stack>
            </Button>
          </Stack>
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption">
              {data && data.length == 0
                ? `No se realizo ninguna notificacion!`
                : ``}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ListaSimple
              items={data}
              fnRender={(item) => (
                <>
                  <Stack spacing={1} direction={"row"}>
                    <WhatsAppIcon
                      sx={{
                        color: item.estado == "ENVIADO" ? "green" : "grey",
                      }}
                    />
                    <Typography variant="h6">
                      {`${item.paciente?.apellido} ${item.paciente?.nombre}`}
                    </Typography>
                    <Typography variant="caption">
                      {`${item.nroTelefono ? item.nroTelefono : "SIN NRO"}`}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: `${item.estado == "ENVIADO" ? "green" : "red"}`,
                    }}
                    variant="caption"
                  >
                    <b>{`${item.estado}`}</b>
                  </Typography>
                  <Typography variant="caption">{item.mensaje} </Typography>
                </>
              )}
            />
          </Grid>
        </Grid>
      </DialogContenido>
      <Dialogo
        titulo="Confirma"
        detalle={"Estas seguro de crear la notificion en esta fecha?"}
        open={openConfirm}
        setOpen={setOpenConfirm}
        callbackAcepta={() => notificar()}
      />
      <Dialogo
        titulo="Envio de Pendientes"
        detalle={"Estas seguro de enviar los pendientes"}
        open={openPendientes}
        setOpen={setOpenPendientes}
        callbackAcepta={() => enviarPendientes()}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={closeDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>{" "}
    </Grid>
  );
}
