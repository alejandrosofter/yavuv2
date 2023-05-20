import { Grid } from "@mui/material";
import TabsFormik from "@components/forms/tab";
import FormSocios from "@components/socios/_formSocios";
import FormDocumentos from "./documentos";
import FormActividades from "./actividades";
import FormFamiliares from "./familiares";
import FormDebitoAutomatico from "./debitoAutomatico";
import FormMensualizado from "./mensualizado";
import FormPromociones from "./promociones";
import FormFirmaDigital from "./firmaDigital";
import FormPagos from "./pagos";
import FormCredenciales from "./credenciales";

import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid sx={{ pt: 1, pb: 1 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha Alta" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "APLICADA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>

      <TabsFormik
        label="Datos Socio"
        vistas={[
          {
            label: "Socio",
            nro: 0,
            vista: (
              <FormSocios
                field="socio"
                setFieldValue={setFieldValue}
                values={values}
                mod={mod}
              />
            ),
          },

          {
            label: "Documentacion",
            nro: 1,
            vista: (
              <FormDocumentos
                setFieldValue={setFieldValue}
                values={values}
                mod={mod}
              />
            ),
          },
          {
            label: "Promociones",
            nro: 2,
            vista: (
              <FormPromociones
                setFieldValue={setFieldValue}
                values={values}
                mod={mod}
              />
            ),
          },
          // {
          //   label: "Actividades",
          //   nro: 2,
          //   vista: (
          //     <Grid item md={12}>
          //       <FormActividades
          //         setFieldValue={setFieldValue}
          //         values={values}
          //         mod={mod}
          //       />
          //     </Grid>
          //   ),
          // },

          // {
          //   label: "Familiares",
          //   nro: 3,
          //   vista: (
          //     <Grid item md={12}>
          //       <FormFamiliares
          //         setFieldValue={setFieldValue}
          //         values={values}
          //         mod={mod}
          //       />
          //     </Grid>
          //   ),
          // },
          // {label:"Firma",nro:5,vista:
          // <Grid item md={12}>
          // <FormFirmaDigital setFieldValue={setFieldValue} values={values} mod={mod}/>
          // </Grid>
          // },
          {
            label: "Credenciales",
            nro: 3,
            vista: (
              <Grid item md={12}>
                <FormCredenciales
                  setFieldValue={setFieldValue}
                  values={values}
                  mod={mod}
                />
              </Grid>
            ),
          },
          {
            label: "Mensualizado",
            nro: 4,
            vista: (
              <FormMensualizado
                field="mensualizado"
                setFieldValue={setFieldValue}
                values={values}
                mod={mod}
              />
            ),
          },
          {
            label: "Cobro",
            nro: 5,
            vista: (
              <Grid item md={12}>
                <FormPagos
                  setFieldValue={setFieldValue}
                  values={values}
                  mod={mod}
                />
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
}
