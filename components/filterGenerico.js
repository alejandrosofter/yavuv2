import { LoadingButton } from "@mui/lab";
import { Alert, Grid, Icon, Stack } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import ErrorsForm from "../components/forms/errorForms";
import { esVacio } from "../helpers/objectos";

export default function FilterGenerico({
  callbackSuccess,
  valoresIniciales,
  children,
  icon,
  mod,
}) {
  const router = useRouter();
  const [load, setLoad] = useState();
  const clickForm = async (values) => {
    setLoad(true);
    if (callbackSuccess) callbackSuccess(values);
  };

  return (
    <Formik
      initialValues={valoresIniciales}
      //    validationSchema={modelo()}
      onSubmit={clickForm}
      //  validateOnChange={true}
      //   validateOnBlur={true}
      //  validateOnMount={true}
      //  enableReinitialize={true}
    >
      {({ handleSubmit, values, errors, setFieldValue, validateForm }) => {
        //  setFieldValue("idUsaurio",fuego.auth().currentUser.uid)
        return (
          <Form onSubmit={handleSubmit}>
            {React.cloneElement(children, {
              values: values,
              errors,
              setFieldValue: setFieldValue,
              mod: mod,
            })}

            <LoadingButton color="secondary" variant="contained" type="submit">
              <Icon size="small" sx={{ mr: 1 }} className={icon} /> BUSCAR
            </LoadingButton>
          </Form>
        );
      }}
    </Formik>
  );
}
