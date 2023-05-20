import { Icon, IconButton, Menu } from "@mui/material";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import Link from "next/link";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";
import { getLinkUrl } from "../helpers/Strings";
import Dialogo from "./forms/dialogo";
import Fetcher from "../helpers/Fetcher";
import DialogContenido from "@components/forms/dialogContenido";
export default function BtnAcciones({ acciones }) {
  //ACCIONES {nombreAccion, color, icono,url}
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setdialog] = useState(false);
  const [openRta, setOpenRta] = useState(false);
  const [rtaServer, setRtaServer] = useState("");
  const [dataMenuSeleccion, setdataMenuSeleccion] = useState();
  const open = Boolean(anchorEl);
  const router = useRouter();
  const clickMenu = (e) => {
    // setOpen(!open)
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const getItemAccion = (nombreAccion) => {
    let salida = null;
    acciones.map((item) => {
      if (item.nombre == nombreAccion) salida = item;
    });
    return salida;
  };
  const clickAceptaMenu = async (e) => {
    const url = eval("`" + dataMenuSeleccion.url + "`");
    const method = dataMenuSeleccion.method ? dataMenuSeleccion.method : "POST";

    if (mutate) mutate();
    if (res) {
      setRtaServer(JSON.stringify(res));
      setOpenRta(true);
    }
  };
  const clickAccion = (e) => {
    setAnchorEl(null);
    const { myValue } = e.currentTarget.dataset;
    const itemAccion = getItemAccion(myValue);
    setdataMenuSeleccion(itemAccion);
    const funcAcepta = (e) => {};
    if (itemAccion.esFuncion) {
      e.preventDefault();
      setdialog(true);
    }
    // const url=itemAccion.url

    // if(url)router.push( cade,null, { shallow: true })
    // else itemAccion.funcion(itemAccion)
  };

  return (
    <>
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
      <IconButton aria-expanded={open ? "true" : undefined} onClick={clickMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        TransitionComponent={Fade}
        open={open}
      >
        {acciones &&
          acciones.map((item) => {
            return (
              <Link key={item.id} passHref href={item.url}>
                <MenuItem data-my-value={item.nombre} onClick={clickAccion}>
                  <ListItemIcon>
                    <Icon
                      sx={{ color: item.color }}
                      fontSize="small"
                      className={item.icono}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography color={item.color ? item.color : ""}>
                      {item.label}
                    </Typography>
                  </ListItemText>
                </MenuItem>
              </Link>
            );
          })}
      </Menu>
    </>
  );
}
