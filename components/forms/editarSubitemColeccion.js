import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { useDocument } from "@nandorojo/swr-firestore";
import { quitarValoresNull } from "@helpers/objects";
import Dialogo from "./dialogo";

export default function FormSubitemColeccion({
  registro,
  coleccion,

  callbackSuccess,
  datos,
  mod,
  valoresIniciales,
  modelo,
  children,
}) {
  const router = useRouter();
  const [load, setLoad] = useState();
  const [openMensaje, setOpenMensaje] = useState(false);
  const { data, update, error } = useDocument(`${coleccion}/${registro.id}`, {
    listen: true,
  });

  const clickForm = async (values) => {
    setLoad(true);

    if (registro) values.idRegistroPadre = registro.id;

    update({ ...quitarValoresNull(values) })
      .then(async (res) => {
        setOpenMensaje(true);
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
        throw new Error(error);
      });

    if (mutateIndex) mutateIndex();
    if (mutateRegistro) mutateRegistro();
    if (callbackSuccess) callbackSuccess(values);

    // router.back({ shallow: true })
  };
  if (error) return "Error en conectar con la data...";
  return (
    <Formik
      initialValues={datos ? datos : valoresIniciales()}
      validationSchema={modelo}
      onSubmit={clickForm}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
    >
      {({ handleSubmit, values, errors, setFieldValue, validateForm }) => {
        return (
          <Grid sx={{ my: 3 }} md={12} item xs={9}>
            <Form onSubmit={handleSubmit}>
              {React.cloneElement(children, {
                mod: mod,
                values: values,
                setFieldValue: setFieldValue,
              })}

              <LoadingButton
                sx={{ mt: 2 }}
                loading={load}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                ACEPTAR
              </LoadingButton>
            </Form>
            <Dialogo
              open={openMensaje}
              setOpen={setOpenMensaje}
              titulo={`Bien! Se ha guardado el registro!`}
            />
          </Grid>
        );
      }}
    </Formik>
  );
}
