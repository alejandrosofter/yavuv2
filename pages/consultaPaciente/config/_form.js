import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import SelectBootWeb from "@components/bootsWeb/selectBootWeb";
import TabsFormik from "@components/forms/tab";
import RichEditorFormik from "@components/forms/richEditorFormik";
export default function Form({ setFieldValue, values }) {
  const cambia = (valor, data) => {
    if (values.parametros === "") {
      const params = data
        ? data.entradas.map((item) => `${item.nombre}=`).join("\n")
        : "";
      setFieldValue("parametros", params);
    }
  };
  return (
    <TabsFormik
      label="Datos"
      vistas={[
        {
          label: "Datos",
          nro: 0,
          vista: (
            <Grid spacing={2} container>
              <Grid item md={6}>
                <SelectBootWeb callbackchange={cambia} />
              </Grid>
              <Grid item md={6}>
                <Input
                  multiline={true}
                  rows={5}
                  campo="parametros"
                  label="Parametros"
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  multiline={true}
                  rows={5}
                  campo="eventos"
                  label="Eventos"
                />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Salida",
          nro: 1,
          vista: (
            <Grid spacing={2} container>
              <Grid item md={12}>
                <RichEditorFormik height={300} campo="salida" label="Salida" />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
