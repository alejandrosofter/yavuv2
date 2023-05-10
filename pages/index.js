import { withAuthUserTokenSSR } from "next-firebase-auth";

import ThemeContext from "context/accionesContext";
import Layout from "@components/layout";

export default function Page() {
  return <ThemeContext.Provider></ThemeContext.Provider>;
}

export const getServerSideProps = withAuthUserTokenSSR()();
