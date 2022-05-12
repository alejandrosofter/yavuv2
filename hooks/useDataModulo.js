import { useEffect, useState } from "react";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
function getMod(id) {
  return fuego.db.collection("mods").doc(id).get();
}
export function useDataModulo({
  mod,
  coleccion,
  allUsers,
  condiciones,
  limit,
  orderBy,
}) {
  const [usuariosGrant, setUsuariosGrant] = useState([
    fuego.auth().currentUser?.uid,
  ]);
  const [recursosGrant, setRecursosGrant] = useState([]);
  const [where, setWhere] = useState(
    (allUsers
      ? []
      : [["idUsuario", "==", fuego.auth().currentUser?.uid]]
    ).concat(condiciones)
  );
  const [filtro, setFiltro] = useState({
    limit: limit,
    orderBy: orderBy,
    startAt: null,
    endAt: null,
    listen: true,
  });
  useEffect(() => {
    if (mod) setConfigModInvitado(mod, usuariosInvitados);
    setWhere([["idUsuario", "in", usuariosGrant]]);
  }, []);
  useEffect(() => {
    setWhere([["idUsuario", "in", usuariosGrant]]);
  }, [usuariosGrant]);
  const { data: usuariosInvitados } = useCollection("usuariosInvitados", {
    where: ["email", "==", fuego.auth().currentUser?.email],
  });
  const coleccionDb = coleccion ? coleccion : mod.coleccion;
  const setConfigModInvitado = (modCurrentUser, usuariosInvitados) => {
    return usuariosInvitados
      .map((usuarioInvitado) =>
        usuarioInvitado.mods.map(async (mod) => {
          const modParent = await getMod(mod.idMod);
          if (modParent.data().idModulo === modCurrentUser.idModulo) {
            setUsuariosGrant([
              modParent.data().idUsuario,
              fuego.auth().currentUser?.uid,
            ]);
            const aux = [];
            for (let i in mod.recursos) aux.push(mod.recursos[i].value);
            setRecursosGrant(aux);
          }
        })
      )
      .flat();
  };
  const { data, error, loading } = useCollection(coleccionDb, {
    ...filtro,
    where,
  });
  const dataPost = data ? data : [];
  // if(error)return "Aguarde..."
  if (!fuego.auth().currentUser) return "Sin login";
  if (error) return `${error}`;
  if (!data) return "Aguarde...";
  if (recursosGrant.length > 0)
    dataPost = dataPost.filter((item) =>
      recursosGrant.includes(item.id) ? item : null
    );
  return {
    data: dataPost,
    error,
    loading,
    filtro,
    setFiltro,
    where,
    setWhere,
    recursosGrant,
  };
}
