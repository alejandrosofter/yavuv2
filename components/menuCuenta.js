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
import { Icon, Stack } from "@mui/material";
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
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Abrir Menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 30, height: 30, mt: 1 }}
              alt={`mail: ${auth?.displayName}`}
              src={auth?.photoURL}
            />
          </IconButton>
        </Tooltip>
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
              <Typography textAlign="center">Cerrar Sesion</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default MenuUsuario;
