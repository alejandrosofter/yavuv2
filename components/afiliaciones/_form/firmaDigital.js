import { Stack } from "@mui/material";
import TituloFormularios from "@components/forms/tituloFormularios";
export default function Modulo({}) {
  return (
    <Stack>
      <TituloFormularios titulo="Firma digital Socio" />
      No detectamos una firma digital pendiente, por favor que el socio relize
      la firma y presione aceptar...
    </Stack>
  );
}
