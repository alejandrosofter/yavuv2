import { WhatsappSharp } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";

import { UseConfigModulo } from "@helpers/useConfigModulo";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Menu from "@mui/material/Menu";

const MenuWsap = ({}) => {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const config = UseConfigModulo("whatsapp");
  const [dataWsap, setDataWsap] = useState();
  useEffect(() => {
    console.log(`${config?.hosting}bots/${config?.idBot}/status`);
    if (!config) return;
    if (!config?.hosting) return;
    if (config)
      axios
        .get(`${config?.hosting}bots/${config?.idBot}/status`, {
          headers: {
            Authorization: `Bearer ${config?.token}`, // Agregar token como Bearer
            "Content-Type": "application/json", // Si es necesario
          },
        })
        .then((res) => {
          setDataWsap(res.data);
        });
  }, [config]);
  if (!config) return "";
  if (!config.activo) return "";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (!dataWsap) return "";
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        sx={{ pr: 2 }}
        item
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        xs={4}
      >
        <Tooltip title="Estado de Whatsapp">
          <IconButton onClick={handleOpenUserMenu}>
            <WhatsappSharp
              sx={{ color: dataWsap == "connecting" ? "red" : "green" }}
            />
          </IconButton>
        </Tooltip>
      </Grid>

      <Menu
        sx={{ mt: "45px", ml: "150px" }}
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
        <Grid
          sx={{ width: "250px", p: "5px" }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Typography>{dataWsap}</Typography>
        </Grid>
      </Menu>
    </Grid>
  );
};
export default MenuWsap;
