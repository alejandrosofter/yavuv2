import ImpresionDialog from "@components/forms/impresion";
import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloCobros";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { useRouter } from "next/router";
import { fuego } from "@nandorojo/swr-firestore";

export default function Modulo({ mod }) {
  const idPlantilla = mod.config?.plantillaCobro;
  const plantillaEmail = mod.config?.plantillaMail;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [preData, setPreData] = useState(mod?.config);
  const [socio, setSocio] = useState();
  const router = useRouter();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const closePrint = () => {
    //reload
    const url = `/mod/${mod.id}/nuevo`;
    router.push(url, url, { shallow: true });
  };
  const success = async (data, idCobro) => {
    await setSocioCobro(data);
    setDataImpresion(data);
    setOpenImpresion(true);
  };
  const setSocioCobro = async (data) => {
    const refSocio = await fuego.db
      .collection("socios")
      .doc(data?.cliente)
      .get();
    setSocio(refSocio.data());
  };
  return (
    <>
      <NuevoGenerico
        preData={preData}
        valoresIniciales={valoresIniciales}
        mod={mod}
        removeTitle={true}
        callbackSuccess={success}
        modelo={Modelo}
      >
        <Form subTitulo={mod.label} icono={mod.icono} />
     @components/NuevoGenerico>

      <ImpresionDialog
        titulo="PANEL COMPARTIR COBRO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COMPROBANTE DE PAGO"
        callbackClose={closePrint}
        data={{ ...dataImpresion, socio, email: socio?.email }}
        plantilla={plantilla}
        emailDefault={socio?.email}
        plantillaEmail={plantillaEmail}
        attachments={[{ filename: "COBRO.pdf", data: plantilla }]}
      />
    </>
  );
}
