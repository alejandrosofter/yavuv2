import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import parse from "html-react-parser";
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
            <Input label="Asunto" campo="asunto" />
          </Grid>
          <Grid item md={4}>
            <Input label="Destinatario" campo="destinatario" />
          </Grid>
          <Grid item md={12}>
            <div
              style={{
                paddingLeft: 80,
                paddingRight: 50,
                paddingTop: 50,
                width: 950,
              }}
            >
              {parse(values.cuerpo)}
            </div>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
