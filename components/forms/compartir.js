import { useRef } from "react";

import Dialog from "@mui/material/Dialog";
import { Box, Icon, Stack } from "@mui/material/";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { fuego } from "@nandorojo/swr-firestore";
import parse from "html-react-parser";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import Slide from "@mui/material/Slide";
import { forwardRef, useState, useEffect } from "react";
import ImpresorDirecto from "../impresorDirecto";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function CompartirDialog({ data, open, setOpen, titulo }) {
  //   useEffect(() => {
  //     setTemplate(nombrePlantilla);
  //   }, [nombrePlantilla]);

  //   const setTemplate = async (nombre) => {
  //     if (!nombre) return;
  //     const templates = await fuego.db
  //       .collection("plantillas")
  //       .where("identificador", "==", nombre)
  //       .where("idUsuario", "==", fuego.auth().currentUser.uid)
  //       .limit(1)
  //       .get();
  //     let dataTemplate;
  //     templates.forEach((template) => (dataTemplate = template.data()));
  //     setHtml(dataTemplate.dataPlantilla);
  //   };
  const [html, setHtml] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const componentRef = useRef();
  const view = (props, ref) => {
    return (
      <div
        style={{
          paddingLeft: 80,
          paddingRight: 50,
          paddingTop: 50,
          width: 950,
        }}
        ref={ref}
      >
        {parse(html)}
      </div>
    );
  };
  const handleMail = () => {};
  const handleWhatsapp = () => {};

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="secondary" sx={{ position: "relative" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {titulo}
          </Typography>
          <ImpresorDirecto html={html} />
          <Button autoFocus color="inherit" onClick={handleMail}>
            <Icon sx={{ mr: 1 }} className="fas fa-envelope" /> Enviar Mail
          </Button>
          <Button autoFocus color="inherit" onClick={handleWhatsapp}>
            <Icon sx={{ mr: 1 }} className="fas fa-whatsapp" /> Enviar Whatsapp
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 5 }}>{html}</Box>
    </Dialog>
  );
}
