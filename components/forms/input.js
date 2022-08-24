import { Field } from "formik";
import { TextField } from "formik-mui";
export default function Input({
  campo,
  label,
  inputProps,
  type,
  disabled,
  multiline,
  onChange,
  rows,
}) {
  return (
    <Field
      name={campo}
      fullWidth
      type={type}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      variant="outlined"
      label={label}
      inputProps={inputProps}
      component={TextField}
    />
  );
}
