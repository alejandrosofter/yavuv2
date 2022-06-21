import React, { useState, useEffect } from "react";
import { Field } from "formik";
import {
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const TimePickerFormik = ({ label, campo, callbackChange }) => {
  const [value, setValue] = useState();
  const getDateHora = (hora) => {
    const date = new Date();
    date.setHours(hora.split(":")[0]);
    date.setMinutes(hora.split(":")[1]);
    return date;
  };
  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          console.log(props.form.values);
          if (!value) setValue(getDateHora(props.form.values[campo]));
          const handleChange = (event) => {
            const valor = `${event?.toDate?.().getHours()}:${event
              ?.toDate?.()
              .getMinutes()}`;
            setValue(event);
            console.log(new Date(event));
            props.form.setFieldValue(campo, valor);
            if (callbackChange) callbackChange(valor);
          };

          return (
            // <FormControlLabel control={<Switch checked={props.field.value} onChange={handleChange}  />} label={`${label}`}/>
            <DatePicker
              disableDayPicker
              format="HH:mm"
              style={{
                backgroundColor: "aliceblue",
                height: "52px",
                fontSize: "25px",
                width: "100px",
                borderRadius: "10px",
                padding: "5px 10px",
              }}
              onChange={handleChange}
              value={value}
              plugins={[<TimePicker key="tp" hideSeconds />]}
            />
          );
        }}
      </Field>
      <Typography variant="caption" gutterBottom>
        {label}
      </Typography>
    </FormControl>
  );
};

export default TimePickerFormik;
