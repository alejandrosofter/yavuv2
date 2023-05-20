import { getFechaString } from "@helpers/dates";
import Modelo, { valoresIniciales } from "@modelos/ModeloConsultaPaciente";
import Form from "@components/consultaPaciente/_form";
import ABMColeccion from "@components/forms/ABMcollection2";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({}) {
  const order = ["fecha", "desc"];
  useLayout({
    label: "Consultas",
    titulo: "CONSULTAS",
    icon: "fas fa-user-injured",
    acciones: [
      {
        label: "Consultas",
        icono: "fas fa-user-injured",
        url: "/consultaPaciente",
      },
      {
        label: "Config",
        icono: "fas fa-cog",
        url: "/consultaPaciente/config",
      },
    ],
  });
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 110,
      Cell: ({ cell }) => getFechaString(cell.getValue(), "DD/MM/YY hh:mm"),
    },

    {
      accessorKey: "label_paciente",
      header: "Paciente",
      size: 180,
    },

    {
      accessorKey: "prestaciones",
      header: "Prestaciones",
      size: 250,
      Cell: ({ cell }) =>
        cell
          .getValue()
          ?.map((p) => p.label_prestacion)
          .join(", "),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
    },
  ];
  return (
    <ABMColeccion
      titulo={`Consulta Paciente`}
      coleccion={`consultaPaciente`}
      form={Form}
      modelo={Modelo}
      where={getWherePermiso("consultaPaciente")}
      valoresIniciales={valoresIniciales}
      subTitulo="de pacientes"
      limit={100}
      acciones={[]}
      orderBy={order}
      columns={columns}
    />
  );
}
