import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectIndicacion from "./selectIndicacion";
import Handlebars from "handlebars";
import RichEditorFormik from "@components/forms/richEditorFormik";
export default function FormIndicaciones({
  mod,
  setFieldValue,
  values,
  paciente,
}) {
  const cambiaIndicacion = (valor, item) => {
    if (item) {
      const template = Handlebars.compile(item.detalle);
      const data = {
        paciente,
      };
      setFieldValue("detalleIndicacion", `${item.detalle}`);
      setFieldValue("detalle", template(data));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <SelectIndicacion callbackchange={cambiaIndicacion} />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" multiline={true} rows={10} campo="detalle" />
      </Grid>
    </Grid>
  );
}
