import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/selectSimple";
export default function SelectEnteFacturadorSimple({
  label,
  valorInicial,
  callbackchange,
}) {
  const { data } = useCollection("entesFacturadores", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!data) return "";
  return (
    <Select
      valorInicial={valorInicial}
      fn={callbackchange}
      label={label ? label : "Ente Facturador"}
      lista={data}
      campoId="id"
      campoValue="id"
      campoLabel="nombre"
    />
  );
}
