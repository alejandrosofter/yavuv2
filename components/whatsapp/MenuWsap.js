import { WhatsappSharp } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";

import { UseConfigModulo } from "@helpers/useConfigModulo";
import { useState, useEffect } from "react";

import * as React from "react";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const MenuWsap = () => {
  const config = UseConfigModulo("whatsapp");
  if (!config) return "";
  if (!config.activo) return "";
  return <DataWsap config={config} />;
};
export default MenuWsap;
function DataWsap({ config }) {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();

  const [dataWsap, setDataWsap] = useState();
  const [qr, setQr] = useState();

  const fetchWsapStatus = async () => {
    const url = `${config?.hosting}bots/${config?.idBot}/`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${config?.token}`,
          "Content-Type": "application/json",
        },
      });
      setDataWsap(res.data);
      await fetchQr();
    } catch (err) {
      console.log("Error fetching WhatsApp status:", err.message);
    }
  };
  const fetchQr = async () => {
    const url = `${config?.hosting}bots/${config?.idBot}/qr`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${config?.token}`,
          "Content-Type": "application/json",
        },
      });
      setQr(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!config) return;

    // Hacer la primera llamada inmediatamente
    fetchWsapStatus();

    // Configurar el intervalo de polling (cada 5 segundos)
    const intervalId = setInterval(fetchWsapStatus, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [config]);

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
              sx={{
                color:
                  dataWsap?.status_session == "OK CONECTADO" ? "white" : "red",
              }}
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
          sx={{ width: "350px", p: "5px" }}
          container
          justifyContent="center"
          alignItems="center"
        >
          {qr && dataWsap?.status_session == "OK CONECTADO" ? (
            <div
              dangerouslySetInnerHTML={{ __html: qr }}
              // style={{ width: "200px", height: "200px" }}
            />
          ) : (
            <Typography>Ya estas conectado!</Typography>
          )}
        </Grid>
      </Menu>
    </Grid>
  );
}
