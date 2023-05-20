import initAuth from "@config/initAuth";
import { ThemeProvider } from "@mui/material/styles";
import "firebase/firestore";
import "firebase/auth";
import config from "../config/_firestoreConfig";
import Fuego from "../config/fuego";
import { FuegoProvider } from "@nandorojo/swr-firestore";
import { useState } from "react";
import { theme } from "@config/theme";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { UserContext } from "context/userContext";
import Layout from "@components/layout";

///////////////INIT AUTH IMPORTANTE!!!!//////////////////////
initAuth();
///////////////INIT AUTH IMPORTANTE!!!!//////////////////////

export function App({ Component, pageProps }) {
  const fuego = new Fuego(config());
  const [dataLayout, setLayout] = useState();
  const [seleccionModuloInvitado, setSeleccionModuloInvitado] = useState();
  const dataUser = useAuthUser();
  return (
    <FuegoProvider fuego={fuego}>
      <UserContext
        fnCambiaLayout={(data) => {
          setLayout(data);
        }}
        fnCambiaModuloInvitado={(data) => {
          setSeleccionModuloInvitado(data);
        }}
        seleccionModuloInvitado={seleccionModuloInvitado}
        usuario={dataUser}
      >
        <ThemeProvider theme={theme}>
          <Layout dataLayout={dataLayout} auth={dataUser}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserContext>
    </FuegoProvider>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()();
export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(App);
