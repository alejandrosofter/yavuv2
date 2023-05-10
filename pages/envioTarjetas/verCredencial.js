import DialogContenido from "@components/forms/dialogContenido";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { getModUsuario } from "@helpers/db";
import { useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
export default function VerCredencial({ data, open, setOpen, idEnvio }) {
  const { data: dataDoc } = useDocument(
    `/envioTarjetas/${idEnvio}/tarjetas/${data?.idTarjeta}`
  );
  const { data: dataSocio } = useDocument(`/socios/${dataDoc?.idSocio}`);

  const mod = getModUsuario("socios", localStorage.getItem("usermod"));
  const dataSalida = { ...dataSocio, ...data };
  const [plantilla, setPlantilla] = UsePlantilla({
    id: mod?.config?.plantillaCredencial,
    data: dataSalida,
  });

  const [loading, setLoading] = useState(false);

  if (!dataDoc) return "No hay data";
  if (!mod) return "no hay mod";

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
