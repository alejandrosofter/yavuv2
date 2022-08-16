import dynamic from "next/dynamic";
import Layout from "./layout";
import EditarMod from "./mod/editar";
import getModModulo, { getModuloMod } from "../helpers/mods";
import { withAuthUser, useAuthUser, AuthAction } from "next-firebase-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { updateField } from "../config/db";
const Controlador = ({ esInicial, url, moduloEditar }) => {
  const auth = useAuthUser();
  const router = useRouter();
  const esEdicion =
    router.query.componente === "editar" && moduloEditar === true;

  const mod = esInicial
    ? getModModulo({ auth })
    : getModuloMod({ id: router.query.id });
  useEffect(() => {
    updateField({
      coleccion: "mods",
      id: router.query.id,
      registro: { fechaClick: new Date() },
    });
  }, [router.query.id]);
  if (!mod) return "Cargando mod..";
  const stringUrl = esInicial ? "dashboard" : eval(url);
  let Componente;
  if (stringUrl.includes("undefined")) {
    return (
      <Layout mod={mod}>
        <div>Cargando Componente .. aguarde por favor</div>
      </Layout>
    );
  }
  if (esEdicion) Componente = EditarMod; //<---- ES EDICION DE MOD
  else
    Componente = dynamic(() => import(`./${stringUrl}`), {
      loading: ({ error, timedOut, isLoading }) => {
        if (isLoading) return "Cargando componente";

        if (error)
          return <p>{`PROXIMAMENTE... ESTAMOS TRABAJANDO EN ESTE MODULO`}</p>;
        if (timedOut) return <p>Tiempo de espera agotado</p>;
      },
    });

  return (
    <Layout auth={auth} mod={mod}>
      {mod && <Componente auth={auth} mod={mod} />}
    </Layout>
  );
};

export default withAuthUser({
  // whenAuthed: AuthAction.REDIRECT_TO_APP,
  // whenAuthedBeforeRedirect:AuthAction.REDIRECT_TO_APP,
  // whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // authPageURL: '/auth',
})(Controlador);
