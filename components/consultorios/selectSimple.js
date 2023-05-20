import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/selectSimple";
export default function Modulo({ label, valorInicial, callbackchange }) {
  const { data } = useCollection("consultorios", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!data) return "";
  return (
    <Select
      valorInicial={valorInicial}
      fn={callbackchange}
      label={label ? label : "Consultorio"}
      lista={data}
      campoId="id"
      campoValue="id"
      campoLabel="nombre"
    />
  );
}
