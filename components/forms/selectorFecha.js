import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { FormControl } from "@mui/material";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getFechaFormik } from "@helpers/dates";

const SelectFecha = ({ label, campo, callbackChange }) => {
  const getValor = (values, campo) => {
    //verifico si la variable campo viene con punto o no
    if (campo.indexOf(".") > -1) {
      let campos = campo.split(".");
      let valor = values;
      for (let i = 0; i < campos.length; i++) {
        valor = valor[campos[i]];
      }
      return valor;
    } else {
      return values[campo];
    }
  };
  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          const handleChange = (newValue) => {
            //set hours to 0
            if (newValue) {
              newValue.setHours(0);
              newValue.setMinutes(0);
              props.form.setFieldValue(campo, newValue);
              props.form.setFieldValue(
                `${campo}_timestamp`,
                newValue.getTime()
              );
              if (callbackChange) callbackChange(newValue);
            }
          };
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label={label}
                inputVariant="outlined"
                inputFormat="dd/MM/yyyy"
                value={getFechaFormik(getValor(props.form.values, campo))}
                onChange={handleChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default SelectFecha;
