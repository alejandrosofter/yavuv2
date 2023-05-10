import TabsFormik from "@components/forms/tab";
import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import RichEditor from "../forms/richEditorFormik";
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
          <TabsFormik
            label="emails"
            vistas={[
              {
                label: "emails",
                nro: 0,
                vista: <RichEditor label="Plantilla" campo="dataPlantilla" />,
              },
              {
                label: "whatsapp",
                nro: 1,
                vista: (
                  <Grid container>
                    <Grid item md={12}>
                      <Input
                        rows={10}
                        multiline={true}
                        label="Whatsapp Mensaje"
                        campo="dataWhatsapp"
                      />
                    </Grid>
                  </Grid>
                ),
              },
            ]}
          />
        </Grid>
      </Stack>
    </Grid>
  );
}
