import Modelo, { valoresIniciales } from "../../modelos/ModeloPromociones";

import { useRouter } from "next/router";

import NuevoGenerico from "@components/NuevoGenerico";
import FormPromocionesGenerales from "./_form";

export default function Modulo({ modulo, mod, token, dataUsuario }) {
  const router = useRouter();
  const urlAcepta = `/api/promociones/`;

  return (
    <NuevoGenerico
      token={token}
      urlAcepta={urlAcepta}
      valoresIniciales={valoresIniciales}
      modulo={modulo}
      modelo={Modelo}
      dataUsuario={dataUsuario}
    >
      <FormPromocionesGenerales
        token={token}
        titulo="NUEVA"
        subTitulo="Promocion"
        icono="fas fa-plus"
      />
    </NuevoGenerico>
  );
}
