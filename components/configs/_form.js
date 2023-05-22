import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import { getFieldName } from "../../helpers/forms";
import dynamic from "next/dynamic";
export default function FormClientes({ setFieldValue, values }) {
  const Form = dynamic(() => import(`../${values.ref}/config/`), {
    ssr: false,
  });
  if (!values.ref) return "";

  return <Form values={values} setFieldValue={setFieldValue} />;
}
