import { Grid, Tab } from "@mui/material";
import Input from "@components/forms/input";
import SwitchFormik from "@components/forms/switch";
import Modelo, {
  valoresIniciales,
  ModeloMods,
  valoresInicialesPermisos,
  ModeloPermisos,
} from "@modelos/ModeloUsuariosInvitados";
import FormPermisos from "./_formPermiso";
import ItemsModulo from "@components/forms/itemsModulo";
import Select from "@components/forms/select";
import Form from "./_formItems";
import TabsFormik from "@components/forms/tab";

export default function _formUsuarioInvitado({
  values,
  setFieldValue,
  titulo,
  subTitulo,
  icono,
}) {
  return (
    <Grid container spacing={2}>
      <TabsFormik
        label="Configs"
        vistas={[
          {
            label: "GRAL",
            nro: 0,
            vista: (
              <Grid container>
                <Grid item md={12}>
                  <Input label="Email " campo="email" />
                </Grid>
                <Grid item md={3}>
                  <SwitchFormik label="Activo " campo="activo" />
                </Grid>
              </Grid>
            ),
          },
          {
            label: "Modulos",
            nro: 1,
            vista: (
              <Grid container>
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
                        field: "label_idModulo",
                        headerName: "Modulo",
                        editable: true,
                        width: 150,
                      },
                      {
                        field: "idMod",
                        headerName: "Mod",
                        editable: true,
                        width: 150,
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            ),
          },
          {
            label: "Permisos",
            nro: 2,
            vista: (
              <Grid container>
                <Grid item md={12}>
                  <ItemsModulo
                    setFieldValue={setFieldValue}
                    campo="permisos"
                    data={values.permisos}
                    modelo={ModeloPermisos}
                    textoEditar={`Puedes cambiar las propiedades del registro:`}
                    textoAgregar={`Ingrese los datos del registro`}
                    nombreModulo="permisos"
                    fullWidth={true}
                    maxWidth={"md"}
                    valoresIniciales={valoresInicialesPermisos()}
                    form={<FormPermisos />}
                    columnas={[
                      {
                        field: "coleccion",
                        headerName: "Coleccion",
                        editable: true,
                        width: 150,
                      },
                      {
                        field: "lectura",
                        headerName: "Lectura",
                        editable: true,
                        width: 120,
                      },
                      {
                        field: "escritura",
                        headerName: "Escritura",
                        editable: true,
                        width: 120,
                      },
                      {
                        field: "quitar",
                        headerName: "Quitar",
                        editable: true,
                        width: 120,
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
}
