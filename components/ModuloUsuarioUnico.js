import { getModUsuario, useModUsuario } from "@helpers/db";
import { fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import EditarGenerico from "./EditarGenerico";
import NuevoGenerico from "./NuevoGenerico";

export default function ModuloUsuarioUnico({
  nombreModulo,
  Modelo,
  valoresIniciales,
  Form,
}) {
  const [data, setData] = useState(null);
  const [mod, setMod] = useModUsuario(nombreModulo);
  useEffect(() => {
    setDataUser();
  }, [mod]);
  const setDataUser = async () => {
    if (mod) {
      const refColeccion = await fuego.db
        .collection(mod.coleccion)
        .where("idUsuario", "==", fuego.auth().currentUser.uid)
        .get();
      if (!refColeccion.empty) return setData(refColeccion.docs[0].data());
    } else setData(null);
  };
  if (!mod) return "cargando mod...";
  if (data)
    return (
      <EditarGenerico idItem={data.id} mod={mod} modelo={Modelo}>
        <Form titulo="Editar" subTitulo={mod.label} icono="fas fa-pencil" />
      </EditarGenerico>
    );
  console.log("nuevo");
  return (
    <NuevoGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="Nuevo" subTitulo={mod.label} icono="fas fa-pencil" />
    </NuevoGenerico>
  );
}
