import { withAuthUserTokenSSR } from "next-firebase-auth";
import Controlador from "@components/Controlador";

export default function Page() {
  return <Controlador esInicial={true} />;
}

export const getServerSideProps = withAuthUserTokenSSR()();
