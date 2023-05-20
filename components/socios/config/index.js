import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";
import TitulosFormularios from "@components/forms/tituloFormularios";
import Form from "./_form";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function ConfigSocio({ mod }) {
  const campo = "config";
  const coleccion = "mods";
  const datos = UseConfigModulo("socios");

  const valoresIniciales = () => {
    return { nombre: "", tipo: "" };
  };
  const callbackSuccess = () => {};
  if (!datos) return "";
  return (
    <Stack>
      <Typography variant="h4" component="div" gutterBottom>
        <TitulosFormularios
          titulo="CONFIGURACION"
          subTitulo="de socios"
          icono="fas fa-wrench"
        />
      </Typography>
      <FormSubitemColeccion
        registro={datos}
        coleccion={coleccion}
        campo={campo}
        datos={datos}
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
      >
        <Form />
      </FormSubitemColeccion>
    </Stack>
  );
}
