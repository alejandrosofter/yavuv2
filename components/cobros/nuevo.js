import ImpresionDialog from "@components/forms/impresion";
import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloCobros";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { useRouter } from "next/router";

export default function Modulo({ mod }) {
  const idPlantilla = mod.config?.plantillaCobro;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
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
  const success = (data, idCobro) => {
    setDataImpresion(data);
    setOpenImpresion(true);
  };

  return (
    <>
      <NuevoGenerico
        preData={mod?.config}
        valoresIniciales={valoresIniciales}
        mod={mod}
        removeTitle={true}
        callbackSuccess={success}
        modelo={Modelo}
      >
        <Form subTitulo={mod.label} icono={mod.icono} />
      </NuevoGenerico>
      <ImpresionDialog
        titulo="PANEL COMPARTIR COBRO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COBRO"
        data={dataImpresion}
        plantilla={plantilla}
        callbackClose={closePrint}
        nombrePlantillaEmail="emailCobro"
      />
    </>
  );
}
