import ABMColeccion from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloPrestaciones";
import Form from "../../components/prestaciones/_form";
import { fuego } from "@nandorojo/swr-firestore";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({ parentData }) {
  useLayout({
    label: "Prestaciones",
    titulo: "PRESTACIONES",
    icon: "fas fa-book-medical",
    acciones: [
      {
        label: "Prestaciones",
        icono: "fas fa-book-medical",
        url: "/prestaciones",
      },
      // {
      //   label: "Config",
      //   icono: "fas fa-cog",
      //   url: "/consultaPaciente/config",
      // },
    ],
  });
  const order = "nombre";
  const columns = [
    {
      accessorKey: "label_obraSocial",
      header: "Obra Social",
      size: 120,
    },
    {
      accessorKey: "codigo",
      header: "Codigo",
      size: 160,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 390,
    },
    {
      accessorKey: "importe",
      header: "$ Importe",
      size: 120,
    },
  ];
  return (
    <ABMColeccion
      coleccion={`prestaciones`}
      columns={columns}
      acciones={[]}
      orderBy={order}
      maxWidth="lg"
      where={getWherePermiso("prestaciones")}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      titulo={`PRESTACIONES`}
      Form={Form}
    />
  );
}
