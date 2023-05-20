import ABMColeccion2 from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloConsultorios";
import Form from "@components/consultorios/_form";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({}) {
  const order = "nombre";
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 190,
    },
    {
      accessorKey: "direccion",
      header: "Direccion",
      size: 160,
    },
    {
      accessorKey: "telefono",
      header: "Tel.",
      size: 160,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 160,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 120,
    },
  ];
  return (
    <ABMColeccion2
      coleccion={`consultorios`}
      columns={columns}
      acciones={[]}
      orderBy={order}
      maxWidth="lg"
      where={getWherePermiso("consultorios")}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      titulo={`CONSULTORIOS/`}
      Form={Form}
    />
  );
}
