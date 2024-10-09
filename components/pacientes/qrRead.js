import DialogContenido from "@components/forms/dialogContenido";
import Dialogo from "@components/forms/dialogo";
import Input from "@components/forms/input";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import {
  Backdrop,
  Box,
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";

export default function QrRead({ onRead }) {
  const [value, setValue] = useState("");
  const onEnter = (data) => {
    // Previene el envío del formulario al presionar "Enter"
    if (onRead) onRead(data);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
      <TextFieldPut
        onEnter={onEnter}
        label="Lector QR"
        value={value}
        Icon={<Icon className="fas fa-qrcode" />}
      />
    </Box>
  );
}
function TextFieldPut({ label, Icon, value, onEnter, deleteOnEnter = true }) {
  const [valor, setValue] = useState("");

  useEffect(() => {
    if (value) setValue(value);
  }, [value]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onEnter) onEnter(e.target.value);
      if (deleteOnEnter) {
        e.target.value = "";
        setValue("");
      }
    }
  };
  return (
    <TextField
      className="lectorQr"
      variant="standard" // Cambia a 'filled' o 'standard' según tus preferencias
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder={label}
      value={valor}
      id="lectorQr"
      fullWidth // Para que ocupe todo el ancho del contenedor
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {Icon}

            {/* Asegúrate de que este icono esté disponible */}
          </InputAdornment>
        ),
        sx: {
          borderRadius: "8px", // Bordes redondeados
          // Aquí puedes añadir más estilos
        },
      }}
      InputLabelProps={{
        sx: {
          color: "#1976d2", // Color de la etiqueta
        },
      }}
    />
  );
}
function FormFormik({
  children,
  initialValues,
  onSubmit,
  requiredFields = [],
  showSubmit = false,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        // if (!values.email) {
        //   errors.email = 'Required';
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //   errors.email = 'Invalid email address';
        // }

        requiredFields.forEach((field) => {
          if (!values[field]) {
            errors[field] = "Requerido";
          }
        });

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if (onSubmit) onSubmit(values);
        }, 400);
      }}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          {children}
          {showSubmit && (
            <Button
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Aceptar
            </Button>
          )}
        </form>
      )}
    </Formik>
  );
}
export function UseDataToForm({ data, onSubmit, open, setOpen }) {
  return (
    <DialogContenido
      maxWidth={`sm`}
      fullWidth={true}
      open={open}
      setOpen={setOpen}
      titulo={`Reemplazar Valores`}
    >
      <FormFormik
        onSubmit={onSubmit}
        requiredFields={["obraSocial"]}
        showSubmit={true}
        initialValues={data}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Input campo="nombre" label="Nombre" />
          </Grid>
          <Grid item>
            <Input campo="apellido" label="Apellido" />
          </Grid>
          <Grid item>
            <Input campo="nroAfiliado" label="Nro Afiliado" />
          </Grid>
          <Grid item>
            <Input campo="dni" label="Dni" />
          </Grid>
          <Grid item>
            <Input campo="plan" label="Plan" />
          </Grid>
          <Grid item md={12}>
            <SelectObraSocial label={"Obra Social"} campo="obraSocial" />
          </Grid>
        </Grid>
      </FormFormik>
    </DialogContenido>
  );
}
