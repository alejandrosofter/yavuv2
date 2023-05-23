import { Field } from "formik";
import { TextField } from "formik-mui";
export default function Input({
  campo,
  label,
  type,
  focus,
  disabled,
  multiline,
  onChange,
  style,
  rows,
}) {
  let component = TextField;
  component.defaultProps = {
    focused: focus,
    autoFocus: focus,
    style,
  };
  return (
    <Field
      name={campo}
      fullWidth
      type={type}
      onKeyUp={onChange}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      variant="outlined"
      label={label}
      component={component}
    />
  );
}
