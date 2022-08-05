import { LoadingButton } from "@mui/lab";
import { Alert, Grid } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import ErrorsForm from "../components/forms/errorForms";
import { esVacio } from "../helpers/objectos";
import ImpresionDialog from "./forms/impresion";

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
  // const idPlantillaImpresion = mod.config?.plantillaCobro;
  const [openImpresion, setOpenImpresion] = useState(false);

  const quitarValoresNull = (obj) => {
    for (let key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  };
  const clickForm = async (values) => {
    setLoad(true);
    console.log(values);
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
      validationSchema={modelo()}
      onSubmit={clickForm}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
      // enableReinitialize={true} <== este hijo de puta me hacia reiniciar el formulario
    >
      {({ handleSubmit, values, errors, setFieldValue, validateForm }) => {
        // if (idPlantilla) setPlantilla({ id: idPlantilla, data: values });
        // console.log(values);
        //  setFieldValue("idUsaurio",fuego.auth().currentUser.uid)
        return (
          <Grid sx={{ my: 0 }} md={12} item xs={9}>
            <Form onSubmit={handleSubmit}>
              {React.cloneElement(children, {
                ...dataForm,
                values: values,
                errors,
                setFieldValue: setFieldValue,
                mod: mod,
              })}

              <ErrorsForm errors={errors} />
              <ImpresionDialog
                titulo="PANEL COMPARTIR COBRO"
                setOpen={setOpenImpresion}
                open={openImpresion}
                asunto="COBRO "
                data={values}
                // plantilla={plantilla}
              />
              <LoadingButton
                disabled={!esVacio(errors)}
                sx={{ mt: 3 }}
                loading={load}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                ACEPTAR
              </LoadingButton>
            </Form>
          </Grid>
        );
      }}
    </Formik>
  );
}
