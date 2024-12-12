import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import ColorPicker from "react-pick-color";

const setValoresIniciales = (valor) => {};
const ColorPickerFormik = ({ label, campo, callbackChange, sx }) => {
  const [valor, setValores] = useState();
  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          const handleChange = (data) => {
            if (data) {
              props.form.setFieldValue(campo, data.hex);
              if (callbackChange) callbackChange(data.hex);
            }
          };

          return (
            <ColorPicker
              color={props.form.values[campo]}
              onChange={handleChange}
            />
            // <FormControlLabel
            //   sx={sx}
            //   control={
            //     // <Switch
            //     //   checked={props.field.value ? props.field.value : false}
            //     //   onChange={handleChange}
            //     // />

            //   }
            //   label={label}
            // />
          );
        }}
      </Field>
    </FormControl>
  );
};

export default ColorPickerFormik;
