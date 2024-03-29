import FirestoreConfig from "@config/_firestoreConfig";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import firebase from "firebase/";
import { deleteUndefinedValue, localstorageParser } from "./arrays";
export function getModUsuario(nombreModulo, userMod) {
  const { data } = useCollection("mods", {
    where: [
      ["idUsuario", "==", userMod ? userMod : fuego.auth().currentUser?.uid],
      ["nombre", "==", nombreModulo],
    ],
  });
  if (!data) return false;
  if (data.length == 0) return false;
  return data[0];
}

export function addQueryApi(fnName, data) {
  //add row collection fuego
  if (data) {
    const aux = deleteUndefinedValue(data);
    return fuego.db.collection("queryApi").add({
      idUsuario: fuego.auth().currentUser?.uid,
      usermod: localStorage.getItem("usermod"),
      fnName,
      data: aux,
      estado: "PENDIENTE",
    });
  }
}
export function getCuentaFirestore() {
  const { data } = useCollection("cuentas", {
    where: [["idUsuarioFirestore", "==", fuego.auth().currentUser?.uid]],
  });

  if (data && data.length > 0) {
    return data[0];
  }
}
export function useModUsuario(nombreModulo) {
  const [mod, setMod] = useState(null);
  useEffect(() => {
    buscarMod(nombreModulo);
  }, [nombreModulo]);
  const buscarMod = async (nombreModulo) => {
    if (!fuego.auth().currentUser) return false;
    const data = await fuego.db
      .collection("mods")
      .where("idUsuario", "==", fuego.auth().currentUser.uid)
      .where("nombre", "==", nombreModulo)
      .get();
    if (data.empty) setMod(null);
    else setMod(data.docs[0].data());
  };
  return [mod, setMod];
}
export function Firebase() {
  const config = FirestoreConfig();
  const firestore = firebase.apps[0] ?? firebase.initializeApp(config);
  return firestore;
}
export function getValorDb({ coleccion, idRegistro, campo }) {
  const { data } = useCollection(coleccion, {
    where: [
      ["idUsuario", "==", fuego.auth().currentUser.uid],
      ["id", "==", idRegistro],
    ],
  });
  if (!data) return false;
  if (data.length == 0) return false;
  return data[0][campo];
}
