import { useState } from "react";
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
  dataModulo,
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
    values.id = randomId(20);
    clickAceptar(values);
    setOpen(false);
  };
  const initialValues =
    typeof valoresIniciales == "function"
      ? valoresIniciales()
      : valoresIniciales;
  return (
    <div>
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
        <DialogTitle>{`NUEVO ${nombreModulo}`}</DialogTitle>
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
    </div>
  );
}
