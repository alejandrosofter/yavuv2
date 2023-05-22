import { useRouter } from "next/router";
import Form from "../../components/socios/_formSocios";
import EditarGenerico from "@components/EditarGenerico";

export default function Modulo({}) {
  const router = useRouter();
  const { idSocio } = router.query;
  return (
    <EditarGenerico coleccion="socios" idItem={idSocio}>
      <Form titulo="Editar" icono="fas fa-pencil" />
    </EditarGenerico>
  );
}
