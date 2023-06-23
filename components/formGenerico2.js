import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import ErrorsForm from "@components/forms/errorForms";
import { esVacio } from "@helpers/objectos";

export default function FormGenerico2({
  dataForm,
  validationSchema,
  initialValues,
  children,
  onSubmit,
  conValidacion,
}) {
  const clickForm = (values) => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues ? initialValues : {}}
      validationSchema={validationSchema}
      onSubmit={clickForm}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={true}
      // enableReinitialize={true} <== este hijo de puta me hacia reiniciar el formulario
    >
      {({ handleSubmit, values, errors, setFieldValue, validateForm }) => {
        return (
          <Form onSubmit={handleSubmit}>
            {React.cloneElement(children, {
              ...dataForm,
              values: values,
              errors,
              setFieldValue: setFieldValue,
            })}
            {conValidacion && <ErrorsForm errors={errors} />}
          </Form>
        );
      }}
    </Formik>
  );
}
