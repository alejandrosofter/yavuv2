import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { FormControl, FormControlLabel, Switch } from "@mui/material";

const setValoresIniciales = (valor) => {};
const SwitchFormik = ({ label, campo, callbackChange }) => {
  const [valor, setValores] = useState();
  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          const handleChange = (event) => {
            props.form.setFieldValue(campo, event.target.checked);
            if (callbackChange) callbackChange(event.target.checked);
          };

          return (
            <FormControlLabel
              control={
                <Switch
                  checked={props.field.value ? props.field.value : false}
                  onChange={handleChange}
                />
              }
              label={`${label}`}
            />
          );
        }}
      </Field>
    </FormControl>
  );
};

export default SwitchFormik;
