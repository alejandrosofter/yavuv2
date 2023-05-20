import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const Context = createContext("Default Value");
export const UserContext = ({
  children,
  usuario,

  fnCambiaLayout,
}) => {
  const [cuenta, setCuenta] = useState();
  const [permisos, setPermisos] = useState([]);
  const [cuentaInvitado, setCuentaInvitado] = useState([]);
  const router = useRouter();
  const path = `${router.pathname}`;
  const { data: dataCuenta } = useCollection("cuentas", {
    where: ["idUsuarioFirestore", "==", usuario?.id],
  });
  const { data: userInvitado } = useCollection("usuariosInvitados", {
    where: ["email", "==", fuego.auth().currentUser?.email],
  });
  const { data: plan } = useDocument(`planes/${cuenta?.plan}`, {
    listen: true,
  });
  // const modInvitado = dataUserInvitado
  //   ? dataUserInvitado[0].mods
  //       ?.map((item) => {
  //         if (path == `/${item.nombreModulo}`) return item;
  //       })
  //       .filter((item) => item)
  //   : null;
  // console.log(modInvitado);
  // const whereUser = [
  //   modInvitado && modInvitado.length > 0
  //     ? ["idUsuario", "==", modInvitado[0].idUsuario]
  //     : ["usermod", "==", fuego.auth().currentUser?.uid],
  // ];
  useEffect(() => {
    if (dataCuenta && dataCuenta.length > 0) {
      setPermisos(permisos.concat(dataCuenta[0].permisos));
      setCuenta(dataCuenta[0]);
    }
  }, [dataCuenta]);
  useEffect(() => {
    if (userInvitado && userInvitado.length > 0) {
      setCuentaInvitado(userInvitado[0]);
      setPermisos(permisos.concat(userInvitado[0].permisos));
    }
  }, [userInvitado]);

  return (
    <Context.Provider
      value={{
        usuario,
        cuenta,
        plan,
        fnCambiaLayout,
        userInvitado,
        permisos,
      }}
    >
      {children}
    </Context.Provider>
  );
};
