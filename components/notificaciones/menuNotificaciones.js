import { getFechaString } from "@helpers/dates";
import {
  Avatar,
  Badge,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import { NotificaValidaPaciente } from "./validarPaciente";

export default function MenuNotificaciones({ parentData }) {
  const [seleccion, setSeleccion] = useState();
  const [anchorElNav, setAnchorElNav] = useState();
  const [showValidarPaciente, setShowValidarPaciente] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const { update } = useDocument(`notificaciones/${seleccion?.id}`);
  const { data, error } = useCollection(`notificaciones`, {
    limit: 20,
    where: [
      parentData
        ? ["idUsuario", "==", localStorage.getItem("usermod")]
        : ["usermod", "==", fuego.auth().currentUser?.uid],
    ],
    listen: true,
    orderBy: ["fecha_timestamp", "desc"],
  });
  console.log(data);
  const clickSalir = () => {};
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const clickNotifica = (notificacion) => {
    if (notificacion)
      fuego.db
        .doc(`notificaciones/${notificacion?.id}`)
        .update({ leido: true });
    setSeleccion(notificacion);
    switch (notificacion.tipo) {
      case "DESCARGA": {
        if (notificacion.data) window.open(notificacion.data.url, "_blank");
        else console.log("no hay archivo");
        break;
      }
      case "verificacionPaciente": {
        setShowValidarPaciente(true);
        break;
      }
    }
  };
  const getCantidadNoLeidos = () => {
    let cantidad = 0;
    data?.forEach((notificacion) => {
      if (!notificacion.leido) cantidad++;
    });
    return cantidad;
  };
  if (!data) return "";
  return (
    <Grid item xs={11}>
      <NotificaValidaPaciente
        open={showValidarPaciente}
        setOpen={setShowValidarPaciente}
        notificacion={seleccion}
      />
      <Badge badgeContent={getCantidadNoLeidos()} color="secondary">
        <IconButton
          title="Notificaciones"
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <Icon sx={{ color: "white" }} className="fas fa-bell" />
        </IconButton>
      </Badge>

      <Menu
        sx={{ mt: "45px" }}
        id="notifica-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {data?.map((notificacion) => (
          <MenuItem
            onClick={clickNotifica.bind(this, notificacion)}
            key={notificacion.id}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={3}>
                <Typography
                  sx={{ color: notificacion.leido ? "#939393" : "#0c8087" }}
                  variant="caption"
                >
                  {getFechaString(notificacion.fecha, "DD/MM HH:mm")}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  sx={{
                    ml: 1,
                    color: notificacion.leido ? "#939393" : "#0c8087",
                  }}
                  variant="caption"
                >
                  {notificacion.titulo
                    ? notificacion.titulo
                    : notificacion.mensaje}
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}
