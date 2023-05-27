import Dialogo from "@components/forms/dialogo";
import { addQueryApi } from "@helpers/db";
import { QueryApi } from "@helpers/queryApi";
import { Button, Grid, Typography } from "@mui/material";
export default function SuspenderGeneracionDeuda({ open, setOpen, data }) {
  const socios = !data
    ? "Sin seleccion"
    : data
        .map((socio) => `${socio.apellido} ${socio.nombre} (${socio.estado})`)
        .join(", ");
  const acepta = () => {
    setOpen(false);
    addQueryApi(`suspenderSociosGeneracionDeuda`);
  };
  return (
    <Dialogo
      fullWidth={true}
      titulo="SUSPENDER DE GENERACION DE DEUDA"
      icon={`fas fa-exclamation-triangle`}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
      detalle={`Los siguientes socios seran dados en suspecion para generar deuda: ${socios}`}
      callbackAcepta={acepta}
    ></Dialogo>
  );
}
