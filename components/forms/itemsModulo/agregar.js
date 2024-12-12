import { useEffect, useState } from "react";
import React from "react";
import Input from "@components/forms/input";
import Button from "@mui/material/Button";
import CheckboxForm from "../../forms/checkbox";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import randomId from "random-id";
import Icon from "@mui/material/Icon";
import { Formik, Form } from "formik";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";

export default function ItemsModulo_agregar({
  labelBtnAgregar,
  fullWidth,
  maxWidth,
  textoAgregar,
  clickAceptar,
  nombreModulo,
  valoresIniciales,
  modelo,
  form,
  triggerOpen,
  dataModulo,
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(triggerOpen.state);
  }, [triggerOpen]);
  const errores = (errs) => {
    for (const [key, value] of Object.entries(errs)) {
      return <Alert severity="error">{value}</Alert>; // "a 5", "b 7", "c 9"
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAceptar = (values) => {
    values.id = randomId(20);
    clickAceptar(values);
    setOpen(false);
  };
  const initialValues =
    typeof valoresIniciales == "function"
      ? valoresIniciales()
      : valoresIniciales;
  return (
    <Grid>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        <Icon className="fas fa-plus" />{" "}
        {labelBtnAgregar ? labelBtnAgregar : "Nuevo"}
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {`NUEVO ${nombreModulo}`}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Icon className="fas fa-times" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pb: 3 }}>
            {`${textoAgregar ? textoAgregar : ""}`}
          </DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={modelo ? modelo() : null}
            onSubmit={handleAceptar}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              values,
              errors,
              setFieldValue,
              validateForm,
            }) => {
              return (
                <Grid sx={{ my: 0 }} md={12} item xs={9}>
                  <Form onSubmit={handleSubmit}>
                    {React.cloneElement(form, {
                      values: values,
                      setFieldValue: setFieldValue,
                      errors: errors,
                      ...dataModulo,
                    })}
                    {errors && errores(errors)}
                    <Button type="submit">
                      <Icon className="fas fa-check" /> ACEPTAR
                    </Button>
                  </Form>
                </Grid>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
