import ItemsModulo from "@components/forms/itemsModulo";
import Form from "@components/socios/tarjetas/_formTarjetas";
import {
  ModeloTarjetas,
  valoresInicialesTarjetas,
} from "@modelos/ModeloSocios";
import { cols } from "@components/socios/tarjetas/index";
import { Typography, Grid } from "@mui/material";
export default function Modulo({ mod, setFieldValue, values }) {
  const field = "tarjetas";
  const label = "CREDENCIALES";

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography variant="caption" gutterBottom>
          ** NOTA: AL APLICAR LA AFILIACION se enviara la credencial ( sin
          importar el estado ingresado ) a un paquete disponible para envio a
          terceros
        </Typography>
      </Grid>
      <Grid item md={12}>
        <ItemsModulo
          setFieldValue={setFieldValue}
          campo={field}
          data={values[field]}
          modelo={ModeloTarjetas}
          nombreModulo={label}
          fullWidth={true}
          maxWidth={"md"}
          textoEditar={`Puedes cambiar las acciones del registro:`}
          textoAgregar={`Ingrese los datos del registro`}
          valoresIniciales={valoresInicialesTarjetas}
          form={<Form mod={mod} />}
          dataModulo={[]}
          columnas={cols}
        />
      </Grid>
    </Grid>
  );
}
