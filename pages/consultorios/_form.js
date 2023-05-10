import ItemsModulo from "@components/forms/itemsModulo";
import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import {
  valoresInicialesHorarios,
  ModeloHorarios,
} from "@modelos/ModeloTurnos";
import FormHorario from "./_formHorario";
import SelectConsultorio from "./selectConsultorio";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid>
      <Stack>
        <Grid
          sx={{ pt: 1, pb: 1 }}
          md={12}
          container
          rowSpacing={2}
          spacing={2}
        >
          <Grid item md={4}>
            <Input label="Nombre" campo="nombre" />
          </Grid>
          <Grid item md={1}>
            <Input label="Nombre Corto" campo="nombreCorto" />
          </Grid>
          <Grid item md={4}>
            <Input label="Dirección" campo="direccion" />
          </Grid>
          <Grid item md={2}>
            <Input label="Tel" campo="telefono" />
          </Grid>
          <Grid item md={4}>
            <Input label="Email" campo="email" />
          </Grid>

          <Grid item md={2}>
            <SelectEstaticFormik
              items={["ACTIVO", "INACTIVO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={6}>
            <Input label="Detalle" campo="detalle" />
          </Grid>

          <Grid item md={12}>
            <ItemsModulo
              height={200}
              setFieldValue={setFieldValue}
              campo="horarios"
              data={values.horarios}
              modelo={ModeloHorarios}
              nombreModulo="HORARIOS"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las propiedades del registro:`}
              textoAgregar={`Ingrese los datos del registro`}
              valoresIniciales={valoresInicialesHorarios()}
              form={<FormHorario mod={mod} />}
              dataModulo={[]}
              columnas={[
                { field: "desde", headerName: "Desde", width: 80 },
                { field: "hasta", headerName: "Hasta", width: 80 },
                { field: "duracion", headerName: "Duracion", width: 80 },
                {
                  field: "label_tipoTurno",
                  headerName: "Tipo Turno",
                  width: 120,
                },
                { field: "label_dias", headerName: "Dias", width: 400 },
              ]}
            />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
