import { getFechaString } from "@helpers/dates";
import Modelo, { valoresIniciales } from "@modelos/ModeloEmails";
import Form from "@components/emails/_form";
import ABMColeccion from "@components/forms/ABMcollection2";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({}) {
  useLayout({
    label: "Emails",
    titulo: "EMAILS",
    acciones: [
      { label: "Emails", icono: "fas fa-envelope", url: "/emails" },
      { label: "Config", icono: "fas fa-cog", url: "/emails/config" },
    ],
  });
  const order = ["fecha", "desc"];
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 90,
      Cell: ({ cell }) => `${getFechaString(cell.getValue())}`,
    },
    {
      accessorKey: "asunto",
      header: "Asunto",
      size: 220,
    },
    {
      accessorKey: "destinatario",
      header: "Destinatario",
      size: 300,
      Cell: ({ cell }) => `${cell.getValue()}`,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
      Cell: ({ cell }) => `${cell.getValue()}`,
    },
  ];
  return (
    <ABMColeccion
      titulo={`Emails`}
      coleccion={`emails`}
      form={Form}
      modelo={Modelo}
      where={getWherePermiso("emails")}
      valoresIniciales={valoresIniciales}
      subTitulo="para enviar"
      limit={100}
      acciones={[]}
      orderBy={order}
      columns={columns}
    />
  );
}
