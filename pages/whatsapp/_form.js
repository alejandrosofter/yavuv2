import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectContacto from "@pages/contactos/selectContacto";

export default function Form({ mod, setFieldValue, values }) {
  const cambiaContacto = (valor, item) => {
    if (item) {
      if (!item.tieneWhatsapp) {
        setFieldValue("nro", "");
      } else setFieldValue("nro", `${item.telefono}`);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={10}>
        <SelectContacto
          campoLabel={(item) =>
            `${item.apellido} ${item.nombre} - ${item.telefono} ${
              item.tieneWhatsapp ? "📲" : ""
            }`
          }
          callbackchange={cambiaContacto}
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Mensaje" campo="mensaje" />
      </Grid>
    </Grid>
  );
}
