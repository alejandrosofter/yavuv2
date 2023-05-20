import Modelo, { valoresIniciales } from "@modelos/ModeloClientes";
import Form from "@components/clientes/_form";
import { getWherePermiso } from "@hooks/useUser";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import useLayout from "@hooks/useLayout";

export default function Modulo({}) {
  const order = ["apellido", "asc"];
  useLayout({
    label: "Clientes",
    titulo: "CLIENTES",
    icon: "fas fa-user",
    acciones: [
      {
        label: "Clientes",
        icono: "fas fa-user",
        url: "/clientes",
      },
    ],
  });
  const columns = [
    {
      accessorKey: "esEmpresa",
      header: "Empresa",
      size: 90,
      Cell: ({ cell }) => (cell.row.original.esEmpresa ? "SI" : "NO"),
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 150,
      Cell: ({ cell }) => {
        if (cell.row.original.esEmpresa) return cell.row.original.razonSocial;
        return `${cell.row.original.apellido.toUpperCase()} ${
          cell.row.original.nombre
        }`;
      },
    },
    {
      accessorKey: "dni",
      header: "DNI/CUIT",
      size: 150,
      Cell: ({ cell }) => {
        if (cell.row.original.esEmpresa) return cell.row.original.cuit;
        return `${cell.row.original.dni}`;
      },
    },
  ];
  const fnAcciones = [];
  return (
    <ABMColeccion2
      coleccion={`clientes`}
      columns={columns}
      acciones={fnAcciones}
      maxWidth={"lg"}
      where={getWherePermiso("clientes")}
      orderBy={order}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      titulo={`CLIENTES`}
      Form={Form}
    />
  );
}
