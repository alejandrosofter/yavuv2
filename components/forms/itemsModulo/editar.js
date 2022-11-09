import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid, Icon } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import Alert from "@mui/material/Alert";
export default function ItemsModulo_editar({
  fullWidth,
  maxWidth,
  textoEditar,
  nombreModulo,
  clickAceptar,
  valoresIniciales,
  modelo,
  abierto,
  dataModulo,
  form,
}) {
  const [open, setOpen] = useState(false);
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
    clickAceptar(values);
    setOpen(false);
  };
  return (
    <Grid sx={{ my: 3 }} md={12} item xs={9}>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={abierto}>
        <DialogTitle>{`EDITAR ${nombreModulo}`}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pb: 3 }}>
            {` ${textoEditar ? textoEditar : ""}`}
          </DialogContentText>
          <Formik
            initialValues={valoresIniciales}
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
