import { Grid, Stack, Typography } from "@mui/material";
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
import SelectOsPaciente from "@components/pacientes/selectOsPaciente";
import SelectFecha from "@components/forms/selectorFecha";
export default function Form({ setFieldValue, values }) {
  return (
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
        <Grid item md={3}>
          <SelectFecha
            // callbackChange={cambiaFecha}
            label="Fecha Nacimiento "
            campo={`fechaNacimiento`}
          />
        </Grid>
        <Grid item md={2}>
          <Input label="D.N.I" campo="dni" />
        </Grid>
        <Grid item md={2}>
          <Switch label="Es Particular?" campo="esParticular" />
        </Grid>
        {!values.esParticular && values.exists && (
          <Grid item md={6}>
            <SelectOsPaciente
              idPaciente={values.id ? values.id : ""}
              values={values}
              setFieldValue={setFieldValue}
              campo="obraSocial"
              label="O.S Principal"
            />
          </Grid>
        )}
        {!values.exists && (
          <Grid item md={12}>
            <Typography variant="h6">Obra Social</Typography>
            <FormOs />
          </Grid>
        )}
        <Grid sx={{ pr: 3 }} item md={3}>
          <InputTelefono label="Teléfono" campo="telefono" />
        </Grid>
        {/* <Grid item md={2}>
          <SelectEstaticFormik
            items={["ACTIVO", "INACTIVO"]}
            label="Estado"
            campo="estado"
          />
        </Grid> */}
        <Grid item md={3}>
          <Input label="Email" campo="email" />
        </Grid>

        <Grid item md={4}>
          <Input label="Detalle" campo="detalle" />
        </Grid>
      </Grid>
    </Grid>
  );
}
