import Select2Simple from "@components/forms/select2Simple";
import { useCollection, fuego } from "@nandorojo/swr-firestore";

export default function SelectorEstadisticaItem({ data, callbackchange }) {
  if (!data) return null;
  return (
    <Select2Simple
      callbackchange={callbackchange}
      campo="estadisitica"
      label="Estadistica"
      campoId="id"
      campoLabel={(item) => {
        return item.id;
      }}
      //   defaultValue={campoClave}
      lista={data}
    />
  );
}
