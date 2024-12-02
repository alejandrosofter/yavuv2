import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormikContext } from "formik";

export default function RadioButtons({
  options,
  defaultValue,
  campo,
  row,
  label,
  campoLabel = "label",
  campoId = "id",
}) {
  const { setFieldValue, values } = useFormikContext();

  // Asegurarnos de que el valor predeterminado esté en Formik
  React.useEffect(() => {
    if (values[campo] === undefined || values[campo] === "") {
      setFieldValue(campo, defaultValue); // Establecer el valor predeterminado en Formik
    }
  }, [campo, defaultValue, values, setFieldValue]);

  const handleChange = (item) => {
    setFieldValue(campo, item[campoId]); // Actualiza el valor del campo en Formik
    setFieldValue(`label_${campo}`, item[campoLabel]); // Actualiza el campo de label
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby="demo-radio-buttons-group-label"
        value={values[campo] || ""} // Valor controlado por Formik
        name={campo} // El nombre del campo debe ser el mismo que el que usa Formik
        onChange={(e) => {
          const selectedOption = options.find(
            (item) => item[campoId] === e.target.value
          );
          if (selectedOption) handleChange(selectedOption);
        }}
      >
        {options &&
          options.map((item) => (
            <FormControlLabel
              key={`radio_${item[campoId]}`}
              value={item[campoId]}
              control={<Radio />}
              label={item[campoLabel]}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
