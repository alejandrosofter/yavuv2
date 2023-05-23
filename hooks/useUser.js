import { useContext } from "react";
import { Context } from "@contexts/userContext";
import { fuego } from "@nandorojo/swr-firestore";
export default function UseUser() {
  return useContext(Context);
}
export function getPermiso(coleccion) {
  const { permisos, cuenta } = useContext(Context);
  for (let i = 0; i < permisos?.length; i++) {
    if (permisos[i]?.coleccion == coleccion) {
      return permisos[i];
    }
  }
}
export function getWherePermiso(coleccion, esAdmin) {
  if (esAdmin) return ["idUsuario", "==", fuego?.auth().currentUser?.uid];
  const permiso = getPermiso(coleccion);
  console.log(permiso);
  if (!permiso) return [];
  if (permiso.lectura === "o") {
    return [
      ["usermod", "==", fuego?.auth().currentUser?.uid],
      ["idUsuario", "==", permiso.idUsuario],
    ];
  }
  if (permiso.lectura === "*") {
    return ["idUsuario", "==", permiso.idUsuario];
  }
}
export function getSetPermiso(coleccion) {
  const permiso = getPermiso(coleccion);
  if (!permiso) return new Error("No tiene permisos para esta colección");
  return {
    idUsuario: permiso.idUsuario
      ? permiso.idUsuario
      : fuego?.auth().currentUser?.uid,
    usermod: fuego?.auth().currentUser?.uid,
  };
}
