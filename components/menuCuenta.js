import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Icon, Stack } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import MenuNotificaciones from "./menuNotificaciones";
const MenuUsuario = ({ mod, auth }) => {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const clickSalir = () => {
    if (auth) auth.signOut();
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!auth) return "";
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10}></Grid>
      <Grid item xs={1}>
        <MenuNotificaciones auth={auth} />
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Abrir Menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 30, height: 30, mt: 1 }}
              alt={`mail: ${auth?.displayName}`}
              src={auth?.photoURL}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
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
        <MenuItem key={`salir`} onClick={clickSalir}>
          <Stack direction="row" spacing={2}>
            <Icon className="fas fa-sign-out-alt" />
            <Typography textAlign="center">
              Cerrar Sesion ( {fuego.auth().currentUser?.email} )
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Grid>
  );
};
export default MenuUsuario;
