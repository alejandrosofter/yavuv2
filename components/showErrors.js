import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function ShowErrors({ errors, setOpen, open }) {
  const handleClose = () => {
    setOpen(false);
  };

  const showError = (errors) =>
    Object.keys(errors).map((key) => {
      if (typeof key !== "object") {
        return (
          <Typography key={key} variant="body1">
            {`${key}: ${errors[key]}`}
          </Typography>
        );
      } else showError(errors[key]);
    });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"VALIDACION"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errors &&
            //loop object errors
            showError(errors)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
