import { Grid, Tab } from "@mui/material";
import Input from "@components/forms/input";
import SwitchFormik from "@components/forms/switch";
import Modelo, {
  valoresIniciales,
  ModeloMods,
  valoresInicialesItems,
} from "../../modelos/ModeloUsuariosInvitados";

import ItemsModulo from "../forms/itemsModulo";
import Select from "@components/forms/select";
import Form from "./_formItems";

export default function _formUsuarioInvitado({
  values,
  setFieldValue,
  titulo,
  subTitulo,
  icono,
}) {
  return (
    <Grid container>
      <Grid item md={12}>
        <Input label="Email " campo="email" />
      </Grid>
      <Grid item md={3}>
        <SwitchFormik label="Activo " campo="activo" />
      </Grid>
      <Grid item md={12}>
        <ItemsModulo
          setFieldValue={setFieldValue}
          campo="mods"
          data={values.mods}
          modelo={ModeloMods}
          textoEditar={`Puedes cambiar las propiedades del registro:`}
          textoAgregar={`Ingrese los datos del registro`}
          nombreModulo="Mods"
          fullWidth={true}
          maxWidth={"md"}
          valoresIniciales={valoresIniciales()}
          form={<Form />}
          columnas={[
            {
              field: "label_idMod",
              headerName: "Modulo",
              editable: true,
              width: 120,
            },
            {
              field: "habilitado",
              headerName: "Habilitado",
              width: 120,
              valueFormatter: ({ value }) => (value ? "SI" : "NO"),
            },
            {
              field: "label_recursos",
              headerName: "Recursos",
              editable: true,
              width: 380,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
