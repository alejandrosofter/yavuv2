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
export default function TareasWhatsapp({ fechaBusca }) {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const idUsuario = fuego.auth().currentUser?.uid;
  const fechaDesde = moment(new Date(fechaBusca)).startOf("day").toDate();
  const fechaHasta = moment(fechaDesde).add(1, "days").toDate();
  const { data, error } = useCollection(`whatsapps`, {
    listen: true,
    where: [
      ["timestampTurno", ">=", fechaDesde.getTime() / 1000],
      ["timestampTurno", "<=", fechaHasta.getTime() / 1000],
      ["idUsuario", "==", idUsuario],
    ],
  });
  console.log(
    data,
    error,
    fechaDesde.getTime() / 1000,
    fechaHasta.getTime() / 1000,
    idUsuario
  );
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
              <Icon className="fas fa-paper-plane" />
              Notificacion Manual
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
                  <Typography variant="h6">
                    <WhatsAppIcon
                      sx={{ color: item.fechaCompletada ? "green" : "grey" }}
                    />{" "}
                    {item.nroTelefono}{" "}
                  </Typography>
                  <Typography variant="caption">
                    <b>
                      {item.fechaCompletada
                        ? `Completado el ${getFechaString(
                            item.fechaCompletada
                          )}`
                        : "Pendiente"}{" "}
                    </b>
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
