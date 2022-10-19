import { withAuthUserTokenSSR } from "next-firebase-auth";
import Controlador from "@components/Controlador";
import ContextAcciones from "context/accionesContext";
import ThemeContext from "context/accionesContext";

export default function Page() {
  return (
    <ThemeContext.Provider value={{ saludo: "gola" }}>
      <Controlador esInicial={true} />
    </ThemeContext.Provider>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();
