import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import { getFieldName } from "../../helpers/forms";
import dynamic from "next/dynamic";
export default function FormClientes({ setFieldValue, values }) {
  const Form = dynamic(() => import(`../${values.ref}/config/`), {
    ssr: false,
  });
  // if (!values.ref) return "";

  return (
    <Grid container spacing={2}>
      <Grid>
        <Input label="Ref" campo={"ref"} />
      </Grid>
      <Form values={values} setFieldValue={setFieldValue} />
    </Grid>
  );
}
