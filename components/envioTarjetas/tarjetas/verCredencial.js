import DialogContenido from "@components/forms/dialogContenido";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { getModUsuario } from "@helpers/db";
import { useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function VerCredencial({ data, open, setOpen, idEnvio }) {
  const { data: dataDoc } = useDocument(
    `/envioTarjetas/${idEnvio}/tarjetas/${data?.idTarjeta}`
  );
  const { data: dataSocio } = useDocument(`/socios/${dataDoc?.idSocio}`);

  const dataSalida = { ...dataSocio, ...data };
  const config = UseConfigModulo("socios");
  const [plantilla, setPlantilla] = UsePlantilla({
    id: config?.plantillaCredencial,
    data: dataSalida,
  });

  if (!dataDoc) return "No hay data";

  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="sm"
      titulo={`CREDENCIAL`}
      open={open}
      setOpen={setOpen}
    >
      <iframe
        width="350px"
        frameBorder="0"
        id="impresionFrame"
        height="250px"
        srcDoc={`${plantilla}`}
      ></iframe>
    </DialogContenido>
  );
}
