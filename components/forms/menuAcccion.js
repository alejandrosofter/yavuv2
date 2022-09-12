import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Icon } from "@mui/material";

const ITEM_HEIGHT = 48;

export default function MenuAccion({ acciones }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickAccion = (accion) => {
    accion.fn(accion);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {acciones &&
          acciones.map((accion) => (
            <MenuItem
              key={`${new Date().getTime()}-${accion.nombre}`}
              // selected={option === "Pyxis"}
              onClick={handleClickAccion.bind(this, accion)}
            >
              <Icon className={accion.icon} sx={{ mr: 2 }} /> {accion.nombre}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
