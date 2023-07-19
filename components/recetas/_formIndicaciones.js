import { Button, Grid, Icon, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectIndicacion from "./selectIndicacion";
import Handlebars from "handlebars";
import RichEditorFormik from "@components/forms/richEditorFormik";
import { useState } from "react";
export default function FormIndicaciones({ setFieldValue, values, paciente }) {
  const [seleccion, setSeleccion] = useState(null);
  const cambiaIndicacion = () => {
    if (seleccion) {
      const template = Handlebars.compile(seleccion.detalle);
      const data = {
        paciente,
      };
      setFieldValue("detalleIndicacion", `${seleccion.detalle}`);
      setFieldValue("detalle", template(data));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <SelectIndicacion
          callbackchange={(valor, item) => setSeleccion(item)}
        />
        <Button onClick={() => cambiaIndicacion()}>
          <Icon className="fas fa-level-down-alt" /> Cargar Modelo
        </Button>
      </Grid>
      <Grid item md={12}>
        <RichEditorFormik toolbar="" label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
