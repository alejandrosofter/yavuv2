import UseUser from "@hooks/useUser";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
export function getIdUsuario() {
  const { cuenta, userInvitado } = UseUser();
  if (!cuenta) return null;
  if (cuenta.esCuentaPrincipal) return fuego.auth().currentUser?.uid;
  if (userInvitado && userInvitado.length > 0) return userInvitado[0].idUsuario;
  console.log(userInvitado);
  return null;
}

export function UseConfigModulo(ref) {
  const userid = getIdUsuario();
  const { data, add } = useCollection(`modulos_config`, {
    where: [
      ["ref", "==", ref],
      ["idUsuario", "==", userid],
    ],
  });
  if (!data) return null;
  // if (!data) return add({ ref, idUsuario: fuego.auth().currentUser?.uid });
  return data[0];
}
