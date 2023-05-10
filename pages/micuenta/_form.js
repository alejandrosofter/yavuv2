import TabsFormik from "@components/forms/tab";
import { FormDataCuenta } from "./_form/index";
export default function Form({ setFieldValue, values }) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: `DATOS GENERALES`,
          nro: 0,
          vista: <FormDataCuenta />,
        },
      ]}
    />
  );
}
