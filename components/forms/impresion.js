import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Dialog from "@mui/material/Dialog";
import { Box, Icon, Input } from "@mui/material/";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import parse from "html-react-parser";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import Slide from "@mui/material/Slide";
import { forwardRef, useState, useEffect } from "react";
import ImpresorDirecto from "../impresorDirecto";
import { SendEmail } from "./sendEmail";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ImpresionDialog({
  data,
  attachments,
  open,
  setOpen,
  asunto,
  titulo,
  emailDefault,
  plantilla,
}) {
  const [loading, setLoading] = useState(false);
  const [openSendMail, setOpenSendMail] = useState(false);

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
        {parse(plantilla)}
      </div>
    );
  };
  const ComponentToPrint = forwardRef(view);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
          <ImpresorDirecto html={plantilla} />
          <Button
            disabled={loading}
            autoFocus
            color="inherit"
            onClick={handlePrint}
          >
            <Icon sx={{ mr: 1 }} className="fas fa-print" /> Imprimir
          </Button>
          <Button
            disabled={loading}
            autoFocus
            color="inherit"
            onClick={() => setOpenSendMail(true)}
          >
            <Icon sx={{ mr: 1 }} className="fas fa-envelope" /> Enviar Mail
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 5 }}>
        <ComponentToPrint ref={componentRef} />
      </Box>
      <SendEmail
        nombrePlantilla="emailCredencial"
        titulo={titulo}
        open={openSendMail}
        setOpen={setOpenSendMail}
        asunto={asunto ? asunto : titulo}
        attachs={attachments}
        email={emailDefault ? emailDefault : data?.email}
        html={plantilla}
        // data={{ ...data }}
      />
    </Dialog>
  );
}
