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
import MenuNotificaciones from "./notificaciones/menuNotificaciones";
import Link from "next/link";

const MenuUsuario = ({ auth }) => {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const clickSalir = () => {
    if (auth) {
      auth.signOut().then(() => {
        //reload
        setAnchorElNav(null);
        window.location.reload();
        // Sign-out successful.
      });
    }
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

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}></Grid>

      <Grid item xs={1}></Grid>

      <Grid
        sx={{ pr: 2 }}
        item
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        xs={4}
      >
        <Typography
          variant="caption"
          sx={{ mr: 1 }}
        >{`${auth?.email}`}</Typography>
        <Tooltip title="Abrir Menu">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar
              // sx={{ width: 30, height: 30, mt: 1 }}
              alt={`mail: ${auth?.email}`}
              src={auth?.photoURL}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={1}>
        <MenuNotificaciones auth={auth} />
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
        <MenuItem
          onClick={() => {
            setAnchorElNav(null);
          }}
          key={`configs`}
        >
          <Link href={`/configs`}>
            <Stack direction="row" spacing={2}>
              <Icon className="fas fa-cog" />
              <Typography textAlign="center">Configs</Typography>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem key={`salir`} onClick={clickSalir}>
          <Stack direction="row" spacing={2}>
            <Icon className="fas fa-sign-out-alt" />
            <Typography textAlign="center">Cerrar Sesion</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Grid>
  );
};
export default MenuUsuario;
