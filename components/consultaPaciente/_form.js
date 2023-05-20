import { Grid, Stack } from "@mui/material";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectPacientes from "@components/pacientes/selectPaciente";
import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import FechaTime from "@components/forms/fechaTimeFormik";
import ItemsModulo from "@components/forms/itemsModulo";
import {
  ModeloPrestacion,
  inicialesPrestacion,
} from "@modelos/ModeloPrestaciones";
import FormPrestacion from "./_formPrestacion";
import InterfazEventosWeb from "@components/bootsweb/interfazEventosWeb";
import { useState } from "react";
export default function Form({ mod, setFieldValue, values }) {
  const [dataBoot, setDataBoot] = useState({});
  const cambiaPaciente = (valor, item) => {
    if (item) setFieldValue("obraSocial", item.obraSocial);
    setDataBoot({ ...dataBoot, paciente: item });
  };
  const cambiaObraSocial = (valor, item) => {
    setDataBoot({ ...dataBoot, obraSocial: item });
  };

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
          <Grid item md={1}>
            <InterfazEventosWeb
              setFieldValue={setFieldValue}
              data={dataBoot}
              boots={mod.config?.itemsBootsWeb}
            />
          </Grid>
          <Grid item md={2}>
            <FechaTime label="Fecha" campo="fecha" />
          </Grid>
          <Grid item md={3}>
            <SelectPacientes callbackchange={cambiaPaciente} />
          </Grid>
          <Grid item md={3}>
            <SelectObraSocial callbackchange={cambiaObraSocial} />
          </Grid>

          <Grid item md={2}>
            <SelectEstaticFormik
              items={["PENDIENTE", "VALIDADO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={12}>
            <ItemsModulo
              setFieldValue={setFieldValue}
              campo="prestaciones"
              data={values.prestaciones}
              modelo={ModeloPrestacion}
              nombreModulo="PRESTACIONES"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las propiedades del registro:`}
              textoAgregar={`Ingrese los datos del registro`}
              valoresIniciales={inicialesPrestacion()}
              form={<FormPrestacion obraSocial={values.obraSocial} mod={mod} />}
              dataModulo={[]}
              columnas={[
                {
                  field: "label_prestacion",
                  headerName: "Prestacion",
                  width: 290,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
