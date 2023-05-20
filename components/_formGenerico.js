import { LoadingButton } from "@mui/lab";
import { Alert, Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import ErrorsForm from "../components/forms/errorForms";
import { esVacio } from "../helpers/objectos";
import ImpresionDialog from "@components/forms/impresion";
import ShowErrors from "./showErrors";
import { cleanseUndefined } from "@helpers/objects";

export default function _FormGenerico({
  preData,
  callbackSuccess,
  fnUpdate,
  dataForm,
  datos,
  coleccion,
  label,
  icono,
  valoresIniciales,
  modelo,
  children,
  isNew,
}) {
  const router = useRouter();
  const [load, setLoad] = useState();
  const [openErrores, setOpenErrores] = useState(false);

  const quitarValoresNull = (obj) => {
    for (let key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  };
  const showErrors = (errors, isValid) => {
    if (!isValid) {
      setOpenErrores(true);
    }
  };
  const clickForm = async (values, propsForm) => {
    if (load) return;
    setLoad(true);
    if (fnUpdate) {
      const data = quitarValoresNull(values);
      fnUpdate(data)
        .then(async (res) => {
          if (callbackSuccess) {
            await callbackSuccess(values, res);
          } else {
            router.back({ shallow: true });
          }
          setLoad(false);
        })
        .catch((error) => {
          setLoad(false);
          throw new Error(error);
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
  };
  const valores = datos
    ? datos
    : valoresIniciales
    ? valoresIniciales(preData)
    : null;

  return (
    <Formik
      initialValues={valores}
      validationSchema={modelo}
      onSubmit={clickForm}
      // enableReinitialize={true} <== este hijo de puta me hacia reiniciar el formulario
    >
      {({
        handleSubmit,
        values,
        errors,
        setFieldValue,
        isValid,
        dirty,
        validateForm,
        isValidating,
      }) => {
        return (
          <Grid sx={{ p: 2 }} container spacing={1}>
            <Grid item xs={12}>
              <Form>
                <Grid item xs={12}>
                  {React.cloneElement(children, {
                    values,
                    errors,

                    ...dataForm,
                    isNew,
                    ...{ coleccion, label, icono },
                    setFieldValue: setFieldValue,
                  })}

                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={load}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Grid>
                <Grid item sm={12}>
                  <Button
                    sx={{ display: !load ? "si" : "none", mt: 3 }}
                    color="primary"
                    fullWidth={true}
                    variant="contained"
                    onClick={() => showErrors(errors, isValid)}
                    type="submit"
                  >
                    ACEPTAR
                  </Button>
                </Grid>
                <ShowErrors
                  isValidating={isValidating}
                  errors={errors}
                  open={openErrores}
                  setOpen={setOpenErrores}
                />
              </Form>
            </Grid>
          </Grid>
        );
      }}
    </Formik>
  );
}
