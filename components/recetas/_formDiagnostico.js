import { Button, Grid, Icon, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectIndicacion from "./selectIndicacion";
import Handlebars from "handlebars";
import RichEditorFormik from "@components/forms/richEditorFormik";
import { useState } from "react";
import SelectDiagnostico from "./selectDiagnostico";
export default function FormDiagnostico({ setFieldValue, values, paciente }) {
  const [seleccion, setSeleccion] = useState(null);
  const onChange = () => {
    if (seleccion) {
      const template = Handlebars.compile(seleccion.detalle);
      const data = {
        paciente,
      };
      // setFieldValue("detalleIndicacion", `${seleccion.detalle}`);
      setFieldValue("detalle", template(data));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <SelectDiagnostico
          callbackchange={(valor, item) => setSeleccion(item)}
        />
      </Grid>
    </Grid>
  );
}
