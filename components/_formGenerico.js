import { LoadingButton } from "@mui/lab";
import { Alert, Grid } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import ErrorsForm from "../components/forms/errorForms";
import { esVacio } from "../helpers/objectos";
import ImpresionDialog from "./forms/impresion";
import { UsePlantilla } from "./plantillas/usePlantilla";

export default function _FormGenerico({
  preData,
  callbackSuccess,
  fnUpdate,
  datos,
  valoresIniciales,
  modelo,
  children,
  idPlantilla,
  mod,
}) {
  const router = useRouter();
  const [load, setLoad] = useState();
  // const idPlantillaImpresion = mod.config?.plantillaCobro;
  const [openImpresion, setOpenImpresion] = useState(false);

  // const [plantilla, setPlantilla] = UsePlantilla();
  const clickForm = async (values) => {
    setLoad(true);
    if (fnUpdate)
      fnUpdate(values)
        .then(() => {
          if (callbackSuccess) {
            callbackSuccess(values);
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
      enableReinitialize={true}
    >
      {({ handleSubmit, values, errors, setFieldValue, validateForm }) => {
        // if (idPlantilla) setPlantilla({ id: idPlantilla, data: values });
        // console.log(errors)
        //  setFieldValue("idUsaurio",fuego.auth().currentUser.uid)
        return (
          <Grid sx={{ my: 0 }} md={12} item xs={9}>
            <Form onSubmit={handleSubmit}>
              {React.cloneElement(children, {
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
