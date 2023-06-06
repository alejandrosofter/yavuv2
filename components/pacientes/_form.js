import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import WebcamFormik from "@components/forms/imageFormik";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import FormOs from "@components/pacientes/_formOs";
import { ModeloOsPaciente, valoresInicialesOs } from "@modelos/ModeloPacientes";
import { fuego } from "@nandorojo/swr-firestore";
import InputTelefono from "@components/forms/inputTelefono";
import TabsFormik from "@components/forms/tab";
import ItemsModulo from "@components/forms/itemsModulo";
export default function Form({ setFieldValue, values }) {
  const campoItems = "obrasSociales";
  return (
    <TabsFormik
      label="FICHA PACIENTE"
      vistas={[
        {
          label: `DATOS PERSONALES`,
          nro: 0,
          vista: (
            <Grid container spacing={2}>
              <Grid item md={1}>
                <Switch label="Foto" campo="foto" />
              </Grid>
              {values.foto && (
                <Grid item md={2}>
                  <WebcamFormik
                    folder={`users/${fuego.auth().currentUser?.uid}/pacientes`}
                    label="Foto "
                    campo="foto"
                  />
                </Grid>
              )}
              <Grid md={values.foto ? 9 : 12} spacing={2} item container>
                <Grid item md={2}>
                  <Input focus={true} label="Nombre" campo="nombre" />
                </Grid>
                <Grid item md={2}>
                  <Input label="Apellido" campo="apellido" />
                </Grid>
                <Grid item md={2}>
                  <Input label="D.N.I" campo="dni" />
                </Grid>

                <Grid sx={{ pr: 1 }} item md={4}>
                  <InputTelefono label="Teléfono" campo="telefono" />
                </Grid>
                <Grid item md={4}>
                  <Input label="Email" campo="email" />
                </Grid>

                <Grid item md={3}>
                  <SelectEstaticFormik
                    items={["ACTIVO", "INACTIVO"]}
                    label="Estado"
                    campo="estado"
                  />
                </Grid>
                <Grid item md={9}>
                  <Input label="Detalle" campo="detalle" />
                </Grid>
              </Grid>
            </Grid>
          ),
        },
        {
          label: `OBRAS SOCIALES`,
          nro: 1,
          vista: (
            <ItemsModulo
              height={250}
              labelBtnAgregar="Agregar O.S"
              setFieldValue={setFieldValue}
              data={values[campoItems]}
              campo={campoItems}
              modelo={ModeloOsPaciente}
              nombreModulo="Items"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las propiedades:`}
              textoAgregar={`Ingrese los datos `}
              valoresIniciales={valoresInicialesOs}
              form={<FormOs />}
              dataModulo={[]}
              columnas={[
                {
                  field: "esPrimaria",
                  headerName: "Primaria",
                  width: 100,
                  renderCell: (params) => (params.value ? "SI" : "NO"),
                },

                {
                  field: "label_obraSocial",
                  headerName: "O.S",
                  width: 250,
                },
                {
                  field: "nroAfiliado",
                  headerName: "Nro Afiliado",
                  width: 130,
                },

                {
                  field: "nroCredencial",
                  headerName: "Nro Cred.",
                  width: 130,
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
