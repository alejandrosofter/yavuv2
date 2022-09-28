import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import ErrorsForm from "../components/forms/errorForms";
import { esVacio } from "../helpers/objectos";
import ImpresionDialog from "./forms/impresion";
import ShowErrors from "./showErrors";

export default function _FormGenerico({
  preData,
  callbackSuccess,
  fnUpdate,
  dataForm,
  datos,
  valoresIniciales,
  modelo,
  children,
  mod,
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
    if (fnUpdate)
      fnUpdate(quitarValoresNull(values))
        .then((res) => {
          setLoad(false);
          if (callbackSuccess) {
            callbackSuccess(values, res);
          } else {
            router.back({ shallow: true });
          }
        })
        .catch((error) => {
          setLoad(false);
          throw new Error(error);
        });
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
        console.log(errors);
        return (
          <Grid sx={{ my: 0 }} md={12} item xs={9}>
            <Form onSubmit={handleSubmit}>
              {React.cloneElement(children, {
                values,
                errors,

                ...dataForm,
                mod: mod ? mod : dataForm?.mod ? dataForm.mod : {},
                setFieldValue: setFieldValue,
              })}
              <LoadingButton
                sx={{ mt: 3 }}
                loading={load}
                color="primary"
                variant="contained"
                onClick={() => showErrors(errors, isValid)}
                fullWidth
                type="submit"
              >
                ACEPTAR
              </LoadingButton>
              <ShowErrors
                isValidating={isValidating}
                errors={errors}
                open={openErrores}
                setOpen={setOpenErrores}
              />
            </Form>
          </Grid>
        );
      }}
    </Formik>
  );
}
