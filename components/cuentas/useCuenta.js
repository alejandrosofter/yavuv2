import { fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";

export default function UseCuenta({}) {
  const [data, setData] = useState();
  useEffect(() => {
    setDataUser();
  }, []);
  const setDataUser = async () => {
    const refColeccion = await fuego.db
      .collection("cuentas")
      .where("idUsuario", "==", fuego.auth().currentUser.uid)
      .get();
    if (!refColeccion.empty) setData(refColeccion.docs[0].data());
    else setData(null);
  };
  return [data, setData];
}
